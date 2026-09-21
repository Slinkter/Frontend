"strict mode";

const validar = (msj) => {
  let edad;
  try {
    if (msj) {
      edad = prompt(msj);
    } else {
      edad = prompt("introducir tu edad");
    }

    edad = parseInt(edad);

    if (edad) {
      throw "intrudce una edad validad o numerica ";
    }

    if (edad > 18) {
      console.log("tu eres mayor de edad");
    } else {
      console.log("tu eres menor de edad");
    }
  } catch (error) {
    validar(error);
  }
};

validar();
