const array = [5, 6, 3, 2, 1];

for (let item of array) {
  console.log(item);
}

const object = { a: 1, b: 2, c: 3, d: 4 };
for (let item in object) {
  console.log(item);
  console.log(...item);
}

/* test */

const potencia = 5 ** 2;
console.log(potencia);

const saludo = "Hola mundo";
console.log(saludo.includes("Hola"));
const fruit = ["manzana", "pera", "piña", "uva"];
console.log(fruit.includes("pera"));
console.log(fruit[0].includes("manza"));
console.log(fruit[0].includes("pera"));

const letrasEvaluar = { a: 1, b: 2, c: 3, d: 4 };
// buscar la clave(clave-valor)
console.log("a" in letrasEvaluar);
//console.log(letrasEvaluar.hasOwmProperty("a"));
/* ES8 */
const user = {
  name: "Jhonatan",
  age: "26",
  uni: "ulima",
};
console.log(Object.entries(user));
console.log(Object.entries(user).length);
console.log(Object.keys(user));
console.log(Object.values(user));
/*  */
async function myFunctionAsunc() {
  /* code */
}
const myFunctionAsunc2 = async () => {
  /* code */
  try {
    const rpta = await promesa();
    return rpta;
  } catch (error) {
    return error;
  }
};
/* ES9 */

const forAwaite = async () => {
  const nombre = ["ferney", "erika", "pedro"];
  for await (let item of nombre) {
    console.log(item);
  }
};

forAwaite();

/* ES10 */
const array22 = [1, (2)[(3, 4)], 5, 6];
const result = array22.flat();
console.log(result);
result; // [1,2,3,4,5,6]
