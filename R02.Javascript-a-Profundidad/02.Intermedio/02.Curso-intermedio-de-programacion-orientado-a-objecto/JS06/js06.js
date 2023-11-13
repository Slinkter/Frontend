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

const obj3 = Object.assign({}, obj1);
const obj4 = Object.create(obj1);

console.log("obj1 : \n", obj1);
console.log("obj2 : \n", obj2);
console.log("obj3 : \n", obj3);
console.log("obj4 : \n", obj4);

const stringObj = JSON.stringify(obj1);
const Objparsed = JSON.parse(stringObj);

console.log(stringObj); // omiten  funciones de Obj1
console.log(Objparsed); //
