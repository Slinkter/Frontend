<<<<<<< HEAD
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
=======
let someVaule: never = 0;

type Theme = "light" | "dark";
console.log(Theme);

function checkTheme(tema: Theme): void {
    if (tema === "light") {
        console.log("el tema es claro");
        return;
    }
    if (tema === "dark") {
        console.log("el tema es oscuro");
        return;
    }
}

enum Color {
    Red,
    Blue,
}

function getColorName(x: Color) {
    switch (x) {
        case Color.Red:
            return "red";

        case Color.Blue:
            return "blue";

        default:
            let unexpectedColor: never = x;
            throw new Error("unexpected color value", x);
    }
}
>>>>>>> cab4a2a9e63f7ad2324b4ae7c538051edda04b2a
