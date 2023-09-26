import fetch from "node-fetch";
const API = "https://api.escuelajs.co/api/v1";
/*  */
const fetchData = (urlAPI) => {
  return fetch(urlAPI);
};
/*  */

fetchData(`${API}/products`)
  .then((res1) => res1.json())
  .then((products) => fetchData(`${API}/products/${products[0].id}`))
  .then((res2) => res2.json())
  .then((product) => fetchData(`${API}/categories/${product.category.id}`))
  .then((res3) => res3.json())
  .then((category) => console.log(category.name))
  .catch((err) => console.log(err))
  .finally(() => console.log("finally"));
