/* Herencia */

//Antes dee ES6
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function () {
  return "hello I am " + this.name;
};

function Developer(name) {
  this.name = name;
}
Developer.prototype = Object.create(Person.prototype);
Developer.prototype.writeCode = function (coffee) {
  if (coffee) {
    console.log("I am working in a new Feature");
  } else {
    console.log("I need coffee , please!");
  }
};

var dev = new Developer("Alex");
dev.greet();
dev.writeCode();

// Con Es6

class Cat {
  constructor(cat) {
    this.name = cat;
  }
  greet() {
    return "hello I am " + this.name;
  }
}

class Michi extends Cat {
  constructor(name) {
    super(name);
  }
  writeCode(coffee) {
    coffee ? console.log("I am devel") : console.log("i need coffe,please");
  }
}

const cat = new Cat("Candy");
console.log(cat.name);
console.log(cat.greet());

const michiCat = new Michi();
michiCat.greet();
michiCat.writeCode();
