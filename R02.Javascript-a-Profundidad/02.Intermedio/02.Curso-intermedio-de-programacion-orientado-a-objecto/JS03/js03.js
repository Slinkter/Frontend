const juan = {
  name: "juan",
  age: 18,
  approvedCourses: ["curso 1"],
  addCourse(newCourse) {
    console.log("this : \n", this);
    console.log("this.approvedCourses : \n", this.approvedCourses);
    this.approvedCourses.push(newCourse);
  },
};
/*  */
console.log(Object.entries(juan));
console.log(Object.keys(juan));
console.log(Object.values(juan));
/*  */
console.log(Object.getOwnPropertyNames(juan));
console.log(Object.getOwnPropertyDescriptors(juan));

/*  */
Object.defineProperty(juan, "pruebaNASA", {
  value: "OVNI",
  enumerable: true,
  writable: true,
  configurable: true,
});

Object.defineProperty(juan, "navigator", {
  value: "Chrome",
  enumerable: false,
  writable: true,
  configurable: true,
});

Object.defineProperty(juan, "editor", {
  value: "vs code",
  enumerable: false,
  writable: true,
  configurable: false,
});

console.log(Object.getOwnPropertyDescriptors(juan));
// clase 04
juan.navigator;
// ("Chrome");
Object.keys(juan);
//['name', 'age', 'approvedCourses', 'addCourse', 'pruebaNASA']
Object.getOwnPropertyNames(juan);
// ['name', 'age', 'approvedCourses', 'addCourse', 'pruebaNASA', 'navigator', 'editor']
juan.navigator = "Firefox";
// Firefox
delete juan.navigator;
// undefined
/* otros metodos estaticos */
Object.seal(juan); // --> evita que se pueda borrar (configurable : false )
Object.freeze(juan); // -->  evitar borrar y editar (configurable : false y writable : false )
