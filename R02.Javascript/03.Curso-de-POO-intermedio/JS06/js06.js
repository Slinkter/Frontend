const obj1 = {
    a: "a",
    b: "b",
    x: {
        d: "d",
        e: "e",
    },
    editA() {
        this.a = "variable modificado";
    },
};

/* 
obj2 es una copia superficial de obj1. 
Las propiedades primitivas (a, b) se copian correctamente,
x es un objeto anidado, por lo que obj2.x y obj1.x apuntan al mismo objeto en memoria. 
Cualquier cambio en obj1.x se reflejará en obj2.x.
*/

const obj2 = {};
for (i in obj1) {
    obj2[i] = obj1[i];
}
/* 
Object.assign también realiza una copia superficial. 
Al igual que obj2, obj3.x y obj1.x apuntan al mismo objeto en memoria.
*/
const obj3 = Object.assign({}, obj1);
/* 
obj4 no es una copia de obj1. En su lugar, obj4 tiene a obj1 como su prototipo. Esto significa que obj4 hereda las propiedades de obj1, pero no las tiene directamente. Si accedes a obj4.a, obtendrás obj1.a, pero si modificas obj4.a, estarás creando una nueva propiedad en obj4 sin afectar a obj1.
*/
const obj4 = Object.create(obj1);

/* 

stringObj y Objparsed :
Ventaja: JSON.stringify y JSON.parse crean una copia profunda del objeto, lo que significa que Objparsed es una copia independiente de obj1, incluyendo los objetos anidados.
Limitación: Este método no copia funciones. Por lo tanto, Objparsed no tendrá el método editA.

*/

const stringObj = JSON.stringify(obj1);
const Objparsed = JSON.parse(stringObj);

/*  */
console.log("obj1 : ", obj1);
console.log("obj2 : ", obj2);
console.log("obj3 : ", obj3);
console.log("obj4 : ", obj4);
console.log("stringObj : ", stringObj);
console.log("Objparsed : ", Objparsed);
