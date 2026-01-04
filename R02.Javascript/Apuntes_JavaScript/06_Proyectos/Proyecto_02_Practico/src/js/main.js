/*  */
const auth =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWI3MTYzMjk1NzE0NmVlNGI3ZjNkZWFlMWRjMzM1NSIsInN1YiI6IjY1MTQzY2RmZWE4NGM3MDEwYzEwZTc1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Mq4jS2yqZX6vbG28UgpsCJujgEYbb66Vrz07_2VwlY";

// conexion axios
const options = {
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: "application/json",
        Authorization: auth,
    },
    timeout: 10000,
};

// --> call axios
const api = axios.create(options);

/**
 * Fetches the daily trending movies list and renders a preview in the DOM.
 * @async
 * @returns {Promise<void>}
 */
async function getTrendingMoviesPreview() {
    try {
        const objAxios = null;
        const urlAxios = `trending/movie/day`;
        const resAxios = await api.get(urlAxios);
        const { data, status } = resAxios;
        const movies = data.results;
        // Add HTML
        movies.map((movie) => {
            /* create elements*/
            const movieContainer = document.createElement("div");
            const movieImg = document.createElement("img");
            const url = "https://image.tmdb.org/t/p/w300/" + movie.poster_path;
            const title = movie.title;
            /* Add style */
            movieContainer.classList.add("movie-container");
            movieContainer.addEventListener("click", () => {
                location.hash = "#movie=" + movie.id;
            });
            movieImg.classList.add("movie-img");
            /* Add url img */
            movieImg.setAttribute("src", url);
            movieImg.setAttribute("alt", title);
            /* Add html */
            movieContainer.appendChild(movieImg);
            trendingMoviesPreviewList.appendChild(movieContainer);
        });
    } catch (error) {
        console.error("error", error);
    } finally {
        console.log("finally : getTrendingMoviesPreview()");
    }
}
// --> init page - section categorias
/**
 * Fetches the list of movie genres and renders them as categories in the DOM.
 * @async
 * @returns {Promise<void>}
 */
async function getCategoriesPreview() {
    try {
        const objAxios = null;
        const urlAxios = `genre/movie/list`;
        const resAxios = await api.get(urlAxios);
        const { data, status } = resAxios;
        const categories = data.genres;
        // Add html
        categoriesPreviewList.innerHTML = "";
        categories.forEach((category) => {
            /* get ID y Name */
            const categoryId = category.id;
            const categoryName = category.name;
            /* Create Element */
            const categoryContainer = document.createElement("div");
            const categoryTitle = document.createElement("h3");
            const categoryTitleText = document.createTextNode(categoryName);
            /* Add style */
            categoryContainer.classList.add("category-container");
            categoryTitle.classList.add("category-title");
            categoryTitle.setAttribute("id", "id" + categoryId);
            /* Add html  */
            categoryTitle.appendChild(categoryTitleText);
            categoryContainer.appendChild(categoryTitle);
            categoriesPreviewList.appendChild(categoryContainer);
            /* cuando hace click se actualiza el URL*/
            categoryTitle.addEventListener("click", () => {
                location.hash = "#category=" + categoryId + "-" + categoryName;
            });
        });
    } catch (error) {
        console.error("error : ", error);
    } finally {
        console.log("finally : getCategoriesPreview()");
    }
}

// --> init user events
/**
 * Fetches movies associated with a specific genre category and renders them.
 * @async
 * @param {number} id - The ID of the genre category.
 * @returns {Promise<void>}
 */
async function getMoviesByCategory(id) {
    console.group("getMoviesByCategory(id)");
    try {
        // params

        /* axios */

        const objAxios = null;
        const urlAxios = `discover/movie?with_genres=${id}`;
        const resAxios = await api.get(urlAxios);
        const { data, status } = resAxios;
        const movies = data.results;
        // html
        genericSection.innerHTML = "";
        //
        movies.forEach((movie) => {
            const movieContainer = document.createElement("div");
            const movieImg = document.createElement("img");
            const url = "https://image.tmdb.org/t/p/w300/" + movie.poster_path;
            const title = movie.title;
            //
            movieImg.classList.add("movie-img");
            movieImg.setAttribute("src", url);
            movieImg.setAttribute("alt", title);
            movieContainer.classList.add("movie-container");
            movieContainer.addEventListener("click", () => {
                location.bash = "#movie=" + movie.id;
            });
            /*  */
            movieContainer.appendChild(movieImg);
            genericSection.appendChild(movieContainer);
        });
        console.log("res: ", res);
        console.log("data: ", data);
        console.log("results: ", movies);
    } catch (error) {
        console.error("error", error);
    } finally {
        console.log("finally : getMoviesByCategory(id)");
    }

    console.groupEnd("");
}
/**
 * Searches for movies based on a query string and renders the results.
 * @async
 * @param {string|number} movieId - The search query (movie name or term, parameter name is misleading in original code).
 * @returns {Promise<void>}
 */
async function getMovieBySearch(movieId) {
    // TODO :
    console.group("getMovieBySearch(movieId)");
    try {
        /* axios */
        const objAxios = null;
        const urlAxios = `search/movie?query=${movieId}`;
        const resAxios = await api.get(urlAxios);
        const { data, status } = resAxios;
        const movies = data.results;

        console.log("resAxios: ", resAxios);
        console.log("data: ", data);
        console.log("status: ", status);

        genericSection.innerHTML = "";
        //
        movies.map((movie) => {
            //
            const movieContainer = document.createElement("div");
            const movieImg = document.createElement("img");
            //
            const defaultIMG = "https://placehold.co/300x400.png";
            const url = "https://image.tmdb.org/t/p/w300/" + movie.poster_path;
            const urlIMG = movie.poster_path == null ? defaultIMG : url;
            const title = movie.title;
            //
            movieImg.classList.add("movie-img");
            movieImg.setAttribute("src", urlIMG);
            movieImg.setAttribute("alt", title);
            //

            movieContainer.classList.add("movie-container");
            movieContainer.addEventListener(
                "click",
                () => (location.hash = "#movie=" + movie.id)
            );
            //
            movieContainer.appendChild(movieImg);
            genericSection.appendChild(movieContainer);
        });
    } catch (error) {
        console.error("error : ", error);
    } finally {
        console.log("finally : getMoviesBySearch(query)");
    }
    console.groupEnd();
}
/**
 * Fetches detailed information for a specific movie by its ID, including related recommendations.
 * @async
 * @param {number} id - The unique identifier of the movie.
 * @returns {Promise<void>}
 */
async function getMovieByMovie(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}`;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: auth,
        },
    };
    // get data from api
    const res = await fetch(url, options);
    const data = await res.json();
    const movie = data;
    const movieImgUrl = "https://image.tmdb.org/t/p/w500/" + movie.poster_path;
    // get category
    const categories = [...movie.genres];
    //
    console.log(movie);
    console.log("movie.genres : \n ", movie.genres);
    //
    headerSection.style.background = ` url(${movieImgUrl}) ,linear-gradient(180deg,rgba(0, 0, 0, 0.35) 19.27%,rgba(0, 0, 0, 0) 29.17%)`;
    //
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;
    movieDetailCategoriesList.innerHTML = "";
    //
    categories.forEach((category) => {
        /* Create Element */
        const categoryContainer = document.createElement("div");
        const categoryTitle = document.createElement("h3");
        const categoryTitleText = document.createTextNode(category.name);
        const idvalue = "id" + category.id;
        /* Add style */
        categoryContainer.classList.add("category-container");
        //
        categoryTitle.classList.add("category-title");
        categoryTitle.setAttribute("id", idvalue);
        categoryTitle.addEventListener("click", () => {
            location.hash = "#category=" + category.id + "-" + category.name;
            console.log(location.hash);
        });
        /* Add html  */
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        movieDetailCategoriesList.appendChild(categoryContainer);
    });

    // peliculas similares
    getRelatedMoviesId(id);
}
async function getRelatedMoviesId(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/recommendations`;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: auth,
        },
    };
    //
    const res = await fetch(url, options);
    const data = await res.json();
    //
    const relatedMovies = [...data.results];
    //
    renderRelatedMovies(relatedMovies);
}

function createMovieElement(movie) {
    const movieContainer = document.createElement("div");
    const movieImg = document.createElement("img");
    const url = "https://image.tmdb.org/t/p/w300/" + movie.poster_path;
    const title = movie.title;

    movieImg.classList.add("movie-img");
    movieImg.setAttribute("src", url);
    movieImg.setAttribute("alt", title);

    movieContainer.classList.add("movie-container");
    movieContainer.addEventListener("click", () => {
        location.hash = "#movie=" + movie.id;
    });

    movieContainer.appendChild(movieImg);
    return movieContainer;
}

function renderRelatedMovies(relatedMovies) {
    relatedMoviesContainer.innerHTML = "";
    relatedMovies.forEach((movie) => {
        const movieElement = createMovieElement(movie);
        relatedMoviesContainer.appendChild(movieElement);
    });
}

async function getTrendingMovies() {
    try {
        const urlAxios = `trending/movie/day`;
        const resAxios = await api.get(urlAxios);
        const { data } = resAxios;
        const movies = data.results;

        genericSection.innerHTML = "";
        movies.forEach((movie) => {
            const movieElement = createMovieElement(movie);
            genericSection.appendChild(movieElement);
        });
    } catch (error) {
        console.error("Error fetching trending movies:", error);
    }
}
getTrendingMoviesPreview();
getCategoriesPreview();
