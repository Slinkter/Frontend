const express = require("express");
const { matematicas } = require("../datos/cursos.js").infoCursos;
const routerMatematicas = express.Router();

routerMatematicas.get("/", (req, res) => {
    res.send(JSON.stringify(matematicas)); // enviar con formato json
});

// PARAMETROS DINAMICOS

routerMatematicas.get("/:tema", (req, res) => {
    const tema = req.params.tema;
    const resultados = matematicas.filter((curso) => curso.tema === tema);

    if (resultados.length === 0) {
        return res.status(404).send(`No se encontro ${tema}`);
    }

    res.send(JSON.stringify(resultados)); // enviar con formato json
});

module.exports = routerMatematicas;
