const person = {
    name: "pepe",
    age: 30
}

function saludar({ name, age }: { name: string, age: number }): number {
    console.log(`hola ${name}`);
    return age
}

saludar({ name: "luis", age: 2 })
let somevalue: string = saludar({ name: "luis", age: 2 })
//44 min

const sumar = (a: number, b: number): number => { return a + b }//45:46