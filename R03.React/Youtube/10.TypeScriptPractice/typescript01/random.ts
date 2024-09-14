const person = {
    name: "pepe",
    age: 30
}

function saludar({ name, age }: { name: string, age: number }): number {

    return age
}

saludar({ name: "luis", age: 2 })
//let somevalue: string = saludar({ name: "luis", age: 2 })
const sumarXY = (a: number, b: number): number => { return a + b }