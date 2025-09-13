const http = require("http");
const my_server = http.createServer((req, res) => {
    console.log("===> request");
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);
    console.log("===> response");
    console.log(res.statusCode);
    res.statusCode = 404;
    console.log(res.statusCode);
    res.end("hola mundo");
});

const PORT = 3000;
my_server.listen(PORT, () => {
    console.log(` Hola, El servidor esta escuchando en el puerto... ${PORT}`);
});
