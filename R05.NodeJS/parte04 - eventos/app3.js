// Promesa
const isComplete = true;
// res y rej son funciones
const callbackPromesa = (res, rej) => {
    setTimeout(() => {
        if (isComplete) {
            res("promesa cumplida");
        } else {
            rej("promesa rechazada...");
        }
    }, 3000);
};
const miPromesa = new Promise(callbackPromesa);

const f1 = (valor) => {
    console.log(valor);

    return valor;
};
const f2 = (valor) => {
    console.log(valor);
};

miPromesa.then(f1).then(f2);
