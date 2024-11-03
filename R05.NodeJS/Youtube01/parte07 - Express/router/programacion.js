const express = require("express");
const { programacion } = require("../datos/cursos").infoCursos;
const routerProgramacion = express.Router();

routerProgramacion.get("/", (req, res) => {
    // res.send(JSON.stringify(programacion)); // enviar con formato json
    res.json(programacion);
});
// middleware
routerProgramacion.use(express.json());

routerProgramacion.get("/:lenguaje", (req, res) => {
    const lenguaje = req.params.lenguaje;
    const resultado = programacion.filter((obj) => obj.lenguaje === lenguaje);
    if (resultado.length === 0) {
        return res.status(404).send(` No se encontro el curso ${lenguaje}`);
    }

    if (req.query.ordenar === "vistas") {
        return res.send(
            JSON.stringify(resultado.sort((a, b) => b.vistas - a.vistas))
        );
    } else {
        return res.json(resultado); // enviar con formato json
    }
});

routerProgramacion.get("/:lenguaje/:nivel", (req, res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;
    const resultados = programacion.filter(
        (curso) => curso.lenguaje === lenguaje
    );
    if (resultados.length == 0) {
        return res
            .status(404)
            .send(`No se encontro ${lenguaje} del nivel : ${nivel}`);
    }
    return res.json(resultados); // enviar con formato json
});

routerProgramacion.post("/", (request, response) => {
    let cursoNuevo = request.body;
    programacion.push(cursoNuevo);
    response.send(JSON.stringify(programacion));
});

// actualizar todo un objecto

routerProgramacion.put("/:id", (req, res) => {
    const cursoActualizado = req.body; //{}
    const id = req.params.id;
    const indice = programacion.findIndex((curso) => curso.id == id);
    if (indice >= 0) {
        programacion[indice] = cursoActualizado;
    } else {
        return res.status(404);
    }

    res.send(JSON.stringify(programacion));
});

// de un ojbecto cambia una propiedad
routerProgramacion.patch("/:id", (req, res) => {
    const infoActualizada = req.body; //{}
    const id = req.params.id;
    const indice = programacion.findIndex((curso) => curso.id == id);
    //
    if (indice >= 0) {
        const cursoModificar = programacion[indice];
        Object.assign(cursoModificar, infoActualizada);
    }
    return res.json(programacion);
});

routerProgramacion.delete("/:id", (req, res) => {
    const id = req.params.id;
    const indice = programacion.findIndex((curso) => curso.id == id);
    //
    if (indice >= 0) {
        programacion.splice(indice, 1);
    }
    return res.json(programacion);
});

module.exports = routerProgramacion;
