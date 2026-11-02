export function guardarTareas(tareas) {
    localStorage.setItem("tareas", JSON.stringify(tareas));
    return datos ? JSON.parse(datos) : [];
}