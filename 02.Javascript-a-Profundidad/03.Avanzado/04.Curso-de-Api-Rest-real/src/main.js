console.log("main.js  " + API_KEY);

async function getTrendingMoviesPreview() {
  const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWI3MTYzMjk1NzE0NmVlNGI3ZjNkZWFlMWRjMzM1NSIsInN1YiI6IjY1MTQzY2RmZWE4NGM3MDEwYzEwZTc1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Mq4jS2yqZX6vbG28UgpsCJujgEYbb66Vrz07_2VwlY",
    },
  };

  const res = await fetch(url, options);
  const data = await res.json();
  console.log(data);
  console.log(data.results);
  //return data;
}

getTrendingMoviesPreview();
