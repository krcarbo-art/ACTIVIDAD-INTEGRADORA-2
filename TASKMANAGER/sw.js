
const CACHE_NAME = "taskmanager-v1";

const ARCHIVOS = [
    "./",
    "./index.html",
    "./CSS/styles.css",
    "./js/script.js",
    "./js/dom.js",
    "./js/storage.js",
    "./js/api.js"
];

// Guardar los archivos de la aplicación
self.addEventListener("install", function (evento) {
    evento.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(ARCHIVOS);
        }).then(function () {
            return self.skipWaiting();
        })
    );
});

// Activar el Service Worker
self.addEventListener("activate", function (evento) {
    evento.waitUntil(
        caches.keys().then(function (nombres) {
            return Promise.all(
                nombres
                    .filter(function (nombre) {
                        return nombre !== CACHE_NAME;
                    })
                    .map(function (nombre) {
                        return caches.delete(nombre);
                    })
            );
        }).then(function () {
            return self.clients.claim();
        })
    );
});

// Responder desde caché cuando no hay conexión
self.addEventListener("fetch", function (evento) {
    const solicitud = evento.request;
    const url = new URL(solicitud.url);

    // No guardar ni interceptar la API externa
    if (url.origin !== self.location.origin) {
        return;
    }

    if (solicitud.method !== "GET") {
        return;
    }

    evento.respondWith(
        caches.match(solicitud).then(function (respuestaGuardada) {
            return respuestaGuardada || fetch(solicitud);
        })
    );
});
