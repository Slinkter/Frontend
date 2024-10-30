console.log("tutorial 14 ");
interface Person {
    name: string;
    getDetails(): string;
}
interface Person {
    age: number;
}

interface Employee extends Person {
    employeeId: number;
}
interface DogOwner {
    dogName: string;
    getDogDetails(): string;
}

// Exec

const person: Person = {
    name: "john",
    age: 30,
    getDetails() {
        return ` Name : ${this.name} , Age : ${this.age}`;
    },
};

const employee: Employee = {
    name: "jane",
    age: 28,
    employeeId: 1233,
    getDetails() {
        return ` Name : ${this.name} , Age : ${this.age} , Employeed ID : ${this.employeeId}`;
    },
};

interface ManagerDog extends Person, DogOwner {
    managePeople(): void;
}

const manager: ManagerDog = {
    name: "jane",
    age: 28,
    dogName: "rex",
    getDetails() {
        return ` Name : ${this.name} , Age : ${this.age} `;
    },
    getDogDetails() {
        return `Name : ${this.dogName}`;
    },
    managePeople() {
        console.log("Managing people ...");
    },
};
manager.managePeople();
// 3:01:03
