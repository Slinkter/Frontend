/* import fetch from "node-fetch"; */
const API = "https://api.escuelajs.co/api/v1";
//
async function fetchData(urlAPI) {
  const res = await fetch(urlAPI);
  const data = await res.json();
  return data;
}
//
const anotherfunction = async (urlAPI) => {
  try {
    const products = await fetchData(`${urlAPI}/products`);
    const product = await fetchData(`${urlAPI}/products/${products[0].id}`);
    const category = await fetchData(
      `${urlAPI}/categories/${product.category.id}`
    );
    console.log(products);
    console.log(product.title);
    console.log(category.name);
  } catch (error) {
    console.log(error);
  }
};

anotherfunction(API);
