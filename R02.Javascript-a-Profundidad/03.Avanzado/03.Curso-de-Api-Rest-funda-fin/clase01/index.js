console.log("conexion");

async function getImgCat() {
  /*  const API_URL = "https://api.thecatapi.com/v1/images/search?limit=3"; */
  const API_KEY =
    "live_BgeabuZRHRH2irUsFWjZREQBJ38KmhA2OdWWkOycJQLQ54j44JApcrWGIqXZn9Ym";
  const API_URL = `https://api.thecatapi.com/v1/images/search?limit=3&api_key=${API_KEY}`;
  const res = await fetch(API_URL);
  const data = await res.json();
  console.log(data);
  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");
  const img3 = document.getElementById("img3");
  img1.src = data[0].url;
  img2.src = data[1].url;
  img3.src = data[2].url;

  /* 
     await fetch(API_URL)
    .then((rpta) => rpta.json())
    .then((data) => {
      const urlimg = data[0].url;
      const img = document.querySelector("img");
      img.src = urlimg;
      console.log(data[0]);
         console.log(typeof data);
         console.log(data);
         console.log(Object.keys(data));
         console.log(Object.values(data));
         console.log(data[0].url);
     
    });
    
    */
}

const btn = document.querySelector("button");
btn.onclick = getImgCat;
