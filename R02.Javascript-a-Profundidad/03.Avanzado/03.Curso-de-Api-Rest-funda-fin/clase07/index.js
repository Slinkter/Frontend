/* CONSTATE  */
const API_KEY =
  "live_BgeabuZRHRH2irUsFWjZREQBJ38KmhA2OdWWkOycJQLQ54j44JApcrWGIqXZn9Ym";

/* html */
const spanError = document.getElementById("randomMichiError");
const content = null || document.getElementById("content");
/* axios */
const options = {
  baseURL: "https://api.thecatapi.com/v1/",
  headers: { "X-Custom-Header": "foobar", "x-api-key": API_KEY },
  timeout: 10000,
};
const api = axios.create(options);
/* ALL Functions */
/* Button */
async function saveFavoriteMichi(id) {
  console.group("saveFavoriteMichi");
  try {
    const objAxios = { image_id: id };
    const urlAxios = "/favourites";
    const resAxios = await api.post(urlAxios, objAxios);
    const { data, status } = resAxios;
    loadRandomMichis();
    /* Respuesta */
    console.log("res : \n", resAxios);
    console.log("data : \n", data);
    console.log("status : \n", status);
  } catch (error) {
    console.log("error : ", error);
  } finally {
    console.log("end");
  }
  console.groupEnd("saveFavoriteMichi");
}

async function loadRandomMichis() {
  console.log("loadRandomMichis()");
  try {
    const objAxios = null;
    const urlAxios = "/images/search?limit=3";
    const resAxios = await api.get(urlAxios);
    const { data, status } = resAxios;
    /*  */
    console.log(data);
    console.log(status);
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
    spanError.innerHTML = "error al consultar la API" + status;
  } finally {
    console.log("finally");
  }
}

async function loadFavouriteCat() {
  try {
    const objAxios = null;
    const urlAxios = "/favourites";
    const resAxios = await api.get(urlAxios);
    const { data, status } = resAxios;
    console.log(resAxios);
    console.log(data);
    console.log(status);

    content.innerHTML = "";
    const view = data
      .map(
        (item) => `
          <article>
            <img src="${item.image.url}" width="150" alt="${item.image.id}" />
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
  } catch (error) {
    content.innerHTML = "";
    spanError.innerHTML = "hubo un error : " + res.status;
    console.log("error :", error);
  } finally {
    console.log("finally");
  }
}

async function deleteFavoriteMichi(favouriteId) {
  console.log("deleteFavoriteMichi(favouriteId) ");
  try {
    const objAxios = null;
    const urlAxios = `/favourites/${favouriteId}`;
    const resAxios = await api.delete(urlAxios);
    const { data, status } = resAxios;
    loadRandomMichis();
    console.log(data);
    console.log(status);
  } catch (error) {
    spanError.innerHTML = "hubo un error : " + res.status;
    console.error("Error al eliminar el favorito", res.status);
  } finally {
    console.log("end");
  }
}
// upload file-img.jpeg
async function uploadMichiPhoto() {
  console.log("uploadMichiPhoto");
  try {
    // archivo desde ordenador
    const form = document.getElementById("uploadingForm");
    const formData = new FormData(form);
    //
    const objAxios = formData;
    const urlAxios = `/images/upload`;
    const resAxios = await api.post(urlAxios, objAxios);
    const { data, status } = resAxios;
    console.log(resAxios);
    console.log(data);
    console.log(status);

    saveFavoriteMichi(data.id);
    loadRandomMichis();
  } catch (error) {
    console.log("error", error);
  } finally {
    console.log("Finally");
  }
}

loadRandomMichis();
