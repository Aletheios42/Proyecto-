let pyodide;
let editor;
let EJERCICIOS = [];
let ejercicioActualIndex = 0;
let bloqueAbierto = "01_entorno";

// Estado de Examen
let examenState = {
    activo: false,
    indiceActual: 0,
    idsSeleccionados: []
};

const BLOQUES = [
    { id: "01_entorno", nombre: "01 · Entorno" },
    { id: "02_tipos_variables", nombre: "02 · Variables" },
    { id: "03_operadores", nombre: "03 · Operadores" },
    { id: "04_control_flujo", nombre: "04 · Control Flujo" },
    { id: "05_estructuras_datos", nombre: "05 · Estructuras" },
    { id: "06_funciones", nombre: "06 · Funciones" },
    { id: "07_modulos", nombre: "07 · Módulos" },
    { id: "08_entrada_salida", nombre: "08 · E/S" },
    { id: "09_excepciones", nombre: "09 · Excepciones" },
    { id: "10_oop", nombre: "10 · OOP" },
    { id: "11_comprensiones", nombre: "11 · Comprensiones" }
];

async function cargarEjercicios() {
    const promesas = BLOQUES.map(b =>
        fetch(`ejercicios/bloque_${b.id}.json`).then(r => r.json()).catch(() => [])
    );
    const resultados = await Promise.all(promesas);
    EJERCICIOS = resultados.flat();
}

async function main() {
    // 1. UI Setup
    editor = CodeMirror.fromTextArea(document.getElementById("codigo"), {
        lineNumbers: true,
        theme: "dracula",
        mode: "python"
    });

    // 2. Cargar Datos
    await cargarEjercicios();

    // 3. Persistencia de Examen
    const saved = localStorage.getItem("examen_data");
    if (saved) {
        examenState = JSON.parse(saved);
        if (examenState.activo) {
            document.body.classList.add("en-examen");
            document.getElementById("examen-slider").checked = true;
            document.getElementById("examen-slider").disabled = true;
            document.getElementById("zona-abandono").style.display = "block";
        }
    }

    // 4. Pyodide
    document.getElementById("panel-terminal").innerHTML = "<p>⏳ Cargando Python...</p>";
    pyodide = await loadPyodide();
    document.getElementById("boton-verificar").disabled = false;
    document.getElementById("boton-verificar").innerText = "Verificar Código";
    document.getElementById("panel-terminal").innerHTML = "<p>✅ Listo.</p>";

    // 5. Inicializar vista
    if (examenState.activo) {
        cargarEjercicioExamen();
    } else {
        renderizarListaEjercicios();
        cargarEjercicio(0);
    }
}

// --- LÓGICA DE EXAMEN ---

function handleExamenToggle(slider) {
    if (slider.checked) {
        if (confirm("¿Activar MODO EXAMEN? Se elegirá un ejercicio al azar de cada bloque y no podrás volver atrás hasta terminar.")) {
            iniciarExamen();
        } else {
            slider.checked = false;
        }
    }
}

function iniciarExamen() {
    const seleccion = [];
    BLOQUES.forEach(b => {
        const opciones = EJERCICIOS.filter(e => e.bloque === b.id);
        if (opciones.length) {
            const azar = opciones[Math.floor(Math.random() * opciones.length)];
            seleccion.push(azar.id);
        }
    });

    examenState = { activo: true, indiceActual: 0, idsSeleccionados: seleccion };
    localStorage.setItem("examen_data", JSON.stringify(examenState));
    
    document.body.classList.add("en-examen");
    document.getElementById("examen-slider").disabled = true;
    document.getElementById("zona-abandono").style.display = "block";
    
    cargarEjercicioExamen();
}

function cargarEjercicioExamen() {
    const id = examenState.idsSeleccionados[examenState.indiceActual];
    const ejer = EJERCICIOS.find(e => e.id === id);
    
    document.getElementById("ejercicio-titulo").innerText = `EXAMEN: Pregunta ${examenState.indiceActual + 1} de 11`;
    document.getElementById("ejercicio-enunciado").innerText = ejer.instrucciones;
    editor.setValue(ejer.boilerplate);
    renderizarListaEjercicios();
}

function renderizarListaEjercicios() {
    const contenedor = document.getElementById("lista-ejercicios");
    contenedor.innerHTML = '';

    if (examenState.activo) {
        examenState.idsSeleccionados.forEach((id, i) => {
            const item = document.createElement("div");
            item.className = "archivo-item";
            
            if (i === examenState.indiceActual) {
                item.classList.add("activo");
                item.innerHTML = `🎯 Actual: Pregunta ${i+1}`;
            } else if (i < examenState.indiceActual) {
                item.innerHTML = `✅ Pregunta ${i+1} (Hecha)`;
            } else {
                item.classList.add("bloqueado");
                item.innerHTML = `🔒 Pregunta ${i+1} (Bloqueada)`;
            }
            contenedor.appendChild(item);
        });
    } else {
        BLOQUES.forEach(b => {
            const lista = EJERCICIOS.filter(e => e.bloque === b.id);
            const header = document.createElement("div");
            header.className = "bloque-header " + (bloqueAbierto === b.id ? "abierto" : "");
            header.innerText = b.nombre;
            header.onclick = () => { bloqueAbierto = b.id; renderizarListaEjercicios(); };
            contenedor.appendChild(header);

            if (bloqueAbierto === b.id) {
                lista.forEach(e => {
                    const idx = EJERCICIOS.indexOf(e);
                    const item = document.createElement("div");
                    item.className = "archivo-item " + (idx === ejercicioActualIndex ? "activo" : "");
                    item.innerText = e.titulo;
                    item.onclick = () => { ejercicioActualIndex = idx; cargarEjercicio(idx); renderizarListaEjercicios(); };
                    contenedor.appendChild(item);
                });
            }
        });
    }
}

function cargarEjercicio(index) {
    ejercicioActualIndex = index;
    const ejer = EJERCICIOS[index];
    document.getElementById("ejercicio-titulo").innerText = ejer.titulo;
    document.getElementById("ejercicio-enunciado").innerText = ejer.instrucciones;
    editor.setValue(ejer.boilerplate);
}

// --- VERIFICACIÓN ---

document.getElementById("boton-verificar").onclick = async () => {
    const terminal = document.getElementById("panel-terminal");
    const ejer = examenState.activo 
        ? EJERCICIOS.find(e => e.id === examenState.idsSeleccionados[examenState.indiceActual])
        : EJERCICIOS[ejercicioActualIndex];

    terminal.innerHTML = "<p>⏳ Verificando...</p>";

    try {
        await pyodide.runPythonAsync(`import sys, io\nsys.stdout = io.StringIO()`);
        await pyodide.runPythonAsync(editor.getValue() + "\n" + ejer.testCode);
        terminal.innerHTML = `<p style="color: #50fa7b;">✅ ¡Correcto!</p>`;
        
        if (examenState.activo) {
            examenState.indiceActual++;
            if (examenState.indiceActual >= 11) {
                alert("¡EXAMEN COMPLETADO! Felicidades.");
                abandonarExamen();
            } else {
                localStorage.setItem("examen_data", JSON.stringify(examenState));
                setTimeout(cargarEjercicioExamen, 1000);
            }
        } else {
            localStorage.setItem(`ejercicio_${ejer.id}`, "resuelto");
            renderizarListaEjercicios();
        }
    } catch (err) {
        terminal.innerHTML = `<p style="color: #ff5555;">❌ Error:\n${err.message}</p>`;
    }
};

function abandonarExamen() {
    localStorage.removeItem("examen_data");
    location.reload();
}

function mostrarChuleta() {
    window.open('Python_Cheat_Sheet.pdf', '_blank');
}

main();
