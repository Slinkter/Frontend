// promesa
const statusPedido = () => {
    return Math.random() < 0.8;
};

// promesa
const miPedidoPizza = new Promise((res, rej) => {
    setTimeout(() => {
        if (statusPedido()) {
            res("Exitoso !!! ");
        } else {
            res("error !!! ");
        }
    }, 1000);
});
// definir que pasa
miPedidoPizza.then((x) => console.log(x)).catch((err) => console.log(err));
