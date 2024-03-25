const person = {
  name: "Lydia",
  age: 21,
};

const meperson = Object.create(person);
console.log(typeof person);
console.log(typeof meperson);
