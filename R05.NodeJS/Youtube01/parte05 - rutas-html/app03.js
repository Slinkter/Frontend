const http = require("http");
const cursos = require("./app03cursos");

console.log(cursos);
const server = http.createServer((req, res) => {
    const { method } = req;
    switch (method) {
        case "GET":
            return manejarSolicitudGET(req, res);
        case "POST":
            return manejarSolicitudPOST(req, res);
        default:
            console.log(`El metodo no puede ser usado por servidor ${method}`);
    }
});

function manejarSolicitudGET(req, res) {
    const path = req.url;

    if (path === "/") {
        res.statusCode = 200;
        res.end("Bienvenidos a mi primer servidor y API creados ");
    } else if (path === "/cursos") {
        res.statusCode = 200;
        res.end(JSON.stringify(cursos.infoCursos));
    } else if (path === "/cursos/programacion") {
        res.statusCode = 200;
        res.end(JSON.stringify(cursos.infoCursos.programacion));
    } else if (path === "/cursos/matemaicas") {
        res.statusCode = 200;
        res.end(JSON.stringify(cursos.infoCursos.matemaicas));
    } else {
        res.statusCode = 404; // No encontrado
        res.end("Ruta no encontrada");
    }
}

function manejarSolicitudPOST(req, res) {
    const path = req.url;

    if (path === "/cursos/programacion") {
        res.statusCode = 200;
        return res.end("El server recibio una solicitud POST ");
    }
}

server.listen(3000, () => {
    console.log("el servidor esta escuchando en el puerto 3000");
});

// 6:06:50
