let person15: [string, number] = ["john", 25];
//let person215: [number, string] = ["john", 25];
let data15: readonly [number, number, number] = [12, 17, 2001];
/* 
data15.push(34);
data15.push(34);
data15.push(34);
data15.push(34);
data15.push(34); 
*/
console.log(data15);

function getPerson(): [string, number] {
    return ["liam", 25];
}

let randomPerson15 = getPerson();

console.log(randomPerson15[0]);
console.log(randomPerson15[1]);
