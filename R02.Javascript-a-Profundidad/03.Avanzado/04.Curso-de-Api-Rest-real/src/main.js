async function getTrendingMoviesPreview() {
  try {
    // params
    const url = `https://api.themoviedb.org/3/trending/movie/day`;
    const authAPI =
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWI3MTYzMjk1NzE0NmVlNGI3ZjNkZWFlMWRjMzM1NSIsInN1YiI6IjY1MTQzY2RmZWE4NGM3MDEwYzEwZTc1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Mq4jS2yqZX6vbG28UgpsCJujgEYbb66Vrz07_2VwlY";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: authAPI,
      },
    };
    // call api
    const res = await fetch(url, options);
    const data = await res.json();
    const movies = data.results;
    // Add HTML
    movies.map((movie) => {
      /* create elements*/
      const movieContainer = document.createElement("div");
      const movieImg = document.createElement("img");
      /* Add style */
      movieContainer.classList.add("movie-container");
      movieContainer.addEventListener("click", () => {
        location.hash = "#movie=" + movie.id;
      });
      console.log(movieContainer);
      movieImg.classList.add("movie-img");
      /* Add url img */
      const url = "https://image.tmdb.org/t/p/w300/" + movie.poster_path;
      const title = movie.title;
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

async function getCategoriesPreview() {
  try {
    //params
    const url = `https://api.themoviedb.org/3/genre/movie/list`;
    const authAPI =
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWI3MTYzMjk1NzE0NmVlNGI3ZjNkZWFlMWRjMzM1NSIsInN1YiI6IjY1MTQzY2RmZWE4NGM3MDEwYzEwZTc1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Mq4jS2yqZX6vbG28UgpsCJujgEYbb66Vrz07_2VwlY";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: authAPI,
      },
    };
    // call api
    const res = await fetch(url, options);
    const data = await res.json();
    const categories = data.genres;
    // Add html
    categoriesPreviewList.innerHTML = "";
    categories.forEach((category) => {
      /* Create Element */
      const categoryContainer = document.createElement("div");
      const categoryTitle = document.createElement("h3");
      const categoryTitleText = document.createTextNode(category.name);
      /* Add style */
      categoryContainer.classList.add("category-container");
      categoryTitle.classList.add("category-title");
      /* Add   */
      const idvalue = "id" + category.id;
      categoryTitle.setAttribute("id", idvalue);
      /* Add html  */
      categoryTitle.appendChild(categoryTitleText);
      categoryContainer.appendChild(categoryTitle);
      categoriesPreviewList.appendChild(categoryContainer);
      /* cuando hace click se actualiza el URL*/
      categoryTitle.addEventListener("click", () => {
        location.hash = "#category=" + category.id + "-" + category.name;
        console.log(location.hash);
      });
    });
  } catch (error) {
    console.error("error", error);
  } finally {
    console.log("finally : getCategoriesPreview()");
  }
}
// <--- navitation.js (pageCategory)
async function getMoviesByCategory(id) {
  console.group("getMoviesByCategory(id)");

  try {
    // params
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${id}`;
    const authAPI =
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWI3MTYzMjk1NzE0NmVlNGI3ZjNkZWFlMWRjMzM1NSIsInN1YiI6IjY1MTQzY2RmZWE4NGM3MDEwYzEwZTc1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Mq4jS2yqZX6vbG28UgpsCJujgEYbb66Vrz07_2VwlY";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: authAPI,
      },
    };
    // call api
    const res = await fetch(url, options);
    const data = await res.json();
    const movies = data.results;

    genericSection.innerHTML = "";
    movies.forEach((movie) => {
      const movieContainer = document.createElement("div");
      const movieImg = document.createElement("img");
      //
      movieContainer.classList.add("movie-container");
      movieContainer.addEventListener("click", () => {
        location.bash = "#movie=" + movie.id;
      });
      movieImg.classList.add("movie-img");
      //
      const url = "https://image.tmdb.org/t/p/w300/" + movie.poster_path;
      const title = movie.title;
      movieImg.setAttribute("src", url);
      movieImg.setAttribute("alt", title);
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
async function getMoviesBySearch(query) {
  console.group("getMoviesBySearch(query)");

  try {
    // params
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}`;
    const authAPI =
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWI3MTYzMjk1NzE0NmVlNGI3ZjNkZWFlMWRjMzM1NSIsInN1YiI6IjY1MTQzY2RmZWE4NGM3MDEwYzEwZTc1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Mq4jS2yqZX6vbG28UgpsCJujgEYbb66Vrz07_2VwlY";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: authAPI,
      },
    };
    // call api
    const res = await fetch(url, options);
    const data = await res.json();
    const movies = data.results;

    genericSection.innerHTML = "";
    movies.forEach((movie) => {
      const movieContainer = document.createElement("div");
      const movieImg = document.createElement("img");
      //
      movieContainer.classList.add("movie-container");
      movieContainer.addEventListener("click", () => {
        location.bash = "#movie=" + movie.id;
      });
      movieImg.classList.add("movie-img");
      //
      const url = "https://image.tmdb.org/t/p/w300/" + movie.poster_path;
      const title = movie.title;
      movieImg.setAttribute("src", url);
      movieImg.setAttribute("alt", title);
      movieContainer.appendChild(movieImg);
      genericSection.appendChild(movieContainer);
    });
    console.log("res: ", res);
    console.log("data: ", data);
    console.log("results: ", movies);
  } catch (error) {
    console.error("error : ", error);
  } finally {
    console.log("finally : getMoviesBySearch(query)");
  }

  console.groupEnd("");
}

async function getTrendingMovies() {
  try {
    // params
    const url = `https://api.themoviedb.org/3/trending/movie/day`;
    const authAPI =
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWI3MTYzMjk1NzE0NmVlNGI3ZjNkZWFlMWRjMzM1NSIsInN1YiI6IjY1MTQzY2RmZWE4NGM3MDEwYzEwZTc1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Mq4jS2yqZX6vbG28UgpsCJujgEYbb66Vrz07_2VwlY";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: authAPI,
      },
    };
    // call api
    const res = await fetch(url, options);
    const data = await res.json();
    const movies = data.results;
    // Add HTML
    genericSection.innerHTML = "";
    movies.map((movie) => {
      /* create elements*/
      const movieContainer = document.createElement("div");
      const movieImg = document.createElement("img");
      /* Add style */
      movieContainer.classList.add("movie-container");
      movieContainer.addEventListener("click", () => {
        location.bash = "#movie=" + movie.id;
      });

      movieImg.classList.add("movie-img");

      /* Add url img */
      const url = "https://image.tmdb.org/t/p/w300/" + movie.poster_path;
      const title = movie.title;
      movieImg.setAttribute("src", url);
      movieImg.setAttribute("alt", title);
      /* Add html */
      movieContainer.appendChild(movieImg);
      genericSection.appendChild(movieContainer);
    });
  } catch (error) {
    console.error("error", error);
  } finally {
    console.log("finally : getTrendingMoviesPreview()");
  }
}

async function getMovieBySearch(movieId) {
  try {
    // params
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}`;
    const authAPI =
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWI3MTYzMjk1NzE0NmVlNGI3ZjNkZWFlMWRjMzM1NSIsInN1YiI6IjY1MTQzY2RmZWE4NGM3MDEwYzEwZTc1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Mq4jS2yqZX6vbG28UgpsCJujgEYbb66Vrz07_2VwlY";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: authAPI,
      },
    };
    // call api
    const res = await fetch(url, options);
    const data = await res.json();
    const movies = data.results;

    genericSection.innerHTML = "";
    movies.forEach((movie) => {
      const movieContainer = document.createElement("div");
      const movieImg = document.createElement("img");
      //
      movieContainer.classList.add("movie-container");
      movieContainer.addEventListener("click", () => {
        location.bash = "#movie=" + movie.id;
      });
      movieImg.classList.add("movie-img");
      //
      const url = "https://image.tmdb.org/t/p/w300/" + movie.poster_path;
      const title = movie.title;
      movieImg.setAttribute("src", url);
      movieImg.setAttribute("alt", title);
      movieContainer.appendChild(movieImg);
      genericSection.appendChild(movieContainer);
    });
    console.log("res: ", res);
    console.log("data: ", data);
    console.log("results: ", movies);
  } catch (error) {
    console.error("error : ", error);
  } finally {
    console.log("finally : getMoviesBySearch(query)");
  }
}

getTrendingMoviesPreview();
getCategoriesPreview();
