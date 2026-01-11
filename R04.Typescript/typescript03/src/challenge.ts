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

/* type Employee = {
  id: number;
  name: string;
  department: string;
};

type Manager = {
  id: number;
  name: string;
  employeers: Employee[];
};

type Staff = Employee | Manager;

function printStaffDetails(parameter: Staff): void {
  if ("employeers" in parameter) {
    console.log(
      `this a manager ${parameter.name} y cant ${parameter.employeers.length} `
    );
  } else {
    console.log(
      `this a employer ${parameter.name} y cant ${parameter.department} `
    );
  }
}

let employer1: Employee = { id: 1, name: "luis", department: "Moda" };
let employer2: Employee = { id: 2, name: "Mario", department: "Sales" };
let boss1: Manager = {
  id: 1,
  name: "Jose",
  employeers: [employer1, employer2],
};

printStaffDetails(employer1); */

/* interface Computer {
  readonly id: number;
  brand: string;
  ram: number;
  updateRam(increase: number): number;
  storage?: number;
}

const laptop01: Computer = {
  id: 1,
  brand: "HP",
  ram: 4,
  updateRam(amount) {
    return (this.ram = this.ram + amount);
  },
};

console.log(laptop01);

laptop01.updateRam(4);
console.log(laptop01); */

interface Person {
  name: string;
}
interface DogOwner extends Person {
  dogName: string;
}
interface Manager extends Person {
  managePeople(): void;
  delegateTask(): void;
}

function getEmpleoyee(): Person | DogOwner | Manager {
  const random = Math.random();
  if (random < 0.33) {
    return { name: "john" };
  } else if (random < 0.66) {
    return { name: "sara", dogName: "rex" };
  } else {
    return {
      name: "bob",
      managePeople() {
        console.log("Manaming people");
      },
      delegateTask() {
        console.log("Deleting tasks...");
      },
    };
  }
}

const employee: Person | DogOwner | Manager = getEmpleoyee();
console.log(employee);
