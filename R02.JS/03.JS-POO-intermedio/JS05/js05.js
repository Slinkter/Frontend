/* El proma de copiar obj  */
const juanita = {
  age: 15,
  email: "juania@gmail.com",
};
// copiamos la referencia en memoria
const nath = juanita;
nath.email = "nath@gmail.com ";
nath.age = 20;
//  y al copiarlo tambien se modifica
console.log(juanita);
console.log(nath);
