interface Person {
  p_name: string;
  getDetails(): string;
}

interface Person {
  age: number;
}
const person: Person = {
  p_name: "Jhonny",
  age: 20,
  getDetails() {
    return "hola " + this.p_name + " tu edad es " + this.age;
  },
};

console.log(person.getDetails());
