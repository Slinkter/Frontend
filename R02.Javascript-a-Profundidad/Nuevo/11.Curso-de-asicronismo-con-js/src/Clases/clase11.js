const API = "https://api.escuelajs.co/api/v1";
const API_PRODUCTS = `${API}/products`;
/*  */
const getData = (urlAPI) => {
  return fetch(urlAPI);
};
/*  */

getData(API_PRODUCTS)
  .then((res1) => res1.json())
  .then((products) => fetchData(`${API}/products/${products[0].id}`))
  .then((res2) => res2.json())
  .then((product) => fetchData(`${API}/categories/${product.category.id}`))
  .then((res3) => res3.json())
  .then((category) => console.log(category.name))
  .catch((err) => console.log(err))
  .finally(() => console.log("finally"));

/* 
  
  
  {
    "id": 16,
    "title": "Classic White Tee - Timeless Style and Comfort",
    "price": 73,
    "description": "Elevate your everyday wardrobe with our Classic White Tee. Crafted from premium soft cotton material, this versatile t-shirt combines comfort with durability, perfect for daily wear. Featuring a relaxed, unisex fit that flatters every body type, it's a staple piece for any casual ensemble. Easy to care for and machine washable, this white tee retains its shape and softness wash after wash. Pair it with your favorite jeans or layer it under a jacket for a smart look.",
    "images": [
      "https://i.imgur.com/Y54Bt8J.jpeg",
      "https://i.imgur.com/SZPDSgy.jpeg",
      "https://i.imgur.com/sJv4Xx0.jpeg"
    ],
    "creationAt": "2024-04-04T13:07:20.000Z",
    "updatedAt": "2024-04-04T13:07:20.000Z",
    "category": {
      "id": 1,
      "name": "nuevo",
      "image": "https://i.imgur.com/QkIa5tT.jpeg",
      "creationAt": "2024-04-04T13:07:20.000Z",
      "updatedAt": "2024-04-04T14:43:56.000Z"
    }
  },
  */
