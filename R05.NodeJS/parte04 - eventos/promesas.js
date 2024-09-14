const isComplete = false;

const miPromesa = new Promise((res, rej) => {
    setTimeout(() => {
        if (isComplete) {
            res("promesa cumplida");
        } else {
            rej("promesa rechazada...");
        }
    }, 3000);
});

const f1 = (valor) => {
    console.log(valor);
};
const f2 = (valor) => {
    console.log(valor);
};

miPromesa.then(f1, f2);
