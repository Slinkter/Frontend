const b12 = document.querySelector(".t12");
const b14 = document.querySelector(".t14");
const b16 = document.querySelector(".t16");

const cambiarTamaño = (tamaño) => {
  document.querySelector(".texto").style.fontSize = `${tamaño}px`;
};

b12.addEventListener("click", () => cambiarTamaño(12 * 2));

b14.addEventListener("click", () => cambiarTamaño(14 * 2));

b16.addEventListener("click", () => cambiarTamaño(16 * 2));
