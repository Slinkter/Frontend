try {
  const hello = () => {
    console.log("hello word");
  };
  hello();
} catch (error) {
  console.log(error);
}

try {
  anotherFn();
} catch {
  console.log("Esto es un error");
}
