export async function load({ fetch }) {
    // Busca el archivo cursos.json en la carpeta static
    const respuesta = await fetch('cursos.json');
    
    // Si no encuentra el archivo, devolvemos un array vacío para que no explote
    if (!respuesta.ok) {
        return { cursos: [] };
    }

    const cursos = await respuesta.json();
    return { cursos };
}
