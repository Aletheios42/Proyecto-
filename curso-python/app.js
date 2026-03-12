let pyodide;
let ejercicioActualIndex = 0;
let bloqueAbierto = "01_entorno";
let editor;
let EJERCICIOS = [];

const botonVerificar = document.getElementById("boton-verificar");
const terminal = document.getElementById("panel-terminal");

const BLOQUES = [
  { id: "01_entorno",           nombre: "01 · Entorno" },
  { id: "02_tipos_variables",   nombre: "02 · Tipos y Variables" },
  { id: "03_operadores",        nombre: "03 · Operadores" },
  { id: "04_control_flujo",     nombre: "04 · Control de Flujo" },
  { id: "05_estructuras_datos", nombre: "05 · Estructuras de Datos" },
  { id: "06_funciones",         nombre: "06 · Funciones" },
  { id: "07_modulos",           nombre: "07 · Módulos" },
  { id: "08_entrada_salida",    nombre: "08 · Entrada / Salida" },
  { id: "09_excepciones",       nombre: "09 · Excepciones" },
  { id: "10_oop",               nombre: "10 · OOP" },
  { id: "11_comprensiones",     nombre: "11 · Comprensiones" },
];

async function cargarEjercicios() {
  const promesas = BLOQUES.map(b =>
    fetch(`ejercicios/bloque_${b.id}.json`)
      .then(r => {
        if (!r.ok) throw new Error(`404: bloque_${b.id}.json`);
        return r.json();
      })
      .catch(err => { console.error(err); return []; })
  );
  const resultados = await Promise.all(promesas);
  EJERCICIOS = resultados.flat();
  console.log("Ejercicios cargados:", EJERCICIOS.length);
}

async function main() {
  editor = CodeMirror.fromTextArea(document.getElementById("codigo"), {
    lineNumbers: true,
    theme: "dracula",
    mode: "python"
  });

  terminal.innerHTML = "<p>⏳ Cargando ejercicios...</p>";
  await cargarEjercicios();

  terminal.innerHTML = "<p>⏳ Cargando Python...</p>";
  pyodide = await loadPyodide();

  botonVerificar.disabled = false;
  botonVerificar.innerText = "Verificar Código";
  terminal.innerHTML = "<p style='color: #00ff00;'>✅ Python listo para ejecutar.</p>";

  renderizarListaEjercicios();
  cargarEjercicio(0);
}

function renderizarListaEjercicios() {
  const contenedor = document.getElementById("lista-ejercicios");
  contenedor.innerHTML = '';

  BLOQUES.forEach(bloque => {
    const ejerciciosDelBloque = EJERCICIOS.filter(e => e.bloque === bloque.id);
    const estaAbierto = bloqueAbierto === bloque.id;

    const header = document.createElement("div");
    header.className = "bloque-header" + (estaAbierto ? " abierto" : "");
    header.innerHTML = `<span class="bloque-arrow">${estaAbierto ? "▾" : "▸"}</span> ${bloque.nombre}`;
    header.onclick = () => {
      bloqueAbierto = estaAbierto ? null : bloque.id;
      renderizarListaEjercicios();
    };
    contenedor.appendChild(header);

    if (estaAbierto) {
      ejerciciosDelBloque.forEach(ejer => {
        const index = EJERCICIOS.indexOf(ejer);
        const resuelto = localStorage.getItem(`ejercicio_${ejer.id}`) === "resuelto";

        const item = document.createElement("div");
        item.className = "archivo-item" + (index === ejercicioActualIndex ? " activo" : "");
        item.innerHTML = `${resuelto ? "✅" : "📄"} ${ejer.titulo}`;
        item.onclick = () => {
          ejercicioActualIndex = index;
          cargarEjercicio(index);
          renderizarListaEjercicios();
        };
        contenedor.appendChild(item);
      });
    }
  });
}

function cargarEjercicio(index) {
  const ejer = EJERCICIOS[index];
  document.getElementById("ejercicio-titulo").innerText = ejer.titulo;
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
  const ejerActual = EJERCICIOS[ejercicioActualIndex];
  localStorage.setItem(`ejercicio_${ejerActual.id}`, "resuelto");
  terminal.innerHTML += `<p style="color: #00ff00;">⭐ ¡Reto superado!</p>`;
  renderizarListaEjercicios();
}

botonVerificar.addEventListener('click', () => {
  const codigo = editor.getValue();
  const test = EJERCICIOS[ejercicioActualIndex].testCode;
  runCode(codigo, test);
});

document.getElementById("boton-pista").addEventListener('click', () => {
  const pista = EJERCICIOS[ejercicioActualIndex].pista;
  terminal.innerHTML = `<pre style="color: #f1fa8c;">💡 Pista:\n${pista}</pre>`;
});

document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') {
    document.getElementById("modal-chuleta").style.display = 'none';
  }
});

async function mostrarChuleta() {
  const respuesta = await fetch('chuleta.md');
  const texto = await respuesta.text();
  document.getElementById('contenido-markdown').innerHTML = marked.parse(texto);
  document.getElementById('modal-chuleta').style.display = 'block';
}

document.querySelector('.cerrar-modal').onclick = () => {
  document.getElementById('modal-chuleta').style.display = 'none';
};

main();
