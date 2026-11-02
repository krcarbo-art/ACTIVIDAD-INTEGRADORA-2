
export function mostrarTarea(
    titulo,
    completada = false,
    alCambiar = null,
    alEliminar = null,
    alEditar = null
) {
    const lista = document.getElementById("lista-tareas");

    const elemento = document.createElement("li");

    // Crear casilla
    const casilla = document.createElement("input");
    casilla.type = "checkbox";
    casilla.checked = completada;

    // Crear texto de la tarea
    const texto = document.createElement("span");
    texto.textContent = titulo;
    texto.style.textDecoration = completada ? "line-through" : "none";

    // Crear botón Editar
    const botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";

    // Crear botón Eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";

    // Marcar tarea como completada
    casilla.addEventListener("change", function () {
        texto.style.textDecoration = casilla.checked
            ? "line-through"
            : "none";

        if (alCambiar) {
            alCambiar(casilla.checked);
        }
    });

    // Editar tarea
    botonEditar.addEventListener("click", function () {
        const nuevoTitulo = prompt("Editar tarea:", texto.textContent);

        if (nuevoTitulo !== null && nuevoTitulo.trim() !== "") {
            texto.textContent = nuevoTitulo.trim();

            if (alEditar) {
                alEditar(nuevoTitulo.trim());
            }
        }
    });

    // Eliminar tarea
    botonEliminar.addEventListener("click", function () {
        elemento.remove();

        if (alEliminar) {
            alEliminar();
        }
    });

    // Mostrar los elementos en pantalla
    elemento.appendChild(casilla);
    elemento.appendChild(texto);
    elemento.appendChild(botonEditar);
    elemento.appendChild(botonEliminar);

    lista.appendChild(elemento);
}
