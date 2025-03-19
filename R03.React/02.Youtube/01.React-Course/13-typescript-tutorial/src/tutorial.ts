const propAge = "Age";
const propName = "Name";
const propBreed = "Breed";
type Animal = {
  [propAge]: number;
  [propName]: string;
  [propBreed]?: string;
};

let tiger: Animal = {
  [propAge]: 5,
  [propName]: "Tobi",
  [propBreed]: "Pitbull",
};
console.log(tiger);
