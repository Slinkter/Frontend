interface IPerson {
    name: string;
    age: number;
    greet(): void;
}

class Person implements IPerson {
    constructor(public name: string, public age: number) {}
    greet(): void {
        console.log(
            `hello, my name is ${this.name} and I'm ${this.age} year old`
        );
    }
}

const hypster = new Person("albert", 109);
hypster.greet();
// 6:05:23
