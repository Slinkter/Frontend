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
/* includes */
let customerName = "Nicolas";
const rpta = f_search(customerName);
function f_search(user) {
  return orders.filter((order) => {
    return order.customerName.includes(user);
  });
}
console.log(rpta);
