/* Fetch POST */
import fetch from "node-fetch";
const API = "https://api.escuelajs.co/api/v1";

function postData(urlApi, data) {
  const response = fetch(urlApi, {
    method: "POST",
    mode: "cars",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
}
const data = {
  title: "new product glass",
  price: 1.22,
  description: "A descript",
  categoryId: 1,
  images: ["https://dasds.com/33/33/sd"],
};

postData(`${API}/products`, data)
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
  .finally("final");
