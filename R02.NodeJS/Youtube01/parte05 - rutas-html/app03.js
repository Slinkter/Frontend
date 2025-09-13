const http = require("http");
const db_cursos = require("./app03cursos");
console.log(db_cursos);
// --->
function f_manejarSolicitudGET(req, res) {
    const path = req.url;
    if (path === "/") {
        res.statusCode = 200;
        res.end("Bienvenidos a mi primer servidor y API creados ");
    } else if (path === "/cursos") {
        res.statusCode = 200;
        res.end(JSON.stringify(db_cursos.infoCursos));
    } else if (path === "/cursos/programacion") {
        res.statusCode = 200;
        res.end(JSON.stringify(db_cursos.infoCursos.programacion));
    } else if (path === "/cursos/matematicas") {
        res.statusCode = 200;
        res.end(JSON.stringify(db_cursos.infoCursos.matematicas));
    } else {
        res.statusCode = 404; // No encontrado
        res.end("Ruta no encontrada matematicas");
    }
}

function f_manejarSolicitudPOST(req, res) {
    const path = req.url;

    if (path === "/cursos/programacion") {
        res.statusCode = 200;
        return res.end("El server recibio una solicitud POST ");
    }
}

const my_server = http.createServer((req, res) => {
    const { method } = req;
    switch (method) {
        case "GET":
            return f_manejarSolicitudGET(req, res);
        case "POST":
            return f_manejarSolicitudPOST(req, res);
        default:
            console.log(`El metodo no puede ser usado por servidor ${method}`);
    }
});

my_server.listen(3000, () => {
    console.log("el servidor esta escuchando en el puerto 3000");
});

// 6:06:50
