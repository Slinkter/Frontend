async function getTrendingMoviesPreview() {
  /*  */
  const url = `https://api.themoviedb.org/3/trending/movie/day`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWI3MTYzMjk1NzE0NmVlNGI3ZjNkZWFlMWRjMzM1NSIsInN1YiI6IjY1MTQzY2RmZWE4NGM3MDEwYzEwZTc1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Mq4jS2yqZX6vbG28UgpsCJujgEYbb66Vrz07_2VwlY",
    },
  };
  /*  */
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    const movies = data.results;
    //  console.log(data);
    // console.log(data.results);
    // article selected
    const trendingMoviesPreviewList = document.querySelector(
      "#trendingPreview .trendingPreview-movieList"
    );

    movies.map((movie) => {
      /* create elements*/
      const movieContainer = document.createElement("div");
      const movieImg = document.createElement("img");
      /* Add style */
      movieContainer.classList.add("movie-container");
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
  }
  //return data;
}

async function getCategoriesPreview() {
  /*  */
  const url = `https://api.themoviedb.org/3/genre/movie/list`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWI3MTYzMjk1NzE0NmVlNGI3ZjNkZWFlMWRjMzM1NSIsInN1YiI6IjY1MTQzY2RmZWE4NGM3MDEwYzEwZTc1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Mq4jS2yqZX6vbG28UgpsCJujgEYbb66Vrz07_2VwlY",
    },
  };
  /*  */
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    const categories = data.genres;
    //console.log(data);
    //console.log(categories);
    /*  */
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
    });
  } catch (error) {
    console.error("error", error);
  }
}
getTrendingMoviesPreview();
getCategoriesPreview();
