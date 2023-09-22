/* Clase 04/13 */
/* scope local */

function fruit() {
  if (true) {
    var fruit1 = "Apple";
    let fruit2 = "kiwi"; // emacs 6 - block scope
    const fruit3 = "banana"; // emacs 6 - block scope
    console.log(fruit1);
    console.log(fruit2);
    console.log(fruit3);
  }
  console.log(fruit1); // se ponen como global
  // console.log(fruit2);   // da error
  // console.log(fruit3); // da error
}

fruit();
//
function example() {
  for (var i = 0; i < 10; i++) {
    setTimeout(function () {
      console.log(i);
    }, 1);
  }
}
example();

function example2() {
  for (let i = 0; i < 10; i++) {
    setTimeout(function () {
      console.log(i);
    }, 1000);
  }
}

example2();

{
  console.log(nombre);
  var nombre = "lian";
  console.log(nombre);
}

let x = 5;
{
  console.log(x);
  let x = 5;
  console.log(x);
}
