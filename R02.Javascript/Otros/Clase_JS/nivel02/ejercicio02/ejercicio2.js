//
const sendButton = document.getElementById("snd-nota");
//
sendButton.addEventListener("click", () => {
  let resultado, mensaje;
  try {
    nota = parseInt(document.getElementById("nota").value);
    resultado = categoria(nota); // return string
    mensaje = verificar(nota); // return string
  } catch (e) {
    resultado = "esto es el try catch de resultado ";
    mensaje = "try catch de mensaje ";
  }
  abrilmodal(resultado, mensaje);
});

const categoria = (nota) => {
  let resultado;
  switch (nota) {
    case 1:
      resultado = "Tu no es 1 , debes llevar el curso de nuevo";
      break;
    case 2:
      resultado = "Tu no es 2 , debe estudiar mas  ";
      break;
    case 3:
      resultado = "Tu no es 3 , debes ser mas rapido";
      break;
    case 4:
      resultado = "Tu no es 4 ";
      break;
    case 5:
      resultado = "Tu no es 5 ";
      break;
    case 6:
      resultado = "Tu no es 6 ,estas desaprobado";
      break;
    case 7:
      resultado = "Tu no es 7,estas aprobado ";
      break;
    case 8:
      resultado = "Tu no es 8 ,estas aprobado";
      break;
    case 9:
      resultado = "Tu no es 9,estas aprobado ";
      break;
    case 10:
      resultado = "Tu no es 10,estas aprobado ";
      break;
    default:
      resultado = null;
  }
  return resultado;
};

const verificar = (nota) => {
  (n1 = 8), (n2 = 5);
  promedio = (n1 + n2 + nota) / 3;
  if (promedio >= 7) {
    return "<span class='green'>Aprobado</span>";
  } else {
    return "<span class='red'>Desaprobado</span>";
  }
};

const abrilmodal = (resultado, mensaje) => {

  document.querySelector(".resultado").innerHTML = resultado;
  document.querySelector(".mensaje").innerHTML = mensaje;
  //
  let modal = document.querySelector(".modal-background");
  modal.style.display = "flex";
  modal.style.animation = "showanimatemodal 1s forwards";
};
