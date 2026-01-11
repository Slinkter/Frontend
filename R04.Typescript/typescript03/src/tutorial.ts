interface Person {
  name: string;
  getDetails(): string;
}

interface DogOwner {
  dogName: string;
  getDogDetails(): string;
}

interface Person {
  age: number;
}
const usuario123123124: Person = {
  name: "pepe",
  age: 30,
  getDetails() {
    return `Name :${this.name} ,Age : ${this.age}`;
  },
};

console.log(usuario123123124.getDetails());

interface Employee extends Person {
  employeeId: number;
}

const empleado355123: Employee = {
  name: "Jorge",
  age: 22,
  employeeId: 22,
  getDetails() {
    return ` soy empleado ${this.name}`;
  },
};

console.log(empleado355123);

interface Manager extends Person, DogOwner {
  managePeople(): void;
}

const manager1: Manager = {
  name: "bob",
  age: 35,
  dogName: "rex",
  getDetails() {
    return ``;
  },
  getDogDetails() {
    return ``;
  },
};
