const newFechaUTC = (dias) => {
  let fecha = new Date();
  fecha.setTime(fecha.getTime() + dias * 1000 * 60 * 60 * 24);
  return fecha.toUTCString();
};

const crearCookies = (name, dias) => {
  expires = newFechaUTC(dias);
  document.cookie = `${name};expires=${expires}`;
};

crearCookies("usuario=dalto", "4");

const obtenerCookie = (cookie) => {
  let cookies = document.cookie;
  cookies = cookies.split(";");
};
