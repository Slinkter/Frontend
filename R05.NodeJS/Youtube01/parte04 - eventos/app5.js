// async-await

function f_ordenarProducto(producto) {
    return new Promise((res, rej) => {
        console.log(`1  ---> ordernando : ${producto}`);
        setTimeout(() => {
            if (producto === "taza") {
                res("2.1 ---> ordeando una taza ");
            } else {
                rej("2.2  ---> este producto no esta disponible");
            }
        }, 3000);
    });
}

function f_procesarPedido(rpta) {
    return new Promise((res, rej) => {
        console.log("3.  ---> procesando respuesta ...");
        console.log(`4.  ---> la respuesta fue : "${rpta}"`);
        setTimeout(() => {
            res("5.  ---> Gracias por tu compra");
        }, 3000);
    });
}
// version async-await
async function realizarPedido(obj) {
    try {
        const x = await f_ordenarProducto(obj);
        const y = await f_procesarPedido(x);
        /*  */
        console.log("respuesta recibida");
        console.log(x);
        console.log(y);
    } catch (error) {
        console.log(error);
    }
}

realizarPedido("taza");

/* 
 ejecutar 2 funciones asicronos
 version then y catch


ordenarProducto("taza")
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
    }); 
*/
