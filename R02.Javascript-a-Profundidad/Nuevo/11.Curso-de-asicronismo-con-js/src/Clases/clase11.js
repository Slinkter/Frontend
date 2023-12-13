const API = "https://api.escuelajs.co/api/v1";
const urlProduct = `${API}/products`;
/*  */
const getData = (urlAPI) => {
  return fetch(urlAPI);
};
/*  */

getData(urlProduct)
  .then((res1) => res1.json())
  .then((products) => fetchData(`${API}/products/${products[0].id}`))
  .then((res2) => res2.json())
  .then((product) => fetchData(`${API}/categories/${product.category.id}`))
  .then((res3) => res3.json())
  .then((category) => console.log(category.name))
  .catch((err) => console.log(err))
  .finally(() => console.log("finally"));
