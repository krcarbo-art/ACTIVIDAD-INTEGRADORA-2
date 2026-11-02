export function mostrarTarea(titulo) {
    const lista = document.getElementById("lista-tareas");

    const elemento = document.createElement("li");
    const casilla = document.createElement("input");
    casilla.type = "checkbox";
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";

    elemento.textContent = titulo;
    elemento.prepend(casilla);
    elemento.appendChild(botonEliminar);
    // Marcar la tarea como completada
    casilla.addEventListener("change", function () {
        elemento.style.textDecoration = casilla.checked ? "line-through" : "none";
    });


    lista.appendChild(elemento);
}