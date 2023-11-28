const products = [];
products.push({ title: "Pizza", price: 121, id: "🍕" });
products.push({ title: "Burger", price: 121, id: "🍔" });
products.push({ title: "Hot cakes", price: 121, id: "🥞" });
console.log("products", products);
//
const myProducts = [];

console.log("myProducts", myProducts);
console.log("-".repeat(20));
// si existe , retorna index  sino -1
const productIndex = products.findIndex((item) => item.id === "🍕");
console.log(productIndex);
// si productIndex es diferente de -1 , agregar y eliminar
if (productIndex !== -1) {
  myProducts.push(products[productIndex]); // add product-position
  products.splice(productIndex, 1); // delete product
}

console.log("products", products);
console.log("myProducts", myProducts);
console.log("-".repeat(20));

// Update - spared operator
const productsV2 = [
  { title: "Pizza", price: 121, id: "🍕" },
  { title: "Burger", price: 121, id: "🍔" },
  { title: "Hot cakes", price: 121, id: "🥞" },
];
// post update
const update = {
  id: "🥞",
  changes: {
    price: 200,
    title: "delicioso",
  },
};
//
const productIndexV2 = productsV2.findIndex((item) => item.id === update.id);
//
productsV2[productIndexV2] = {
  ...productsV2[productIndexV2],
  ...update.changes,
};
console.log(productsV2);
