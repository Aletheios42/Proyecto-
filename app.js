let pyodide;
let ejercicioActualIndex = 0;
let editor;

const botonVerificar = document.getElementById("boton-verificar");
const terminal = document.getElementById("panel-terminal");

async function main() {
    // 1. Inicializar Editor
    editor = CodeMirror.fromTextArea(document.getElementById("codigo"), {
        lineNumbers: true,
        theme: "dracula",
        mode: "python"
    });

    // 2. Cargar Pyodide
    terminal.innerHTML = "<p>⏳ Cargando Python...</p>";
    pyodide = await loadPyodide();

    // 3. Habilitar UI
    botonVerificar.disabled = false;
    botonVerificar.innerText = "Verificar Código";
    terminal.innerHTML = "<p style='color: #00ff00;'>✅ Python listo para ejecutar.</p>";

    // 4. Renderizar lista de ejercicios y cargar el primero
    renderizarListaEjercicios();
    cargarEjercicio(0);
}

function renderizarListaEjercicios() {
    const contenedor = document.getElementById("lista-ejercicios");
    contenedor.innerHTML = '';

    window.EJERCICIOS.forEach((ejer, index) => {
        const boton = document.createElement("div");
        boton.className = "archivo-item";
        if (index === ejercicioActualIndex) boton.classList.add("activo");

        boton.innerText = `📄 ${ejer.titulo}`;

        boton.onclick = () => {
            ejercicioActualIndex = index;
            cargarEjercicio(index);
            renderizarListaEjercicios();
        };

        contenedor.appendChild(boton);
    });
}

function cargarEjercicio(index) {
    const ejer = window.EJERCICIOS[index];
    document.getElementById("ejercicio-titulo").innerText = ejer.titulo;
    // Usamos 'ejercicio-enunciado' que es el ID que tienes en tu HTML
    document.getElementById("ejercicio-enunciado").innerText = ejer.instrucciones;
    editor.setValue(ejer.boilerplate);
}

async function runCode(codigoAlumno, testCode) {
    terminal.innerHTML = "<p style='color: #aaa;'>Ejecutando...</p>";
    try {
        await pyodide.runPythonAsync(`
            import sys, io
            sys.stdout = io.StringIO()
        `);
        const fullCode = codigoAlumno + "\n" + testCode;
        await pyodide.runPythonAsync(fullCode);
        const stdout = await pyodide.runPythonAsync("sys.stdout.getvalue()");
        terminal.innerHTML = `<pre>${stdout}</pre>`;
        marcarComoResuelto();
    } catch (err) {
        manejarError(err);
    }
}

function manejarError(err) {
    const errorMsg = err.message;
    if (errorMsg.includes("AssertionError")) {
        const cleanError = errorMsg.split("AssertionError:").pop().split("\n")[0];
        terminal.innerHTML = `<p style="color: #ff4444;">❌ ${cleanError}</p>`;
    } else {
        terminal.innerHTML = `<p style="color: #ffaa00;">⚠️ Error de Python:</p><pre style="color: #ffaa00;">${errorMsg}</pre>`;
    }
}

function marcarComoResuelto() {
    const ejerActual = window.EJERCICIOS[ejercicioActualIndex];
    localStorage.setItem(`ejercicio_${ejerActual.id}`, "resuelto");
    terminal.innerHTML += `<p style="color: #00ff00;">⭐ ¡Reto superado!</p>`;
}

// Único evento de botón
botonVerificar.addEventListener('click', () => {
    const codigo = editor.getValue();
    const test = window.EJERCICIOS[ejercicioActualIndex].testCode;
    runCode(codigo, test);
});

document.addEventListener('keydown', (evento) => {
  if (evento.key = 'Escape') {
    document.getElementById("modal-chuleta").style.display = 'none';
  }
})

async function mostrarChuleta() {
    const respuesta = await fetch('chuleta.md'); 
    const texto = await respuesta.text();
    document.getElementById('contenido-markdown').innerHTML = marked.parse(texto);
    document.getElementById('modal-chuleta').style.display = 'block';

}

// Evento para cerrar
document.querySelector('.cerrar-modal').onclick = () => {
    document.getElementById('modal-chuleta').style.display = 'none';
};

// Arrancar la aplicación
main();
