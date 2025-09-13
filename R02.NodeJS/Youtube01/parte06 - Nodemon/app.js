const PORT = 3000;
const http = require("http");
const my_server = http.createServer((req, res) => {
    res.end("hola Peru!!!");
});
my_server.listen(PORT, () => {
    console.log(`El servidor esta escuando por el puerto ${PORT}`);
});
