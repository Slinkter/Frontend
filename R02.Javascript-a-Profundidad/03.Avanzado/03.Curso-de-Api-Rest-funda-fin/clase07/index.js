/* CONSTATE  */
const BASE_URL = "https://api.thecatapi.com/v1";
const API_KEY =
  "live_BgeabuZRHRH2irUsFWjZREQBJ38KmhA2OdWWkOycJQLQ54j44JApcrWGIqXZn9Ym";
/*  URL PERSONALIZADOS */
const API_URL_RANDOM = `${BASE_URL}/images/search?limit=3&api_key=${API_KEY}`;
const API_URL_FAVORITE = `${BASE_URL}/favourites?limit=3&api_key=${API_KEY}`;
const API_URL_LOAD_FAVORITE = `${BASE_URL}/favourites?api_key=${API_KEY}`;
const API_URL_SAVE_FAVORITE = `${BASE_URL}/favourites?api_key=${API_KEY}`;
const API_URL_UPLOAD = `${BASE_URL}/images/upload`;
/* html */
const spanError = document.getElementById("randomMichiError");
const content = null || document.getElementById("content");
/* axios */
const options = {
  baseURL: "https://api.thecatapi.com/v1/",
  headers: { "X-Custom-Header": "foobar", "x-api-key": API_KEY },
  timeout: 1000,
};
const api = axios.create(options);
/* ALL Functions */
async function loadRandomMichis() {
  console.log("loadRandomMichis()");
  try {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    /* SET IMG */
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const img3 = document.getElementById("img3");
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
    /*  SET BUTTON */
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const btn3 = document.getElementById("btn3");
    btn1.onclick = () => saveFavoriteMichi(data[0].id);
    btn2.onclick = () => saveFavoriteMichi(data[1].id);
    btn3.onclick = () => saveFavoriteMichi(data[2].id);
    btn1.textContent = "Save Favorite";
    btn2.textContent = "Save Favorite";
    btn3.textContent = "Save Favorite";
    /*  */
    loadFavouriteCat();
  } catch (error) {
    console.log("error : ", error);
    spanError.innerHTML = "error al consultar la API";
    spanError.innerHTML = "error al consultar la API" + res.status;
  } finally {
    console.log("finally");
  }
}

async function loadFavouriteCat() {
  try {
    const res = await fetch(API_URL_LOAD_FAVORITE);
    if (res.status !== 200) {
      content.innerHTML = "";
      spanError.innerHTML = "hubo un error : " + res.status;
    } else {
      content.innerHTML = "";
      const data = await res.json();
      console.log("loadFavouriteMicis()");
      console.log("data Favorite: \n", data);
      const view = data
        .map(
          (item) => `
          <article>
            <img src="${item.image.url}" width="150" alt="" />
            <button class="btnDelete" id="${item.id}" name="${item.id} " >
              delete
            </button>
          </article>`
        )
        .join("");
      content.innerHTML = view;
      /*  */
      const deleteButtons = document.querySelectorAll(".btnDelete");
      for (const button of deleteButtons) {
        button.addEventListener("click", function () {
          if (button.id) {
            deleteFavoriteMichi(button.id);
          }
        });
      }
    }
  } catch (error) {
    console.log("error :", error);
  } finally {
    console.log("finally");
  }
}
/* Button */
async function saveFavoriteMichi(id) {
  try {
    const objAxios = { image_id: id };
    const resAxios = await api.post("/favourites", objAxios);
    const { data, status } = resAxios;
    console.log(resAxios);
    console.log(data);
    console.log(status);
    loadRandomMichis();
  } catch (error) {
    console.log("error", error);
  } finally {
    console.log("saveFavoriteMichi(id)");
  }
}

async function deleteFavoriteMichi(favouriteId) {
  console.log("deleteFavoriteMichi(favouriteId) ");
  try {
    //
    const API_URL_DELETE = `https://api.thecatapi.com/v1/favourites/${favouriteId}?api_key=${API_KEY}`;
    //
    const options = {
      method: "DELETE",
    };
    //
    const res = await fetch(API_URL_DELETE, options);
    //
    if (res.status !== 200) {
      spanError.innerHTML = "hubo un error : " + res.status;
      console.log("Error al eliminar el favorito", res.status);
    } else {
      const data = await res.json();
      console.log("data \n", data);
      console.log("Michi eliminado");
    }
  } catch (error) {
    console.log("error :", error);
  } finally {
    loadRandomMichis();
  }
}
// upload file-img.jpeg
async function uploadMichiPhoto() {
  console.log("uploadMichiPhoto");
  try {
    // html file
    const form = document.getElementById("uploadingForm");
    const formData = new FormData(form);
    //
    const options = {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
      },
      body: formData,
    };
    //
    const res = await fetch(API_URL_UPLOAD, options);
    if (res.status !== 201) {
      spanError.innerHTML = "hubo un error : " + res.status + res.statusText;
      console.log("Error al subir foto", res.status, res.statusText);
    } else {
      console.log("res.status : ", res.status);
      console.log("res.statusText : ", res.statusText);
      const data = await res.json();
      console.log("data : \n", data);
      console.log({ data });
      console.log(data.url);
      saveFavoriteMichi(data.id);
    }
  } catch (error) {
    console.log("error", error);
  } finally {
    console.log("Finally");
  }
}

loadRandomMichis();

/* Save */
/*  
  try {
    // pasar de Obj a String
    const idSaveCat = JSON.stringify({ image_id: id });
    //
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: idSaveCat,
    };
    //
    const res = await fetch(API_URL_SAVE_FAVORITE, options);
    //
    if (res.status !== 200) {
      spanError.innerHTML = "hubo un error : " + res.status;
      console.log("error al consultar la API : ", res.status);
    } else {
      const data = await res.json();
      console.log("res.state", res.status);
      console.log("data :\n", data);
      console.log("Michi agregado");
    }
  } catch (error) {
    console.log("error", error);
  } finally {
    loadRandomMichis();
    console.log("finally");
  } 
  */
