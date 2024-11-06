// promesa
const statusPedido = () => {
    return Math.random() < 0.8;
};
// funcion callback
const f_callback = (res, rej) => {
    setTimeout(() => {
        if (statusPedido()) {
            res("Exitoso !!! ");
        } else {
            rej("error !!! ");
        }
    }, 1000);
};
// promesa
const miPedidoPizza = new Promise(f_callback);
// definir que pasa
miPedidoPizza.then((x) => console.log(x)).catch((err) => console.log(err));
