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
    // article selected
    const trendingMoviesPreviewList = document.querySelector(
      "#trendingPreview .trendingPreview-movieList"
    );

    movies.map((movie) => {
      /*  */
      const movieContainer = document.createElement("div"); // create
      movieContainer.classList.add("movie-container");
      /*  */
      const movieImg = document.createElement("img"); // create
      movieImg.classList.add("movie-img");
      movieImg.setAttribute("alt", movie.title);
      movieImg.setAttribute(
        "src",
        "https://image.tmdb.org/t/p/w300/" + movie.poster_path
      );
      /*  */
      movieContainer.appendChild(movieImg); // add
      trendingMoviesPreviewList.appendChild(movieContainer); // add
    });

    console.log(data);
    console.log(data.results);
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
    /*  */
    categoriesPreviewList.innerHTML =""

    categories.forEach((category) => {
     /*  const categoriesPreviewList = document.querySelector(
        "#categoriesPreview .categoriesPreview-list"
      ); */
      const categoryContainer = document.createElement("div");
      categoryContainer.classList.add("category-container");
      /*  */
      const categoryTitle = document.createElement("h3");
      categoryTitle.classList.add("category-title");
      categoryTitle.setAttribute("id", "id" + category.id);
      const categoryTitleText = document.createTextNode(category.name);

      categoryTitle.appendChild(categoryTitleText);
      categoryContainer.appendChild(categoryTitle);
      categoriesPreviewList.appendChild(categoryContainer);


    });

    console.log(data);
    console.log(categories);
  } catch (error) {
    console.error("error", error);
  }
}

getTrendingMoviesPreview();
getCategoriesPreview();
