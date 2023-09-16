const numNew = [1, 1, -2, -3];
const lettersNew = ["z", "x", "y"];
lettersNew.forEach((item) => console.log(item));
/*  */
const array01 = lettersNew.map((item) => item.toLocaleUpperCase());
console.log(array01);
console.log(array01.join());
console.log(array01.join("."));
console.log(array01.join("-"));

const f_multielement = (array) => {
  return array.map((item) => item * 2);
};

const rpta = f_multielement(numNew);
console.log(rpta);
/*  */
const orders = [
  {
    customerName: "Nicolas",
    total: 60,
    delivered: true,
  },
  {
    customerName: "Zulema",
    total: 120,
    delivered: false,
  },
  {
    customerName: "Santiago",
    total: 180,
    delivered: true,
  },
  {
    customerName: "Valentina",
    total: 240,
    delivered: true,
  },
];
console.log(orders);
