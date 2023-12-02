// data
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  timeout: 10000,
  params: {
    api_key: API_KEY,
  },
});
// Local storage

function likedMovieList() {
  const db_local = localStorage.getItem("liked_movies");
  const item = JSON.parse(db_local);
  movies = {};
  if (item) {
    movies = item;
  } else {
    movies = {};
  }
  return movies;
}
function liveMovie(movie) {
  const id = movie.id;
  const list = likedMovieList();
  if (!!list[id]) {
    list[id] = undefined;
  } else {
    list[id] = movie;
  }
  localStorage.setItem("liked_movies", JSON.stringify(list));
}
// Utils
function createMovies(
  movies,
  container,
  { lazyLoad = false, clean = true } = {}
) {
  /*  */
  if (clean) {
    container.innerHTML = "";
  }

  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    const movieImg = document.createElement("img");
    const movieBtn = document.createElement("button");

    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      lazyLoad ? "data-img" : "src",
      `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    );
    movieImg.addEventListener("click", () => {
      location.hash = `#movie=${movie.id}`;
    });
    movieImg.addEventListener("error", () => {
      movieImg.setAttribute(
        "src",
        `https://via.placeholder.com/300x450/5c218a/ffffff?text=${movie.title}`
      );
    });

    movieBtn.classList.add("movie-btn");
    movieBtn.addEventListener("click", () => {
      movieBtn.classList.toggle("movie-btn--liked");
      liveMovie(movie);
      getLikedMovies();
    });

    likedMovieList()[movie.id] && movieBtn.classList.add("movie-btn--liked");

    if (lazyLoad) {
      lazyLoader.observe(movieImg);
    }
    movieContainer.classList.add("movie-container");
    movieContainer.appendChild(movieImg);
    movieContainer.appendChild(movieBtn);
    container.appendChild(movieContainer);
  });
}
function createCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach((category) => {
    const categoryContainer = document.createElement("div");
    const categoryTitle = document.createElement("h3");
    const categoryTitleText = document.createTextNode(category.name);
    //
    categoryTitle.classList.add("category-title");
    categoryTitle.setAttribute("id", "id" + category.id);
    categoryTitle.addEventListener("click", () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    //
    categoryContainer.classList.add("category-container");
    //
    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

// Llamados a la API

async function getTrendingMoviesPreview() {
  const { data } = await api("trending/movie/day");
  const movies = data.results;
  createMovies(movies, trendingMoviesPreviewList, true);
  console.log(movies);
}

async function getCategegoriesPreview() {
  const { data } = await api("genre/movie/list");
  const categories = data.genres;
  createCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategory(id) {
  const options = {
    params: {
      with_genres: id,
    },
  };
  const { data } = await api("discover/movie", options);
  const movies = data.results;
  maxPage = data.total_pages;
  createMovies(movies, genericSection, { lazyLoad: true });
}

function getPaginatedMoviesByCategory(id) {
  return async function () {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const isScrollBottom = scrollTop + clientHeight >= scrollHeight - 15;
    const isNotLastPage = page < maxPage;
    /*  */
    console.log(isScrollBottom);
    console.log(isNotLastPage);
    /*  */
    if (isScrollBottom && isNotLastPage) {
      page++;
      const options = {
        params: {
          with_genres: id,
          page,
        },
      };
      const { data } = await api("discover/movie", options);
      const movies = data.results;
      createMovies(movies, genericSection, { lazyLoad: true, clean: false });
    }
  };
}

async function getMoviesBySearch(query) {
  const options = {
    params: {
      query,
    },
  };
  const { data } = await api("search/movie", options);
  const movies = data.results;
  maxPage = data.total_pages;
  createMovies(movies, genericSection);
}

function getPaginatedMoviesBySearch(query) {
  return async function () {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const isScrollBottom = scrollTop + clientHeight >= scrollHeight - 15;
    const isNotLastPage = page < maxPage;

    console.log(isScrollBottom);
    console.log(isNotLastPage);

    if (isScrollBottom && isNotLastPage) {
      page++;
      const options = {
        params: {
          query,
          page,
        },
      };
      const { data } = await api("search/movie", options);
      const movies = data.results;
      createMovies(movies, genericSection, { lazyLoad: true, clean: false });
    }
  };
}

async function getTrendingMovies() {
  const { data } = await api("trending/movie/day");
  const movies = data.results;
  createMovies(movies, genericSection, { lazyLoad: true, clean: true });
  maxPage = data.total_pages;
}

async function getPaginatedTredingMovies() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  const isScrollBottom = scrollTop + clientHeight >= scrollHeight - 15;
  const isNotLastPage = page < maxPage;
  console.log(isScrollBottom);
  console.log(isNotLastPage);

  if (isScrollBottom && isNotLastPage) {
    page++;
    const options = {
      params: {
        page: page,
      },
    };
    const { data } = await api("trending/movie/day", options);
    const movies = data.results;
    createMovies(movies, genericSection, { lazyLoad: true, clean: false });
  }
}

async function getMovieById(id) {
  const { data: movie } = await api("movie/" + id);
  const movieImgUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  headerSection.style.background = `
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.35) 19.27%,
      rgba(0, 0, 0, 0) 29.17%
    ),
    url(${movieImgUrl})
  `;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  createCategories(movie.genres, movieDetailCategoriesList);
  getRelatedMoviesId(id);
}

async function getRelatedMoviesId(id) {
  const { data } = await api(`movie/${id}/recommendations`);
  const relatedMovies = data.results;
  createMovies(relatedMovies, relatedMoviesContainer);
}

const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((element) => {
    if (element.isIntersecting) {
      const url = element.target.getAttribute("data-img");
      element.target.setAttribute("src", url);
    }
  });
}, null);

function getLikedMovies() {
  const likedmovies = likedMovieList();
  const moviesArray = Object.values(likedmovies);

  createMovies(moviesArray, likedMoviesListArticle, {
    lazyLoad: true,
    clean: true,
  });
}
