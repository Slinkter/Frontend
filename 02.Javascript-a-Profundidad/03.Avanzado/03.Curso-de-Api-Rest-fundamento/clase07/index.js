const API_KEY =
  "live_BgeabuZRHRH2irUsFWjZREQBJ38KmhA2OdWWkOycJQLQ54j44JApcrWGIqXZn9Ym";
const API_URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=3&api_key=${API_KEY}`;
const API_URL_FAVORITE = `https://api.thecatapi.com/v1/favourites?limit=3&api_key=${API_KEY}`;
const API_URL_LOAD_FAVORITE = `https://api.thecatapi.com/v1/favourites?api_key=${API_KEY}`;
const API_URL_SAVE_FAVORITE = `https://api.thecatapi.com/v1/favourites?api_key=${API_KEY}`;
const spanError = document.getElementById("randomMichis");
const content = null || document.getElementById("content");

async function loadRandomMichis() {
  try {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    // validar el servidor
    if (res.status !== 200) {
      spanError.innerHTML = "error al consultar la API" + res.status;
      console.log(spanError);
    } else {
      /*  */
      console.log("res : \n", data);
      /*  */
      const img1 = document.getElementById("img1");
      const img2 = document.getElementById("img2");
      const img3 = document.getElementById("img3");
      /*  */
      const btn1 = document.getElementById("btn1");
      const btn2 = document.getElementById("btn2");
      const btn3 = document.getElementById("btn3");

      btn1.onclick = () => saveFavoriteMichi(data[0].id);
      btn2.onclick = () => saveFavoriteMichi(data[1].id);
      btn3.onclick = () => saveFavoriteMichi(data[2].id);

      /* SET IMG */
      img1.src = data[0].url;
      img2.src = data[1].url;
      img3.src = data[2].url;

      /*  */
      loadFavouriteMicis();
    }
    console.log(data);
  } catch (error) {
    console.log("try-catch", error);
    spanError.innerHTML = "error al consultar la API" + res.status;
  }
}

async function loadFavouriteMicis() {
  const res = await fetch(API_URL_LOAD_FAVORITE);
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "hubo un error : " + res.status + data.message;
  } else {
    content.innerHTML = "";
    const view = data
      .map(
        (item) => `
          <article>
            <img src="${item.image.url}" width="150" alt="" />
            <button
              id="${item.id}"
              name="${item.id}"
           >
              sacar el michi de favoritos
            </button>
          </article>`
      )
      .join("");

    content.innerHTML = view;
    const deleteButtons = document.querySelectorAll("button");
    for (const button of deleteButtons) {
      button.addEventListener("click", function () {
        const favoriteId = button.id;
        deleteFavoriteMichi(favoriteId);
      });
    }
  }
}

async function saveFavoriteMichi(id) {
  console.log("saveFavoriteMichi");

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image_id: id }),
  };

  const rest = await fetch(API_URL_SAVE_FAVORITE, options);
  if (rest.status !== 200) {
    console.log("error al consultar la API" + rest.status);
  } else {
    const data = await rest.json();
    console.log(data);
    console.log(" Michi agregado");
    console.log(rest);
    loadRandomMichis();
  }

  console.log("Favorite Michi");
  console.log(rest);
}

async function deleteFavoriteMichi(favouriteId) {
  try {
    const API_URL_DELETE = `https://api.thecatapi.com/v1/favourites/${favouriteId}?api_key=${API_KEY}`;
    const requestOptions = {
      method: "DELETE",
    };

    const response = await fetch(API_URL_DELETE, requestOptions);

    if (response.status === 200) {
      console.log("Favorito eliminado");
      alert("se elimino");
      loadRandomMichis();
    } else {
      console.log("Error al eliminar el favorito");
      const data = await response.json();
      console.log(data.message);
    }
  } catch (error) {
    console.log("error :", error);
  }
}

loadRandomMichis();
