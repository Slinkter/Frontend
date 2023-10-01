const API_KEY =
  "live_BgeabuZRHRH2irUsFWjZREQBJ38KmhA2OdWWkOycJQLQ54j44JApcrWGIqXZn9Ym";
const API_URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=3&api_key=${API_KEY}`;
const API_URL_FAVORITE = `https://api.thecatapi.com/v1/favourites?limit=3&api_key=${API_KEY}`;
const API_URL_LOAD_FAVORITE = `https://api.thecatapi.com/v1/favourites?api_key=${API_KEY}`;
const API_URL_SAVE_FAVORITE = `https://api.thecatapi.com/v1/favourites?api_key=${API_KEY}`;
/*  */
const spanError = document.getElementById("randomMichiError");
const content = null || document.getElementById("content");

async function loadRandomMichis() {
  try {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    if (res.status !== 200) {
      spanError.innerHTML = "error al consultar la API" + res.status;
    } else {
      /*  */

      console.log("loadRandomMichis()");
      console.log(data);
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
      /*  */
      loadFavouriteMicis();
    }
  } catch (error) {
    console.log("error : ", error);
    spanError.innerHTML = "error al consultar la API";
  } finally {
    console.log("finally");
  }
}

async function loadFavouriteMicis() {
  try {
    const res = await fetch(API_URL_LOAD_FAVORITE);
    if (res.status !== 200) {
      spanError.innerHTML = "hubo un error : " + res.status;
      content.innerHTML = "";
    } else {
      content.innerHTML = "";
      const data = await res.json();
      console.log("loadFavouriteMicis()");
      console.log(data);
      const view = data
        .map(
          (item) => `
          <article>
            <img src="${item.image.url}" width="150" alt="" />
            <button id="${item.id}" name="${item.id}" >
              sacar el michi de favoritos
            </button>
          </article>`
        )
        .join("");
      content.innerHTML = view;
      /*  */
      const deleteButtons = document.querySelectorAll("button");
      for (const button of deleteButtons) {
        button.addEventListener("click", function () {
          deleteFavoriteMichi(button.id);
        });
      }
    }
  } catch (error) {
    console.log("error :", error);
  } finally {
    console.log("finally");
  }
}

async function saveFavoriteMichi(id) {
  try {
    /*  */
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_id: id }),
    };
    /*  */
    const res = await fetch(API_URL_SAVE_FAVORITE, options);
    if (res.status !== 200) {
      spanError.innerHTML = "hubo un error : " + res.status;
      console.log("error al consultar la API : ", res.status);
    } else {
      console.log("saveFavoriteMichi(id) ");
      const data = await res.json();
      console.log(" saveFavoriteMichi(id)");
      console.log(data);
      console.log("Michi agregado");
      loadRandomMichis();
    }
  } catch (error) {
    console.log("error", error);
  } finally {
    console.log("finally");
  }
}

async function deleteFavoriteMichi(favouriteId) {
  console.log("click");
  try {
    /*  */
    const API_URL_DELETE = `https://api.thecatapi.com/v1/favourites/${favouriteId}?api_key=${API_KEY}`;
    const options = {
      method: "DELETE",
    };
    /*  */
    const res = await fetch(API_URL_DELETE, options);

    if (res.status !== 200) {
      spanError.innerHTML = "hubo un error : " + res.status;
      console.log("Error al eliminar el favorito", res.status);
    } else {
      console.log("deleteFavoriteMichi(favouriteId) ");
      const data = await res.json();
      console.log(data);
      console.log("Favorito eliminado");
      loadRandomMichis();
    }
  } catch (error) {
    console.log("error :", error);
  }
}

loadRandomMichis();
