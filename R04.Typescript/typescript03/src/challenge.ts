/* let element: string = "element";
console.log(element.toLowerCase());
let num: number = 2;
console.log(num + 5);
let isMayor: boolean = true;
console.log(2 > 1 ? isMayor : !isMayor);
 */

/* let orderStatus: "processing" | "shipped" | "deliverd" = "processing";
orderStatus = "shipped";
orderStatus = "deliverd";
let discount: number | string = 20;
discount = "20%"; */

/* let bike: {
  brand: string;
  year: number;
} = { brand: "yamaha", year: 2010 };



let laptop: {
  brand: string;
  year: number;
} = { brand: "HP", year: 2016 };


const produts: { title: string; price?: number }[] = [
  { title: "ipad", price: 100 },
  { title: "xiaomi x5", price: 700 },
];
produts.push({ title: "", price: "1000" });


 */

/* const names: string[] = ["John", "Jane", "Jim", "Jill"];

function isExistName(parameterName: string): boolean {
  const isOn = names.includes(parameterName);
  return isOn;
}

let nametest: string = "Jane";
if (isExistName(nametest)) {
  console.log(`${nametest} is in the list `);
} else {
  console.log(`${nametest} is not in the lise `);
}
 */

/* function processdata(
  input: number | string,
  config: { reverse: boolean } = { reverse: false }
) {
  if (typeof input === "number") {
    return (input = input ** 2);
  } else {
    if (config.reverse === true) {
      return input.toUpperCase().split("").reverse().join("");
    } else {
      return input.toUpperCase();
    }
  }
}

console.log(processdata(2));
console.log(processdata("hola", { reverse: true }));
 */

type Employee = {
  id: number;
  name: string;
  department: string;
};

type Manager = {
  id: number;
  name: string;
  employeers: Employee[];
};

type Staff = Employee & Manager;

function printStaffDetails(parameter: Staff) {
  if (parameter.employeers) {
    console.log(
      `this a manager ${parameter.name} y cant ${parameter.employeers.length} `
    );
  } else {
    console.log(
      `this a employer ${parameter.name} y cant ${parameter.department} `
    );
  }
}

let employer1 :Employee = {id:1,name:'luis','Moda'}