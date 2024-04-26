const countries = { CO: "Colombia", MX: "Mexico", CL: "Chile", PE: "Peru" };
console.log("countries : ", countries);
//
const arrayCountries = Object.entries(countries);
console.log("arrayCountries : ", arrayCountries);
console.log("arrayCountries[1][1] : ", arrayCountries[1][1]);

console.log("----------------");
const usuario = {
  name: "Liam",
  email: "liam26@gmail.com",
  age: 26,
};

const arrayUsuario = Object.entries(usuario);
console.log("arrayUsuario :", arrayUsuario);
