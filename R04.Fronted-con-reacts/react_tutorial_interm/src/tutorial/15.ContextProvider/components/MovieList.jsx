import React from "react";
import { useContext } from "react";
import MovieContext from "../context/MovieContext";
import Movie from "../components/Movie";

const MovieList = () => {
  //
  const { movies } = useContext(MovieContext);

  return (
    <div className="container">
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-4">
            <Movie movie={movie}></Movie>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
