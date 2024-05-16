/* import fetch from "node-fetch"; */
const API = "https://api.escuelajs.co/api/v1";
//
async function fetchData(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
//
const getAllData = async (urlAPI) => {
  try {
    const data = await fetchData(`${urlAPI}/products`);
    const prod = await fetchData(`${urlAPI}/products/${data[0].id}`);
    const cat = await fetchData(`${urlAPI}/categories/${prod.category.id}`);
    console.log(data);
    console.log(prod.title);
    console.log(cat.name);
  } catch (error) {
    console.log(error);
  }
};
console.log("inicio");
getAllData(API);
console.log("fin");
