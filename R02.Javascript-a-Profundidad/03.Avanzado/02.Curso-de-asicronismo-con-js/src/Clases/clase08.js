const REQUEST = require("xmlhttprequest").XMLHttpRequest;
const API = "https://api.escuelajs.co/api/v1";

function fetchData(urlApi, callback) {
  let xhttp = new REQUEST();
  xhttp.open("GET", urlApi, true);
  xhttp.onreadystatechange = function (e) {
    console.log(xhttp.readyState);
    if (xhttp.readyState === 4) {
      console.log(xhttp.readyState);
      if (xhttp.status === 200) {
        // valor : 200 ---> la solicitud en ser servidor es correcta
        callback(null, JSON.parse(xhttp.responseText));
      } else {
        const error = new Error("error " + urlApi);
        return callback(error, null);
      }
    }
  };
  xhttp.send();
}

fetchData(`${API}/products`, (error1, data1) => {
  if (error1) {
    return console.error(error1);
  }
  fetchData(`${API}/products/${data1[0].id}`, (error2, data2) => {
    if (error2) {
      return console.error(error2);
    }
    fetchData(`${API}/categories/${data2?.category?.id}}`, (error3, data3) => {
      if (error3) {
        return console.error(error3);
      }
      console.log(data1[0], data2.title, data3.name);
    });
  });
});
