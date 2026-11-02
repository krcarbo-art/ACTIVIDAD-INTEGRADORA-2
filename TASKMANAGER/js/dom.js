export function mostrarTarea(titulo) {
    const lista = document.getElementById("lista-tareas");

    const elemento = document.createElement("li");
    const casilla = document.createElement("input");
    casilla.type = "checkbox";
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    // Crear botón para editar tareas
    const botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";

    elemento.textContent = titulo;
    elemento.prepend(casilla);
    elemento.appendChild(botonEditar);
    elemento.appendChild(botonEliminar);
    // Eliminar la tarea al presionar el botón
    botonEliminar.addEventListener("click", function () {
        elemento.remove();
    });
    // Editar el nombre de una tarea
    botonEditar.addEventListener("click", function () {
        const nuevoTitulo = prompt("Editar tarea:", titulo);

        if (nuevoTitulo !== null && nuevoTitulo.trim() !== "") {
            titulo = nuevoTitulo.trim();
            elemento.textContent = titulo;
            elemento.prepend(casilla);
            elemento.appendChild(botonEditar);
            elemento.appendChild(botonEliminar);
        }
    });
    // Marcar la tarea como completada
    casilla.addEventListener("change", function () {
        elemento.style.textDecoration = casilla.checked ? "line-through" : "none";
    });


    lista.appendChild(elemento);
}