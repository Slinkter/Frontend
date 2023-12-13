class user {
  greeting() {
    return "Hello";
  }
}

const saludo = new user();
const herencia = new user();
console.log(saludo.greeting());
console.log(herencia.greeting());
// constructor

class useron {
  constructor() {
    console.log("Nuevo Usuario");
  }
  greeting() {
    return "Hello";
  }
}

const david = new useron();
console.log(david.greeting());

// this
class useres {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return "Hello";
  }

  greeting() {
    return `${this.speak()} ${this.name} mensaje dede greeting`;
  }
}

const user003 = new useres("Nava");
console.log(user003.greeting());

// setters getters

class userqwe {
  // constructor
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // metodos
  speak() {
    return "Hello";
  }

  greeting() {
    return `${this.speak()} ${this.name}`;
  }

  get uAge() {
    //get obtener. Obtener el valor de age
    return this.age;
  }

  set uAge(n) {
    //set asignar. Asignar al age el valor de n
    this.age = n;
  }
}

const platzi = new userqwe("Ferney Nava", 26);
console.log(platzi.uAge);
console.log((platzi.uAge = 20));
