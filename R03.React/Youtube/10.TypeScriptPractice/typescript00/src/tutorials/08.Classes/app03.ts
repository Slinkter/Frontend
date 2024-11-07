// Definimos una interfaz llamada IPerson
interface IPerson {
    name: string; // Propiedad que representa el nombre de la persona
    age: number;  // Propiedad que representa la edad de la persona
    greet(): void; // Método que no retorna nada (void) y se espera que sea implementado
}

// Creamos una clase llamada Person que implementa la interfaz IPerson
class Person implements IPerson {
    // El constructor recibe dos parámetros y los asigna a propiedades públicas de la clase
    constructor(public name: string, public age: number) { }

    // Implementación del método greet definido en la interfaz IPerson
    greet(): void {
        // Imprime un mensaje en la consola utilizando las propiedades name y age
        console.log(
            `hello, my name is ${this.name} and I'm ${this.age} year old`
        );
    }
}

// Creamos una instancia de la clase Person con nombre "albert" y edad 109
const hypster = new Person("albert", 109);

// Llamamos al método greet de la instancia hypster
hypster.greet();

// 6:05:23
