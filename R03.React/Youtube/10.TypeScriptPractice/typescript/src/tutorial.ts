let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

type Bird = {
  name: string;
};

let birdString = '{ "name": "Eagle" }';
let dogString = '{ "breed ": "Eagle" }';
let birdObject = JSON.parse(birdString);
let dogObject = JSON.parse(dogString);

let bird = birdObject as Bird;
let dog = dogObject as Bird;

console.log(bird.name);
console.log(dog.name);

enum Status {
  Pending = "pending",
  Declined = "declined",
}

type User = {
  name: string;
  status: Status;
};
// 3:28:52
