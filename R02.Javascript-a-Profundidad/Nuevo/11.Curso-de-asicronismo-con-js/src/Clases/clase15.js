const fnAsync = () => {
  return new Promise((resolve, reject) => {
    true
      ? setTimeout(() => resolve("Async 4"), 2000)
      : setTimeout(() => reject(new Error("error!")), 3000);
  });
};

const anotherFn = async () => {
  console.log("  2");
  const something = await fnAsync();
  console.log(something);
  console.log(" 5");
};

console.log("  1 ");
anotherFn();
console.log("  3");
