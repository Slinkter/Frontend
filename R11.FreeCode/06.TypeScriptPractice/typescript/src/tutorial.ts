/*
let greeting: string = "hello ,typescript"
greeting = greeting.toLocaleUpperCase()
console.log(greeting);
let age: number = 25
age = age + 25

let isAdult: boolean = age >= 18
isAdult = !isAdult
console.log(isAdult);

greeting = 10
age = "thiry"
isAdult = "yes"
console.log(greeting, age, isAdult);
 */

/*
const books = ["1984", "brave new world", "fahrenheit 451"]
let foundBook: string | undefined;
foundBook = books.filter(book => book === "1984")[0]

console.log(foundBook);
console.log(foundBook?.length);
 */

/* let discount: number | string = 20
discount = "20%"
//discount = true

let orderStatus: "proccessing " | "shipped" | "delivered" = "proccessing"
orderStatus = "shipped"
orderStatus = "cancelled"
 */

/* let prices: number[] = [100, 75, 42]
let fruit: string[] = ["apple", "orange"]
let emptyValues: number[] = []

//prices.push("hello")
//fruit.push(2)

let names = ["liam", "peter"]

let array: (string | boolean)[] = ["apple", true, "orange", false]

let arrayTemperatures: number[] = [20, 25, 30]
let arrayColor: string[] = ["red", "green", "blue"]
let mixedArray: (number | string)[] = [1, "two", 3]

*/
//-----> 56:50
/* 
let car01: { brand: string, year: number } = { brand: "toyota", year: 2024 }
let car02: { brand: string, year: number } = { brand: "audi", year: 2021 }
car01.brand = "Ford"
//car01.color = "red"
console.log(car01);


let book = { title: "book", cost: 20 }
let pen = { title: "pen", cost: 10 }
let notebook = { title: "book" }

let items: { readonly title: string; cost?: number }[] = [book, pen, notebook]
//items[0].title = "new book"
console.log(items); 
*/

/* let bike: {} = {}
let laptop: {} = {}

let p1 = { title: "shirt", price: 20 }
let p2 = { title: "pants" }
let products: { title: string, price?: number }[] = [p1, p2]
products.push({ title: "shoes" })
console.log(products);
 */

/* function sayHi(name: string) {
  console.log(`Hello there ${name.toUpperCase()}`);
}

sayHi("liam")


function calculateDiscount(price: number) {
  const hadDiscount = true

  if (hadDiscount) {
    return price
  }
  return price * 0.9


}
const finalPrice = calculateDiscount(200)
console.log(finalPrice);

 */

/* function addThree(number: any) {
  let anotherNumber: number = 3
  return number + anotherNumber
}

const rpta = addThree(3)
const someValue = rpta




console.log(rpta);
 */

/* const names: string[] = ["liam", "jane", "jhon", "jim"]
function isNameList(name: string): boolean {
  return names.includes(name)
}

let nameToChecek = "jane"

if (isNameList(nameToChecek)) {
  console.log(`${nameToChecek} is in the list`);
} else {
  console.log(`${nameToChecek} is not the list`);
}

 */
/* 
function calculatePrice(price: number, discount?: number): number {
  return price - (discount || 0)
}
let priceAfterDiscount = calculatePrice(100, 20)
console.log(priceAfterDiscount);

let priceAfterDiscount2 = calculatePrice(100)
console.log(priceAfterDiscount2);

function calculateScore(initialScore: number, penaltyPoints: number = 0) {
  return initialScore - penaltyPoints
}

let sc01 = calculateScore(100, 20)
let sc02 = calculateScore(100)
console.log(sc01);
console.log(sc02);


 */

/* 
const sum = (message: string, ...numbers: number[]): string => {

  const total = numbers.reduce((previous, current) => {
    return previous + current
  }, 0)

  const cadena = message + total
  return cadena
}

let result = sum("the total is :", 1, 2, 3, 4, 5, 6)
console.log(result);
 */
/* 
function processInput(input: string | number) {
  if (typeof input === "number") {
    console.log(input * 2);
  } else {
    console.log(input.toLowerCase());
  }
}

processInput(10);
processInput("hello");
 */

function createEmployee({ id }: { id: number }): {
  id: number;
  isActive: boolean;
} {
  return { id, isActive: id % 2 === 0 };
}

const first = createEmployee({ id: 1 });
const second = createEmployee({ id: 1 });

console.log(first, second);

function createStudent(student: { id: number; name: string }): void {
  console.log(` welcome to the course ${student} !!!`);
}

const newStudent = {
  id: 5,
  name: "anna",
};
createStudent(newStudent);
