const URL_BASE = "https://api.escuelajs.co/api/v1";
const URL_API = `${URL_BASE}/products`;

const data = {};
data.title = "cristal incoloro";
data.price = 1.22;
data.description = "cristal incoloro de 6 mm";
data.categoryId = 1;
data.image = ["https://dasdas.com/dasd/dasd"];
console.log(data);
/* Function */
const f_postData = (p_url, p_data) => {};

/* Ejecuta */
f_postData(URL_API, data)
  .then(() => {})
  .then(() => {})
  .catch((error) => {
    console.log(error);
  })
  .finally("final");
