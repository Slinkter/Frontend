/* ----------------------------------------- */
/* Descuento con Número*/
/* ----------------------------------------- */

const btn = document.querySelector("#calculador");
btn.addEventListener("click", calcularDscto);

function calcularDscto() {
  const price = Number(document.querySelector("#price").value); // id
  const discount = Number(document.querySelector("#discount").value); // id
  const rpta = document.querySelector("#rpta"); // id

  if (!price || !discount) {
    const rptaForm = "el precio o el descuento es invalido";

    rpta.innerHTML = `error : ${rptaForm}`;
  } else {
    const rptaForm = (price * (100 - discount)) / 100;
    rpta.innerHTML = `el nuevo  precio es ${rptaForm} despues del descuento`;
  }
  if (discount > 15) {
    rpta.innerHTML = `descuento invalidado`;
  }
  document.querySelector("#price").value = "";
  document.querySelector("#discount").value = "";
}

/* ----------------------------------------- */
/* Descuento con Cupon */
/* ----------------------------------------- */

const idBtn = document.querySelector("#idCalculador");
idBtn.addEventListener("click", btnCalcularDscto);

function btnCalcularDscto() {
  /* Cupones */
  const cuponsList = [
    {
      name: "ABC",
      discount: 10,
    },
    {
      name: "QWE",
      discount: 8,
    },
    {
      name: "ZXC",
      discount: 5,
    },
  ];
  /* datos externos */
  const price = Number(document.querySelector("#idPrice").value);
  const cupon = String(document.querySelector("#idCount").value);
  const idRpta = document.querySelector("#idRpta");
  /* Validacion */
  if (!price || !cupon) {
    idRpta.innerHTML = `formulario no valido`;
    return;
  }
  /* Validacion */
  let discount;
  cuponsList.filter((item) => {
    if (item.name == cupon) {
      discount = item.discount;
    } else {
      discount = 0;
    }
  });

  if (discount > 0) {
    const newPrice = (price * (100 - discount)) / 100;
    idRpta.innerHTML = `el nuevo  precio es ${newPrice} despues del descuento`;
    return;
  } else {
    idRpta.innerHTML = `cupon no válido `;
    return;
  }
}

/* Clase 09 */
const users = [];
users.push({ id: 123, name: "Juanito Alcachofa" });
users.push({ id: 456, name: "Juanita Alcaparra" });

function solution(users, id) {
  return users.find((user) => user.id === id)?.name || false;
}
solution(users, 456);
solution(users, 999);
