//
const anotherFuncion = () => {
  return new Promise((res, rej) => {
    if (true) {
      res("Hey!!");
    } else {
      rej("Whoooops!");
    }
  });
};
//
anotherFuncion()
  .then((rpta) => console.log(rpta))
  .catch((err) => console.log(err));

const promesa = () => {
  return new Promise((resolve, reject) => {
    if (something) {
      resolve("Se ha resuelto la promesa");
    } else {
      reject("Se ha rechazado la promesa");
    }
  });
};

promesa()
  .then((respuesta) => console.log(respuesta)) //En caso que se ejecute resolve
  .catch((error) => console.log(error)); //En caso que se ejecute reject
