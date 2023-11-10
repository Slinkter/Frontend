const numbers = [1, 2, 3, 4, 5];
const doble = numbers.reduce((acc, current) => acc.concat(current * 2), []);
console.log(doble);
