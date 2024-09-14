// las funciones no puede inferir sin contexto
function saludar(name: string) {
    console.log(`Hola ${name}`);
}

saludar("luis")
// saludar(2) no es correcto

// se debe evitar renombrar los argumentos
function saludarUno({ name, age }: { name: string, age: number }) {
    console.log(`Hola ${name} mi edad es ${age}`);
}

saludarUno({ name: "pepe", age: 20 })

// si tiene inferencia en el return 
function saludarDos({ name, age }: { name: string, age: number }): number {
    console.log(`Hola ${name} mi edad es ${age}`);
    return age
}
let usernameAge: number
usernameAge = saludarDos({ name: "pepe", age: 20 })

// tipeando las funciones 
// ? -> void es un tipo de datos ?
const sayHiFromFunction = (fn: (name: string) => void) => {
    fn("miguel")
}

const sayHi = ((name: string) => {
    console.log(`hola ${name}`);
})

sayHiFromFunction(sayHi)


const sumarTW = ({ a, b }: { a: number, b: number }): number => { return a + b }
const restarTW = ({ a, b }: { a: number, b: number }): number => { return a - b }

// si hay inferencia con funciones de array
const avengers = ["spidey", "hulk", "andmen"]
avengers.forEach(avenger => {
    console.log(avenger.toUpperCase());
})

