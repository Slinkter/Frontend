const REQUEST = require("xmlhttprequest").XMLHttpRequest;
const API = "https://api.escuelajs.co/api/v1";

function fetchData(urlApi, callback) {
  let xhttp = new REQUEST();
  xhttp.open("GET", urlApi, true);
  xhttp.onreadystatechange = function (e) {
    if (xhttp.readyState === 4) {
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

  const urlN2 = `${API}/products/${data1[0].id}`;

  fetchData(urlN2, (error2, data2) => {
    if (error2) {
      return console.error(error2);
    }

    const urlN3 = `${API}/categories/${data2.category.id}}`;

    fetchData(urlN3, (error3, data3) => {
      if (error3) {
        return console.error(error3);
      }
      console.log(data1[0], data2.title, data3.name);
    });
  });
});
