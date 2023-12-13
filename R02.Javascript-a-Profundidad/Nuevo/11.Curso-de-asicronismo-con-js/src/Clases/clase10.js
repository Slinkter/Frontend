/* Fetch */
import fetch from "node-fetch";
const API = "https://api.escuelajs.co/api/v1";

const fetchData = (urlAPI) => {
  return fetch(urlAPI);
};

fetchData(`${API}/products`)
  .then((res) => res.json())
  .then((products) => {
    console.log(products);
  })
  .then(() => console.log("hola "))
  .catch((error) => console.log(error))
  .finally("final");
