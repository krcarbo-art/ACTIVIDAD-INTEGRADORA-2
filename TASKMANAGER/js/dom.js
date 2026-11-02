export function mostrarTarea(titulo) {
    const lista = document.getElementById("lista-tareas");

    const elemento = document.createElement("li");
    const casilla = document.createElement("input");
    casilla.type = "checkbox";

    elemento.textContent = titulo;

    lista.appendChild(elemento);
}