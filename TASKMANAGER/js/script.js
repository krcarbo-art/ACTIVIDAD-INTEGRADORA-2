
import { mostrarTarea } from "./dom.js";
import { guardarTareas, obtenerTareas } from "./storage.js";
import { obtenerTareasAPI } from "./api.js";
// Recuperar tareas guardadas
let tareas = obtenerTareas();

// Adaptar las tareas antiguas sin perder información
tareas = tareas.map(function (tarea, indice) {
    return {
        ...tarea,
        prioridad: tarea.prioridad || "media",
        fechaCreacion: tarea.fechaCreacion ||
            new Date(indice).toISOString()
    };
});

guardarTareas(tareas);

// Actualizar estadísticas
function actualizarEstadisticas() {
    const total = tareas.length;

    const completadas = tareas.filter(function (tarea) {
        return tarea.completada;
    }).length;

    const pendientes = total - completadas;

    document.getElementById("total-tareas").textContent = total;
    document.getElementById("tareas-pendientes").textContent = pendientes;
    document.getElementById("tareas-completadas").textContent = completadas;
}

// Actualizar la lista
function actualizarLista() {
    const lista = document.getElementById("lista-tareas");
    lista.innerHTML = "";

    const busqueda = document.getElementById("buscar-tarea")
        .value.trim().toLowerCase();

    const filtroEstado = document.getElementById("filtro-estado").value;
    const orden = document.getElementById("orden-tareas").value;

    // Buscar y filtrar
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

    // Ordenar por fecha o prioridad
    const prioridades = {
        alta: 3,
        media: 2,
        baja: 1
    };

    tareasFiltradas.sort(function (a, b) {
        if (orden === "prioridad") {
            return prioridades[b.prioridad] - prioridades[a.prioridad];
        }

        const fechaA = new Date(a.fechaCreacion).getTime();
        const fechaB = new Date(b.fechaCreacion).getTime();

        if (orden === "antiguas") {
            return fechaA - fechaB;
        }

        return fechaB - fechaA;
    });

    // Mostrar tareas
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

    actualizarEstadisticas();
}

// Mostrar las tareas guardadas
actualizarLista();

// Agregar una nueva tarea
const formulario = document.getElementById("form-tarea");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const titulo = document.getElementById("titulo-tarea")
        .value.trim();

    const prioridad = document.getElementById("prioridad-tarea").value;

    if (titulo === "") {
        alert("Por favor, escribe el nombre de la tarea.");
        return;
    }

    tareas.push({
        titulo: titulo,
        completada: false,
        prioridad: prioridad,
        fechaCreacion: new Date().toISOString()
    });

    guardarTareas(tareas);
    formulario.reset();
    actualizarLista();
});

// Buscar tareas mientras se escribe
document.getElementById("buscar-tarea")
    .addEventListener("input", actualizarLista);

// Filtrar tareas por estado
document.getElementById("filtro-estado")
    .addEventListener("change", actualizarLista);

// Ordenar tareas
document.getElementById("orden-tareas")
    .addEventListener("change", actualizarLista);
