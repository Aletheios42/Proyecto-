<script>
  // Recibimos los datos del +page.ts
  export let data;
  
  // Usamos el operador '?.' (optional chaining) por si 'data' tarda en cargar
  // y le damos un array vacío [] por defecto para que no de error.
  $: cursos = data?.cursos || [];
</script>

<main class="portal-container">
  <header>
    <h1>Portal de Cursos</h1>
    <p>Selecciona un curso para empezar tu ruta de aprendizaje.</p>
  </header>

  <div class="grid-cursos">
    {#each cursos as curso}
      <a 
        href={curso.url} 
        data-sveltekit-reload
        class="tarjeta-curso {curso.ejercicios === 0 ? 'deshabilitado' : ''}"
      >
        <div class="icono-curso">{curso.icon}</div>
        
        <div class="contenido-curso">
          <h2>{curso.titulo}</h2>
          <p class="descripcion">{curso.descripcion}</p>
        </div>

        <div class="meta-curso">
          <span class="badge">
            {curso.ejercicios > 0 ? `${curso.ejercicios} ejercicios` : 'Próximamente'}
          </span>
        </div>
      </a>
    {/each}
  </div>
</main>

<style>
  /* Paleta de colores basada en el tema Dracula de tu CodeMirror */
  :global(body) {
    margin: 0;
    font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: #282a36; /* Background Dracula */
    color: #f8f8f2; /* Text Dracula */
  }

  .portal-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
  }

  header {
    text-align: center;
    margin-bottom: 3rem;
  }

  header h1 {
    font-size: 2.5rem;
    color: #bd93f9; /* Purple Dracula */
    margin-bottom: 0.5rem;
  }

  header p {
    font-size: 1.1rem;
    color: #6272a4; /* Comment Dracula */
  }

  /* Grid de tarjetas */
  .grid-cursos {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  /* Tarjeta de curso */
  .tarjeta-curso {
    display: flex;
    flex-direction: column;
    background: #44475a; /* Current Line Dracula */
    border-radius: 8px;
    padding: 1.5rem;
    text-decoration: none;
    color: inherit;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    border: 2px solid transparent;
  }

  .tarjeta-curso:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.4);
    border-color: #ff79c6; /* Pink Dracula al hacer hover */
  }

  .tarjeta-curso.deshabilitado {
    opacity: 0.5;
    pointer-events: none;
    filter: grayscale(100%);
  }

  .icono-curso {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .contenido-curso h2 {
    font-size: 1.25rem;
    margin: 0 0 0.5rem 0;
    color: #50fa7b; /* Green Dracula para los títulos */
  }

  .descripcion {
    font-size: 0.95rem;
    color: #f8f8f2;
    opacity: 0.9;
    line-height: 1.5;
    margin: 0;
    flex-grow: 1;
  }

  .meta-curso {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #6272a4; /* Línea divisoria en color comentario */
  }

  .badge {
    background-color: #8be9fd; /* Cyan Dracula */
    color: #282a36; /* Background oscuro para contrastar */
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: bold;
  }
</style>
