const os = require("os");
console.log(os.type());
console.log(os.homedir());
console.log(os.uptime());
console.log(os.userInfo());

function mostrarTema(tema) {
    console.log(` estoy aprendiendo ${tema}`);
}
// high order programming
setTimeout(mostrarTema, 3000, "node.js");
// ejemplo 1
function sumar(a, b) {
    console.log(a + b);
}
setTimeout(sumar, 1000, 1, 11);

//
console.log("1");
setImmediate(mostrarTema, "node1", "node2");
console.log("2");

function mostrarTema(tema) {
    console.log(` estoy aprendiendo ${tema}`);
}
setInterval(mostrarTema, 4000, "node");
