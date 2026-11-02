
import { mostrarTarea } from "./dom.js";
import { guardarTareas, obtenerTareas } from "./storage.js";

// Recuperar las tareas guardadas
let tareas = obtenerTareas();

// Actualizar las tareas en pantalla
function actualizarLista() {
    const lista = document.getElementById("lista-tareas");
    lista.innerHTML = "";

    // Obtener texto de búsqueda
    const busqueda = document.getElementById("buscar-tarea")
        .value.toLowerCase();

    // Obtener filtro seleccionado
    const filtroEstado = document.getElementById("filtro-estado").value;

    // Filtrar tareas por nombre y estado
    const tareasFiltradas = tareas.filter(function (tarea) {
        const coincideBusqueda = tarea.titulo
            .toLowerCase()
            .includes(busqueda);

        const coincideEstado =
            filtroEstado === "todas" ||
            (filtroEstado === "pendientes" && !tarea.completada) ||
            (filtroEstado === "completadas" && tarea.completada);

        return coincideBusqueda && coincideEstado;
    });

    // Mostrar las tareas filtradas
    tareasFiltradas.forEach(function (tarea) {
        mostrarTarea(
            tarea.titulo,
            tarea.completada,

            // Marcar como completada
            function (estado) {
                tarea.completada = estado;
                guardarTareas(tareas);
                actualizarLista();
            },

            // Eliminar tarea
            function () {
                tareas = tareas.filter(function (item) {
                    return item !== tarea;
                });

                guardarTareas(tareas);
                actualizarLista();
            },

            // Editar tarea
            function (nuevoTitulo) {
                tarea.titulo = nuevoTitulo;
                guardarTareas(tareas);
                actualizarLista();
            }
        );
    });
}

// Mostrar las tareas guardadas
actualizarLista();

// Agregar una nueva tarea
const formulario = document.getElementById("form-tarea");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const titulo = document.getElementById("titulo-tarea")
        .value.trim();

    // Validar que no esté vacío
    if (titulo === "") {
        alert("Por favor, escribe el nombre de la tarea.");
        return;
    }

    // Crear tarea nueva
    tareas.push({
        titulo: titulo,
        completada: false
    });

    // Guardar y actualizar
    guardarTareas(tareas);
    formulario.reset();
    actualizarLista();
});

// Buscar tareas mientras se escribe
document.getElementById("buscar-tarea")
    .addEventListener("input", function () {
        actualizarLista();
    });

// Filtrar tareas por estado
document.getElementById("filtro-estado")
    .addEventListener("change", function () {
        actualizarLista();
    });
