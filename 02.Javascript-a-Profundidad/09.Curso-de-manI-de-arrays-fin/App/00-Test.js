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
/* filter  */
const newArray = [];
const words = ["spray", "limit", "elite", "exuberant"];
words.forEach((element) => {
  if (element.length >= 6) {
    newArray.push(element);
  }
});
console.log(newArray);

const newWords = words.filter((item) => item.length >= 6);
console.log(newWords);

console.log(orders);
const queryOrders01 = orders.filter(
  (item) => !item.delivered && item.total < 150
);
console.log(queryOrders01);

const f_search = (queryword) => {
  return orders.filter((item) => {
    return item.customerName.includes(queryword);
  });
};

console.log(f_search("Zulema"));
/*  */
const totals = [1, 2, 3, 4];
const newTotals = totals.reduce((acc, item) => acc + item, 0);
console.log(newTotals);
