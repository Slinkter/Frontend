import fetch from "node-fetch";

const urlAPI = "https://api.escuelajs.co/api/v1/products";
const response = await fetch(urlAPI);
const products = await response.json();

export { products };
