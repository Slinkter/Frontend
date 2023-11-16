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
/*  btnRecargar - get data from server */
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
    const id = JSON.stringify({ image_id: idCat });
    const options = {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: id,
    };
    const res = await fetch(API_URL_SAVE_FAVORITE, options);
    const data = await res.json();
    console.log("data : ", data);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("finally");
  }
};
/*  */
const deleteFavoriteMichi = async (idCat) => {
  const API_URL_DELETE = `${URL_BASE}favourites/${idCat}?api_key=${API_KEY}`;

  try {
    const options = {
      method: "DELETE",
    };
    const res = await fetch(API_URL_DELETE, options);
    const data = res.json();
    console.log("data : \n ", data);
    console.log("Cat eliminado");
    loadRandomMichis();
  } catch (error) {
    console.log("error", error);
    spanError.innerHTML = "hubo un error : " + res.status;
    console.log("Error al eliminar el favorito", res.status);
  }
};
/* btn upload cat img   */

const uploadCatPhoto = async () => {
  try {
    const formimg = document.getElementById("uploadingForm");
    const formData = new FormData(formimg);
    const options = {
      method: "POST",
      headers: {},
      body: formData,
    };
    /*  */
    const res = await fetch(API_URL_UPLOAD, options);
    const data = await res.json();
    saveFavoriteMichi(data.id);
    console.log("data : \n", data);
    console.log(data.url);
  } catch (error) {}
};

/* init page  */
const loadFavouriteCat = async () => {
  try {
    /*  */
    const res = await fetch(API_URL_LOAD_FAVORITE);
    const data = await res.json();
    /*  */
    if (!data) {
      content.innerHTML = "";
      spanError.innerHTML = "no hay data" + res.status;
    } else {
      const viewHtml = data.map(
        (cat) =>
          `
          <article>
            <img src="${cat.image.url}" width="150" alt="" />
            <button id="${cat.id}" name="${cat.id} " >
              delete
            </button>
          </article>    
        `
      );
      content.innerHTML = viewHtml.join("");
      /*  */
      const arrayDeleteButton = document.querySelectorAll("button");
      for (const btn of arrayDeleteButton) {
        btn.addEventListener("click", () => {
          if (btn.id) {
            deleteFavoriteMichi(btn.id);
          }
        });
      }
    }

    /*  */
  } catch (error) {
    console.log("error", error);
  } finally {
    console.log("finally");
  }
};

loadRandomMichis();
