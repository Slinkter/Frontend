// async await
//

function ordenarProducto(producto) {
    return new Promise((res, rej) => {
        console.log(`1:ordernando : ${producto}`);

        setTimeout(() => {
            if (producto === "taza") {
                res("2.1ordeando una taza ");
            } else {
                rej("2.2este producto no esta disponible");
            }
        }, 3000);
    });
}
function procesarPedido(rpta) {
    return new Promise((res, rej) => {
        console.log("3.procesando respuesta");
        console.log(`4.la respuesta fue : "${rpta}"`);
        setTimeout(() => {
            res("5.Gracias por tu compra");
        }, 3000);
    });
}
// ejecutar 2 funciones asicronos
// version then y catch
/* ordenarProducto("taza")
    .then((rpta) => {
        console.log("respuesta recibida");
        console.log(rpta);
        return procesarPedido(rpta);
    })
    .then((rpta2) => {
        console.log(rpta2);
    })
    .catch((err) => {
        console.log(err);
    }); */
// version async-await

async function realizarPedido(obj) {
    try {
        const rpta = await ordenarProducto(obj);
        const rpta2 = await procesarPedido(rpta);
        /*  */
        console.log("respuesta recibida");
        console.log(rpta);
        console.log(rpta2);
    } catch (error) {
        console.log(error);
    }
}

realizarPedido("taza");
