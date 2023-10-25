function fruit() {
  // {} : handlebar ??
  if (true) {
    var fruit1 = "apple"; // functions scope
    let fruit2 = "kiwi"; // block scope
    const fruit3 = "banana"; /// block scope
  }
  console.log(fruit1);
  console.log(fruit2); //ReferenceError: fruit2 is not defined
  console.log(fruit2); //ReferenceError: fruit3 is not defined
}

fruit();
