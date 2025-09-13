// Asyn Await
// - Aparecen en ES8 (ecmacscript 2017)
// - unas formas mas sencial de hacer promesas
// - async , indica que va a devolver una promesa
// - await , indica al inteprete que espere la promesa para continuar

const fnAsync = () => {
  return new Promise((resolve, reject) => {
    true
      ? setTimeout(() => resolve(" 4"), 2000)
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
