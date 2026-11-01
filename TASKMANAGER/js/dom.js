export function mostrarTarea(titulo) {
    const lista = document.getElementById("lista-tareas");

    const elemento = document.createElement("li");

    elemento.textContent = titulo;

    lista.appendChild(elemento);
}