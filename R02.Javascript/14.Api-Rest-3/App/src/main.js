// apikey - auth
const auth =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWI3MTYzMjk1NzE0NmVlNGI3ZjNkZWFlMWRjMzM1NSIsInN1YiI6IjY1MTQzY2RmZWE4NGM3MDEwYzEwZTc1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Mq4jS2yqZX6vbG28UgpsCJujgEYbb66Vrz07_2VwlY";
// llave - auth
const options = {
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: "application/json",
        Authorization: auth,
    },
    timeout: 10000,
};
// --> conexion
const api = axios.create(options);
// call -->  tendencias

async function getTrendingMoviesPreview() {
    const { data } = await api("trending/movie/day");
    const movies = data.results;
    createMovies(movies, trendingMoviesPreviewList, true); //---> (data,element,boolean)
}
// call -->  categorias
async function getCategegoriesPreview() {
    const { data } = await api("genre/movie/list");
    const categories = data.genres;
    createCategories(categories, categoriesPreviewList);
}
// Utils 1
function createMovies(
    movies,
    container,
    { lazyLoad = false, clean = true } = {}
) {
    if (clean) {
        container.innerHTML = "";
    }

    movies.forEach((movie) => {
        const movieContainer = document.createElement("div");
        const movieImg = document.createElement("img");
        const movieBtnLike = document.createElement("button");

        const urlIMG = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
        const urlError = `https://via.placeholder.com/300x450/5c218a/ffffff?text=${movie.title}`;
        const isLazyload = lazyLoad ? "data-img" : "src";
        /*  ------> movieImg */
        movieImg.classList.add("movie-img");
        movieImg.setAttribute("alt", movie.title);
        movieImg.setAttribute(isLazyload, urlIMG);
        movieImg.addEventListener("click", () => {
            location.hash = `#movie=${movie.id}`;
        });
        movieImg.addEventListener("error", () => {
            movieImg.setAttribute("src", urlError);
        });
        /* ------> movieBtnLike */
        movieBtnLike.classList.add("movie-btn");
        movieBtnLike.addEventListener("click", () => {
            movieBtnLike.classList.toggle("movie-btn--liked");
            stateLikeMovie(movie);
            getLikedMovies();
        });

        likedMovieList()[movie.id] &&
            movieBtnLike.classList.add("movie-btn--liked");

        if (lazyLoad) {
            lazyLoader.observe(movieImg);
        }

        movieContainer.classList.add("movie-container");
        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(movieBtnLike);
        //
        container.appendChild(movieContainer);
    });
}
// Utils 2
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
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.classList.add("category-container");
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}

function stateLikeMovie(movie) {
    const id = movie.id;
    const list = likedMovieList();
    //
    if (list[id]) {
        list[id] = undefined;
    } else {
        list[id] = movie;
    }
    localStorage.setItem("liked_movies", JSON.stringify(list));
}

function likedMovieList() {
    const db_local = localStorage.getItem("liked_movies");
    const item = JSON.parse(db_local);
    let movies = item ? item : {};
    return movies;
}

function getLikedMovies() {
    const likedmovies = likedMovieList();
    const moviesArray = Object.values(likedmovies);
    createMovies(moviesArray, likedMoviesListArticle, {
        lazyLoad: true,
        clean: true,
    });
}
/* path categories */
async function getMoviesByCategory(id) {
    /* params */
    const path = "discover/movie";
    const options = {
        params: {
            with_genres: id,
        },
    };
    /* Exec  */
    const { data } = await api(path, options);
    const movies = data.results;
    createMovies(movies, genericSection, { lazyLoad: true });
    //-->
    maxPage = data.total_pages;
}

function getPaginatedMoviesByCategory(id) {
    return async function () {
        const { scrollTop, clientHeight, scrollHeight } =
            document.documentElement;
        const isScrollBottom = scrollTop + clientHeight >= scrollHeight - 15;
        const isNotLastPage = page < maxPage;
        /*  */
        console.log("--------------------");
        console.log("scrollTop", scrollTop); // Y cambiando
        console.log("clientHeight", clientHeight); // Y consatne
        console.log("scrollHeight", scrollHeight); // al terminar Y aumenta
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
            createMovies(movies, genericSection, {
                lazyLoad: true,
                clean: false,
            });
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
        const { scrollTop, clientHeight, scrollHeight } =
            document.documentElement;
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
            createMovies(movies, genericSection, {
                lazyLoad: true,
                clean: false,
            });
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
    const path = `movie/${id}`;
    const { data: movie } = await api(path);
    /*  */

    const movieImgUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    const bg_img =
        "linear-gradient(180deg,rgba(0, 0, 0, 0.35),rgba(0, 0, 0, 0))";
    headerSection.style.background = `${bg_img},url(${movieImgUrl})`;

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

const lazyLoader = new IntersectionObserver((io) => {
    io.forEach((item) => {
        if (item.isIntersecting) {
            const url = item.target.getAttribute("data-img");
            item.target.setAttribute("src", url);
        }
    });
}, null);

/* 


a)Atributo de datos
--------------------
Los atributos de datos son atributos personalizados que no tienen un significado predefinido. Se utilizan para almacenar información adicional sobre un elemento HTML. En este caso, el atributo data-img se utiliza para almacenar la URL de la imagen que se debe cargar de manera perezosa.

b)Atributo de origen
--------------------
Los atributos de origen se utilizan para especificar la URL de un recurso, como una imagen, un script o un estilo. En este caso, el atributo src se utiliza para especificar la URL de la imagen que se debe cargar de manera inmediata.

c)Cómo se entiende
--------------------
El navegador interpreta el atributo data-img como una cadena de texto. En este caso, la cadena de texto contiene la URL de la imagen que se debe cargar.

Cuando el navegador carga el elemento HTML, no carga la imagen real. En su lugar, carga la imagen de relleno. Cuando el usuario hace scroll por la página y la imagen entra en el viewport, el navegador carga la imagen real.

Esto optimiza el rendimiento de la página al evitar cargar todas las imágenes de inmediato.

*/
