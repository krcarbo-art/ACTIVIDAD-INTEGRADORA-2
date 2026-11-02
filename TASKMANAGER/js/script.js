// Importar función desde dom.js
import { mostrarTarea } from "./dom.js";
import { guardarTareas, obtenerTareas } from "./storage.js";
console.log("TaskManager iniciado correctamente");
let tareas = obtenerTareas();
tareas.forEach(function (tarea) {
    mostrarTarea(tarea.titulo, tarea.completada);
});
const formulario = document.getElementById("form-tarea");
console.log("Formulario encontrado:", formulario);

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    console.log("Botón Agregar tarea presionado");

    const titulo = document.getElementById("titulo-tarea").value.trim();

    if (titulo !== "") {
        mostrarTarea(titulo);
        tareas.push({ titulo: titulo, completada: false });
        guardarTareas(tareas);
        formulario.reset();
    }
});