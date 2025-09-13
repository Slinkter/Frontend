const fs = require("fs");

fs.readFile("./fshtml.html", "utf-8", (err, contenido) => {
    if (err) {
        throw err;
    } else {
        console.log(contenido);
    }
});

fs.rename("./fshtml.html", "fsmain.html", (err) => {
    if (err) {
        throw err;
    }
    console.log("nombre cambiado ");
});

fs.appendFile("fsmain.html", "<p>Hola</p>", (err) => {
    if (err) {
        throw err;
    }
    console.log("archivo actuliazado cambiado ");
});

fs.writeFile("fsmain.html", "contenido nuevo ", (err) => {
    if (err) {
        throw err;
    }
    console.log("contenido cambiado cambiado ");
});

fs.unlink("fsmain.html", (err) => {
    if (err) {
        throw err;
    }
    console.log("archivo eliminado");
});
