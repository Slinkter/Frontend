// 3 method event Listeners

// When the user clicks , searchFormInput value is extracted and the location.hash is updated to #search= followed by the search term.
searchFormBtn.addEventListener("click", () => {
  location.hash = "#search=" + searchFormInput.value;
});

trendingBtn.addEventListener("click", () => {
  location.hash = "#trends";
});

arrowBtn.addEventListener("click", () => {
  history.back();
});

// Cuando la página se carga, se llama a la función navigator.
// Esta función se encarga de gestionar el contenido  de  location.hash.
window.addEventListener("DOMContentLoaded", navigator, false);
//Cuando cambia el fragmento de la URL (después del #), se llama a la función navigator.
window.addEventListener("hashchange", navigator, false);

function navigator() {
  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    seachPage();
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage();
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage();
  } else {
    homePage();
  }
  //location.hash;
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}
/*  */
function trendsPage() {
  console.log("TRENDS !!!");
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  headerCategoryTitle.innerHTML = "Tendencias";

  getTrendingMovies();
}
function seachPage() {
  console.log("SEARCH !!!");
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");
  //index.html?#search=movie123
  const [_, movieId] = location.hash.split("=");
  getMovieBySearch(movieId);
}
function movieDetailsPage() {
  console.log("MOVIE !!!");

  headerSection.classList.add("header-container--long");
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");

  //index.html?#search=movie123
  const [_, movieId] = location.hash.split("=");
  getMovieByMovie(movieId);
}
function categoriesPage() {
  console.log("CATEGORIES !!!");
  //
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");
  /*  */
  // www.pageweb.com/index.html#category=12-Adventure
  const [_, categoryData] = location.hash.split("="); // =>["#category","id-category"]
  const [categoryId, categoryName] = categoryData.split("-");
  headerCategoryTitle.innerHTML = categoryName;

  // check value
  const d0 = location.hash;
  const d1 = location.hash.split("=");
  const d2 = categoryData.split("-");
  console.log(d0); //#category=12-Adventure
  console.log(d1); //['#category', '12-Adventure']
  console.log(d2); //['12', 'Adventure']
  // ---> main.js  send id category -- load array
  getMoviesByCategory(categoryId);
}
function homePage() {
  console.log("HomePage");
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  headerTitle.classList.remove("inactive");
  headerCategoryTitle.classList.add("inactive");
  arrowBtn.classList.add("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  searchForm.classList.remove("inactive");
  trendingPreviewSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");
}
/*  */
navigator();
