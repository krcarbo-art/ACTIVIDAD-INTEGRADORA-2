
export async function obtenerTareasAPI() {
    try {
        const respuesta = await fetch(
            "https://jsonplaceholder.typicode.com/todos"
        );

        if (!respuesta.ok) {
            throw new Error("No se pudieron descargar las tareas.");
        }

        const datos = await respuesta.json();

        return datos.map(function (tarea) {
            return {
                titulo: tarea.title,
                completada: tarea.completed,
                prioridad: "media",
                fechaCreacion: new Date().toISOString()
            };
        });

    } catch (error) {
        console.error("Error al consultar la API:", error);

        throw new Error(
            "No se pudieron cargar las tareas. Revisa tu conexión."
        );
    }
}
