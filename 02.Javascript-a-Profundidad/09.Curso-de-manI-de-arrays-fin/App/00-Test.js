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
const newOrdersTotal = orders.map((elemento) => elemento.total);
const newOrdersIGV = orders.map((elemento) =>
  Math.round(elemento.total * 1.18)
);
const newOrdersAdd = orders.map((element) => {
  return { ...element, clave: "valor" };
});
console.log(orders);
console.log(newOrdersTotal);
console.log(newOrdersIGV);
console.log(newOrdersAdd);
const products = [
  {
    name: "Product 1",
    price: 1000,
    stock: 10,
  },
  {
    name: "Product 2",
    price: 2000,
    stock: 20,
  },
];
const newProducts = products.map((product) => {
  return {
    ...product,
    taxes: Math.trunc(product.price * 0.18),
    taxes2: product.price * 0.18,
  };
});
console.log(newProducts);
