let maxPage;
let page = 1;
let infiniteScroll;

searchFormBtn.addEventListener("click", () => {
  location.hash = "#search=" + searchFormInput.value;
});

trendingBtn.addEventListener("click", () => {
  location.hash = "#trends";
});

arrowBtn.addEventListener("click", () => {
  history.back();
});

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);
window.addEventListener("scroll", infiniteScroll, false);

function navigator() {
  if (infiniteScroll) {
    window.removeEventListener("scroll", infiniteScroll, { passive: false });
    infiniteScroll = undefined;
  }

  const pathTrend = location.hash.startsWith("#trends");
  const pathSearch = location.hash.startsWith("#search=");
  const pathMovie = location.hash.startsWith("#movie=");
  const pathCategory = location.hash.startsWith("#category=");

  if (pathTrend) {
    trendsPage();
  } else if (pathSearch) {
    searchPage();
  } else if (pathMovie) {
    movieDetailsPage();
  } else if (pathCategory) {
    categoriesPage();
  } else {
    homePage();
  }

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  if (infiniteScroll) {
    window.addEventListener("scroll", infiniteScroll, { passive: false });
  }
}

function homePage() {
  console.log("Home!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.add("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.remove("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");
  likedMoviesSection.classList.remove("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");

  getTrendingMoviesPreview();
  getCategegoriesPreview();
  getLikedMovies();
}

function categoriesPage() {
  console.log("categories!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  // ['#category', 'id-name']
  const [_, categoryData] = location.hash.split("=");
  // [ id , name ]
  const [categoryId, categoryName] = categoryData.split("-");
  getMoviesByCategory(categoryId);
  headerCategoryTitle.innerHTML = categoryName;
  infiniteScroll = getPaginatedMoviesByCategory(categoryId);
}

function movieDetailsPage() {
  console.log("Movie!!");

  headerSection.classList.add("header-container--long");
  // headerSection.style.background = '';
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");

  // ['#movie', '234567']
  const [_, movieId] = location.hash.split("=");
  getMovieById(movieId);
}

function searchPage() {
  console.log("Search!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  // ['#search', 'platzi']
  const [_, query] = location.hash.split("=");
  getMoviesBySearch(query);
  infiniteScroll = getPaginatedMoviesBySearch(query);
}

function trendsPage() {
  console.log("TRENDS!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  headerCategoryTitle.innerHTML = "Tendencias";

  getTrendingMovies();
  infiniteScroll = getPaginatedTredingMovies();
}
