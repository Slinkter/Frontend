const API_KEY =
  "live_BgeabuZRHRH2irUsFWjZREQBJ38KmhA2OdWWkOycJQLQ54j44JApcrWGIqXZn9Ym";

const spanError = document.getElementById("randomMichiError");

async function reload() {
  const API_URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=3&api_key=${API_KEY}`;

  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log(data);

  if (res.status !== 200) {
    spanError.innerHTML = "error al consultar la API" + res.status;
    console.log(spanError);
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const img3 = document.getElementById("img3");
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
  }
}

async function uploadFavorite() {
  const API_URL_FAVORITE = `https://api.thecatapi.com/v1/favourites?limit=3&api_key=${API_KEY}`;
  console.log(API_URL_FAVORITE);
  const res = await fetch(API_URL_FAVORITE);
  const data = await res.json();
  console.log(data);
  if (res.status !== 200) {
    spanError.innerHTML =
      "error al consultar la API" + res.status + data.message;
    console.log(spanError);
  }
}

async function saveFavoriteMicis() {
  const API_URL_FAVORITE = `https://api.thecatapi.com/v1/favourites&api_key=${API_KEY}`;

  var rawBody = JSON.stringify({
    image_id: 12,
  });

  const newFavourite = await fetch(API_URL_FAVORITE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: rawBody,
  });
  console.log("save");
  console.log(newFavourite);
}

reload();
uploadFavorite();
