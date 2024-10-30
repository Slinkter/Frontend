let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
console.log(strLength);

type Bird = { name: string };

let birdString = '{"name":"Eagle"}';
let dogString = '{"breed":"Poodle"}';

let birdObject = JSON.parse(birdString);
let dogObject = JSON.parse(dogString);

let bed = birdObject as Bird;
let dog = dogObject as Bird;

console.log(bed.name);
console.log(dog.name);

enum Status {
    Pending = "pending",
    Declined = "declined",
}

type User17 = {
    name: string;
    status: Status;
};

const statusvalue = "pending";
const user17: User17 = { name: "liam", status: statusvalue as Status };
console.log(user17);
/* other */

let unknowValue: unknown;
unknowValue = "Hello World";
unknowValue = [1, 2, 3];
unknowValue = 3.14;

if (typeof unknowValue === "number") {
    unknowValue.toFixed(2);
}

function runSomeCode() {
    const random = Math.random();
    if (random < 0.5) {
        throw new Error("there was error..");
    } else {
        throw "string";
    }
}

try {
    runSomeCode();
} catch (error) {
    console.log(error);
}
