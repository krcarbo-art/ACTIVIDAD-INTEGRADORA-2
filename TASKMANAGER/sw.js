
const CACHE_NAME = "taskmanager-v2";

// Archivos necesarios para funcionar sin internet
const ARCHIVOS = [
    "./",
    "./index.html",
    "./CSS/styles.css",
    "./js/script.js",
    "./js/dom.js",
    "./js/storage.js",
    "./js/api.js"
];

// Instalar y guardar los archivos en caché
self.addEventListener("install", function (evento) {
    evento.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(ARCHIVOS);
            })
            .then(function () {
                return self.skipWaiting();
            })
    );
});

// Activar el Service Worker y limpiar cachés anteriores
self.addEventListener("activate", function (evento) {
    evento.waitUntil(
        caches.keys()
            .then(function (nombres) {
                return Promise.all(
                    nombres
                        .filter(function (nombre) {
                            return nombre.startsWith("taskmanager-") &&
                                nombre !== CACHE_NAME;
                        })
                        .map(function (nombre) {
                            return caches.delete(nombre);
                        })
                );
            })
            .then(function () {
                return self.clients.claim();
            })
    );
});

// Servir los archivos guardados cuando no hay conexión
self.addEventListener("fetch", function (evento) {
    const solicitud = evento.request;
    const url = new URL(solicitud.url);

    // No interceptar solicitudes a otras páginas o API externas
    if (url.origin !== self.location.origin) {
        return;
    }

    // Solo procesar solicitudes GET
    if (solicitud.method !== "GET") {
        return;
    }

    evento.respondWith(
        caches.match(solicitud).then(function (respuestaGuardada) {

            // Si la página solicita una ruta de navegación,
            // usar index.html guardado como respaldo
            if (solicitud.mode === "navigate") {
                return caches.match("./index.html")
                    .then(function (paginaGuardada) {
                        return paginaGuardada || respuestaGuardada ||
                            fetch(solicitud);
                    });
            }

            // Usar caché para CSS y JavaScript
            if (respuestaGuardada) {
                return respuestaGuardada;
            }

            // Si no está guardado, solicitarlo normalmente
            return fetch(solicitud);
        })
    );
});
