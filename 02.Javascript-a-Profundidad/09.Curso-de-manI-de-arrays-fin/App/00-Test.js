const myProducts = [];
const products = [];
products.push({ title: "Burger", price: 121, id: "🍔" });
products.push({ title: "Hot cakes", price: 121, id: "🥞" });
products.push({ title: "Pizza", price: 121, id: "🍕" });

console.log("-".repeat(20));
const index = products.findIndex((item) => item.id === "🍕");
console.log(index);

if (index !== -1) {
  console.log(index);
  const addProduc = products[index];
  myProducts.push(addProduc);
  products.splice(index, 1);
  /*  */
  console.log(addProduc);
  console.log(myProducts);
  console.log(products);
} else {
  console.log("no existe el id");
}
const productsV2 = [];
a = { title: "Pizza", price: 40, id: "🍕" };
b = { title: "Burger", price: 20, id: "🍔" };
c = { title: "Hot cakes", price: 5, id: "🥞" };

productsV2.push(a);
productsV2.push(b);
productsV2.push(c);
console.log(productsV2);

const productMod = {
  id: "🥞",
  changes: {
    price: 80,
    title: "KFC",
  },
};
/* Buscar ID  */
const productIndex = productsV2.findIndex((item) => item.id === productMod.id);
console.log(productIndex);
/* modificar el con spread operator */
productsV2[productIndex] = {
  ...productsV2[productIndex],
  ...productMod.changes,
};
console.log(productsV2);
const numbers = [1, 30, 4, 21, 100000];
console.log(numbers.sort());
console.log(numbers.sort((a, b) => a - b));
const words = [
  "réservé",
  "premier",
  "communiqué",
  "café",
  "adieu",
  "eclair",
  "banana",
];
console.log(words.sort());
console.log(words.reverse());
const orders = [
  {
    customerName: "Nicolas",
    total: 60,
    delivered: true,
  },
  {
    customerName: "Zulema",
    total: 12,
    delivered: false,
  },
  {
    customerName: "Santiago",
    total: 1840,
    delivered: true,
  },
  {
    customerName: "Valentina",
    total: 24,
    delivered: true,
  },
];

console.log(orders.sort((a, b) => b.total - a.total));
