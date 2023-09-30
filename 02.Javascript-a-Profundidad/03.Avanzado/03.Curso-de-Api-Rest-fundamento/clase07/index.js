const API_KEY =
  "live_BgeabuZRHRH2irUsFWjZREQBJ38KmhA2OdWWkOycJQLQ54j44JApcrWGIqXZn9Ym";

const spanError = document.getElementById("randomMichis");
const content = null || document.getElementById("content");

async function loadRandomMichis() {
  try {
    const API_URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=3&api_key=${API_KEY}`;
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
      /* SET IMG */
      img1.src = data[0].url;
      img2.src = data[1].url;
      img3.src = data[2].url;
    }
    console.log(data);
  } catch (error) {
    console.log("try-catch", error);
    spanError.innerHTML = "error al consultar la API" + res.status;
  }
}

async function uploadFavorite() {
  try {
    console.log("uploadFavorite :", "\n");
    const API_URL_FAVORITE = `https://api.thecatapi.com/v1/favourites?limit=3&api_key=${API_KEY}`;
    /*  */
    const res = await fetch(API_URL_FAVORITE);
    const data = await res.json();
    console.log(data);
    if (res.status !== 200) {
      spanError.innerHTML =
        "error al consultar la API" + res.status + data.message;
      console.log(spanError);
    }
  } catch (error) {}
}

async function loadFavouriteMicis() {
  console.log("load FAvorite");
  const API_URL_FAVORITE = `https://api.thecatapi.com/v1/favourites?api_key=${API_KEY}`;
  const res = await fetch(API_URL_FAVORITE);
  const data = await res.json();
  console.log(typeof data);

  console.log(data);
  if (res.status !== 200) {
    spanError.innerHTML = "hubo un error : " + res.status + data.message;
  } else {
    const view = data
      .map(
        (item) => `    
      <article>
        <img id="" src="${item.image.url}"   width="150" alt="" />
        <button onclick="">sacar el michi de favoritos</button>
      </article>
    `
      )
      .join("");

    content.innerHTML = view;
  }
}

/* 

 ${video.snippet.title}

*/

async function saveFavoriteMicis() {
  console.log("saveFavoriteMicis");
  const API_URL_FAVORITE = `https://api.thecatapi.com/v1/favourites?api_key=${API_KEY}`;

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image_id: "d68" }),
  };

  const rest = await fetch(API_URL_FAVORITE, options);
  if (rest.status !== 200) {
    console.log("error al consultar la API" + rest.status);
  }
  const data = await rest.json();

  console.log("Favorite Michi");
  console.log(rest);
}
loadFavouriteMicis();
uploadFavorite();
loadRandomMichis();
