/* Clases */

// con ES5 <
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function () {
  return "hello I am " + this.name;
};

// Con Es6

class Cat {
  constructor(cat) {
    this.name = cat;
  }
  greet() {
    return "hello I am " + this.name;
  }
}

const cat = new Cat("Oliver");
console.log(cat.name);
console.log(cat.greet());
