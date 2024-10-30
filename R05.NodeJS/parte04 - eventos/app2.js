const EventEmitter = require("events");
const emisorProductos = new EventEmitter();
// esto es el evento compra
// cuando ocurra el evento [compra] => ejecutar la funcion(handlefunction)
emisorProductos.on("compra", (total, numProductos) => {
    console.log(`total de la compra :  $ ${total}`);
    console.log(`numero de productos :  $ ${numProductos}`);
});
// cuando se venta un producto
// quiero emitir(emit) un evento compra
emisorProductos.emit("compra", 500, 2);
//emisorProductos.emit("compra", 100, 4);
//console.log(EventEmitter);
