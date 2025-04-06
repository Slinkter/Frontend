let unknownValue: unknown
unknownValue = "Hello world"
unknownValue = [1, 2, 3]
unknownValue = 43.12312
console.log(unknownValue);

if (typeof unknownValue === "number") {
  console.log(unknownValue.toFixed(2));
}

function runSomeCode() {
  const random = Math.random()
  if (random < 0.5) {
    throw new Error("something went wrong")
  } else {
    throw "some error"
  }
}


try {
  runSomeCode()
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log(error);

  }
}