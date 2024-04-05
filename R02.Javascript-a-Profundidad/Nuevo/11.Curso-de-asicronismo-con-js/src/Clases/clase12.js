/* Fetch POST */

const BASE_API = "https://api.escuelajs.co/api/v1";
const API_PRODUCTS = `${BASE_API}/products`;

const data = {
  title: "GLASS BLUE",
  price: 12.0,
  description: "A GLAS COLOR BLUE",
  categoryId: 1,
  images: ["https://dasds.com/33/33/sd"],
};

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

postData(API_PRODUCTS, data)
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
  .finally("final");
