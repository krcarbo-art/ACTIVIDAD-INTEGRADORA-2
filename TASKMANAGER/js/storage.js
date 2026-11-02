export function guardarTareas(tareas) {
    localStorage.setItem("tareas", JSON.stringify(tareas));

}
// Recuperar las tareas guardadas
export function obtenerTareas() {
    const datos = localStorage.getItem("tareas");

    return datos ? JSON.parse(datos) : [];
}