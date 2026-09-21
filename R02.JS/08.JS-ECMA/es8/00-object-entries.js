const countries = { CO: "Colombia", MX: "Mexico", CL: "Chile", PE: "Peru" };
const ObjCountries = Object.entries(countries);
//
console.log("countries : ", countries);
console.log(ObjCountries.flat().join().includes("mexico"));
console.log("ObjCountries[1][1] : ", ObjCountries[1][1]);

const usuario = {
  name: "Liam",
  email: "liam26@gmail.com",
  age: 26,
};

const arrayUsuario = Object.entries(usuario);
console.log("arrayUsuario :", arrayUsuario);
