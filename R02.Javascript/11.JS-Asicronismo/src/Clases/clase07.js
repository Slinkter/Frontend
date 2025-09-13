/* 
este metodo era como antiguamente 
se hacia las peticiones al servidor  
*/
const REQUEST = require("xmlhttprequest");
const API = "https://api.escuelajs.co/api/v1";
// valor : 1 --> Loading
// valor : 2 --> acepta el send
// valor : 3 --> Descargando / interatua
// valor : 4 --> Loading / completo la llamada
function fetchData(urlApi, callback) {
    let xhttp = new REQUEST();
    xhttp.open("GET", urlApi, true);
    xhttp.onreadystatechange = function (e) {
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                // valor : 200 ---> la solicitud en ser servidor es correcta
                callback(null, JSON.parse(xhttp.responseText));
            }
        } else {
            const error = new Error("error " + urlApi);
            return callback(error, null);
        }
        xhttp.send();
    };
}
