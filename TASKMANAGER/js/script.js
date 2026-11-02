// Importar función desde dom.js
import { mostrarTarea } from "./dom.js";
console.log("TaskManager iniciado correctamente");
const formulario = document.getElementById("form-tarea");
console.log("Formulario encontrado:", formulario);

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();
    console.log("Botón Agregar tarea presionado");

    const titulo = document.getElementById("titulo-tarea").value.trim();

    if (titulo !== "") {
        mostrarTarea(titulo);
        formulario.reset();
    }
});