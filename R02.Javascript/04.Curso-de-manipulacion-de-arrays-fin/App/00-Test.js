const products = [
    {
        id: "🍕",
        name: "Pizza",
        price: 12,
    },
    {
        id: "🍔",
        name: "Burger",
        price: 23,
    },
    {
        id: "🌭",
        name: "Hot dog",
        price: 34,
    },
    {
        id: "🥞",
        name: "Hot cakes",
        price: 355,
    },
];

console.log("-".repeat(20));
const cart = [];
const isFoundProduct = products.findIndex((x) => x.id === "🍔");
if (isFoundProduct) {
    cart.push(products[isFoundProduct]);
    products.splice(isFoundProduct, 1);
}

console.log(isFoundProduct);
console.log(cart);
console.log(products);
const update = {
    id: "🥞",
    changes: {
        price: 200,
        title: "delicioso",
    },
};


const 