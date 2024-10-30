// async await
//

function ordenarProducto(producto) {
    return new Promise((res, rej) => {
        console.log(`ordernando : ${producto}`);

        setTimeout(() => {
            if (producto === "taza") {
                res("ordeando una taza ");
            } else {
                rej("este producto no esta disponible");
            }
        }, 3000);
    });
}
