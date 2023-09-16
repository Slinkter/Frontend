/* -- var - */
var lastName = "David"; // declarando y asignando el valor
lastName = "Oscar"; //Acá reasignamos
console.log(lastName);

/* -- let - */
let fruit = "Apple"; // declarando y asignando el valor
fruit = "Kiwi"; //Reasignamos
console.log(fruit);

const animal = "Dog";
console.log(animal);
/* animal = "Cat"; //Con const no podemos reasignar un valor
console.log(animal); */

//Arrow Functions
const fruits = () => {
  if (true) {
    var fruit1 = "Apple";
    let fruit2 = "Kiwi";
    const fruit3 = "Banana";
  }
  console.log(fruit1); //function scope
  console.log(fruit2); //block scope
  console.log(fruit3); //block scope
};

fruits();
