const obj1 = {
  a: "a",
  b: "b",
  c: {
    d: "d",
    e: "e",
  },
  editA() {
    this.a = "aaaaa x2";
  },
};
const obj2 = {};
for (prop in obj1) {
  obj2[prop] = obj1[prop];
}

console.log(obj1);
console.log(obj2);

const obj3 = Object.assign({}, obj1);
console.log(obj3); // tiene el mismo problema
const obj4 = Object.create(obj1); // copia
console.log(obj4);

const stringObj = JSON.stringify(obj1);
const Objparsed = JSON.parse(stringObj);

console.log(stringObj);
console.log(Objparsed);
