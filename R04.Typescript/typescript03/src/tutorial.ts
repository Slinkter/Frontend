interface IPerson {
    name: string;
    age: number;
    greet(): void;
}

class Person implements IPerson {
    public name: string;
    public age: number;
    constructor(p1: string, p2: number) {
        this.name = p1;
        this.age = p2;
    }

    greet(): void {
        console.log("hola", "", "name ", this.name, " age :", this.age);
    }
}

const person01 = new Person("luis", 23);
person01.greet();
