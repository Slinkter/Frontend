const propNanme = "Age";
type Animal = {
  [propNanme]: number;
};

let tiger: Animal = { [propNanme]: 5 };
console.log(tiger);
