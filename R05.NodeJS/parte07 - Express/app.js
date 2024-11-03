const express = require("express");
const app = express();
const { infoCursos } = require("./datos/cursos");
// Routers
const routerMatematicas = require("./router/matematicas");
app.use("/api/cursos/matematicas", routerMatematicas);

const routerProgramacion = require("./router/programacion");
app.use("/api/cursos/programacion", routerProgramacion);

// Routing

app.get("/", (req, res) => {
    res.send("Mi primer servidor con express ");
});

app.get("/api/cursos", (req, res) => {
    res.send(JSON.stringify(infoCursos)); // enviar con formato json
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log("el servidor esta escuchando en el puerto 3000");
});
