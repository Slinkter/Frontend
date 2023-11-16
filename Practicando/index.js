const URL_BASE = "https://api.thecatapi.com/v1/";
const API_KEY =
  "live_BgeabuZRHRH2irUsFWjZREQBJ38KmhA2OdWWkOycJQLQ54j44JApcrWGIqXZn9Ym";
const API_URL_RANDOM = `${URL_BASE}images/search?limit=3&api_key=${API_KEY}`;
const API_URL_FAVORITE = `${URL_BASE}favourites?limit=3&api_key=${API_KEY}`;
const API_URL_LOAD_FAVORITE = `${URL_BASE}favourites?api_key=${API_KEY}`;
const API_URL_SAVE_FAVORITE = `${URL_BASE}favourites?api_key=${API_KEY}`;
const API_URL_UPLOAD = `${URL_BASE}images/upload`;

const spanError = document.getElementById("randomMichiError");
const content = document.getElementById("content");

const instance = axios.create({
  baseURL: URL_BASE,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
instance.defaults.headers.common["x-api-key"] = API_KEY;
/*  btnRecargar */
const loadRandomMichis = async () => {
  try {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    /*  */
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const img3 = document.getElementById("img3");
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
    /*  */
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const btn3 = document.getElementById("btn3");
    btn1.onclick = () => saveFavoriteMichi(data[0].id);
    btn2.onclick = () => saveFavoriteMichi(data[1].id);
    btn3.onclick = () => saveFavoriteMichi(data[2].id);
    btn1.textContent = "save Favorite";
    btn2.textContent = "save Favorite";
    btn3.textContent = "save Favorite";
    loadFavouriteCat();
  } catch (error) {
    spanError.innerHTML = "error" + error;
    console.log("error : ", error);
  } finally {
    console.log("finally");
  }
};
/* article > btn  */
const saveFavoriteMichi = async (idCat) => {
  try {
    /*  */
    const obj = { image_id: idCat };
    const url_favorite = "/favourites";
    /*  */
    const res = await instance.post(url_favorite, obj);
    const { data, status } = res;
    console.log("res : ", res);
    console.log("data : ", data);
    console.log("status : ", status);
  } catch (error) {}
};
const loadFavouriteCat = () => {};
