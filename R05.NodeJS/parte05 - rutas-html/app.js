const http = require("http");
const my_server = http.createServer((req, res) => {
    /*     
console.log("===> req(solicitud)");
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);
    */
    console.log("=======> res(respuesta)");
    console.log(res.statusCode);
    res.statusCode = 404;
    console.log(res.statusCode);

    res.end("hola mundo");
});

const PORT = 3001;

my_server.listen(PORT, () => {
    console.log(` Hola, El servidor esta escuchando en el puerto... ${PORT}`);
});
