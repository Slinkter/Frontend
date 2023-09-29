const fnAsync = () => {
  return new Promise((resolve, reject) => {
    true
      ? setTimeout(() => resolve("Async"), 2000)
      : setTimeout(() => reject(new Error("error!")), 3000);
  });
};

const anotherFn = async () => {
  console.log("hola");
  const something = await fnAsync();
  console.log(something);
  console.log("hello");
};

console.log("before");
anotherFn();
console.log("After");
