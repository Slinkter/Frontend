function sum(message: string, ...nums: number[]): string {
  const doubled = nums.map((x) => x * 2);
  let sumary = doubled.reduce((x, y) => {
    return x + y;
  }, 0);
  let msj = ` ${message}  ${sumary}`;

  console.log(doubled);

  return msj;
}

let result = sum("total is: ", 1, 2, 3, 4, 5);

console.log(result);
