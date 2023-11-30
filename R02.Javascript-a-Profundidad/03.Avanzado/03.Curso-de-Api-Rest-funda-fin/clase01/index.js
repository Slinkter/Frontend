console.log("conexion");
const API_KEY =
  "live_BgeabuZRHRH2irUsFWjZREQBJ38KmhA2OdWWkOycJQLQ54j44JApcrWGIqXZn9Ym";
/*  */
const f_getData = async (API_URL) => {
  const res = await fetch(`${API_URL}`);
  const data = await res.json();
  return data;
};

async function getImgCat() {
  const API_URL = `https://api.thecatapi.com/v1/images/search?limit=3&api_key=${API_KEY}`;
  const data = await f_getData(API_URL);

  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");
  const img3 = document.getElementById("img3");

  img1.src = data[0].url;
  img2.src = data[1].url;
  img3.src = data[2].url;
}

const btn = document.querySelector("button");
btn.onclick = getImgCat;
