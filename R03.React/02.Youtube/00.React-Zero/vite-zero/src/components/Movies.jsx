import React, { useContext } from "react";
import { ThemeContextMovie } from "../context/ContextMovie";
import { ThemeContextUser } from "../context/ContextUser";

const Movies = () => {
  const { movies } = useContext(ThemeContextMovie);
  const { user, btnFav } = useContext(ThemeContextUser);

  return (
    <div className="">
      <div className=" flex flex-row flex-wrap gap-2 items-center justify-center m-4">
        {movies.map((movie) => {
          return (
            <div
              className="flex flex-col items-center justify-center w-72 h-[400px] border-2"
              key={movie.id}
            >
              <img
                className="w-56 h-72 object-cover p-2 my-2"
                src={movie.imageUrl}
                alt={movie.title}
              />
              <div className="flex flex-col items-center justify-around  my-2 px-4 text-center">
                <p className="  ">{movie.title} </p>
                {user ? (
                  <button
                    className={
                      user?.favoriteMovies.includes(movie.id)
                        ? "btn-default bg-red-500 text-white"
                        : "btn-default bg-blue-500 text-white"
                    }
                    onClick={() => btnFav(movie.id)}
                  >
                    Favorite
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
