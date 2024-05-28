let somestring: string = "soy un string";
let someNumber: number = 322;
let someBoolean: boolean = false;

somestring = somestring.toUpperCase();
someNumber = someNumber + 0;
someBoolean = someNumber > 1 ? true : false;

/* 
somestring =1
someNumber = !"1"
someBoolean ="!1"
 */
console.log(somestring, someNumber, someBoolean);

let tax: number | string = 10;
tax = 100;
tax = "$10";

let requestStatus: "pending" | "success" | "error" = "pending";
requestStatus = "success";
//requestStatus ="notfound"

let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;

let random = "";
