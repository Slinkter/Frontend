/* 
Fetch 
- es una funcion para realizar peticiones HTTP asincronas
- maneja peticiones HTTP : GET - POST - PUT - DELETE
- retorna una promesa
*/

const fetchData = (urlAPI) => {
    return fetch(urlAPI);
};

const BASE_API = "https://api.escuelajs.co/api/v1";
const API_PRODUCTS = `${BASE_API}/products`;

fetchData(API_PRODUCTS)
    .then((res) => res.json())
    .then((data) => console.log(data[0]))
    .then(() => console.log("hola"))
    .then(() => console.log("mundo"))
    .catch((error) => console.log(error))
    .finally("final");
