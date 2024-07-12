import React, { useContext } from "react";
import UserContext from "../context/UserContext";

const Movie = ({ movie }) => {
    //
    const { user, toogleFavoriteMovieToUser } = useContext(UserContext);
    //
    const imgStyle = {
        height: "400px",
        objectFit: "cover",
    };

    const handleFavorite = () => toogleFavoriteMovieToUser(movie.id);
    const isFavorite = user?.favoriteMovies?.includes(movie.id);
    const btnStyle = isFavorite ? `btn btn-success` : `btn btn-outline-primary`;

    return (
        <div className="card m-3">
            <img
                className="card-img-top"
                style={imgStyle}
                src={movie.imageUrl}
                alt={movie.title}
            />
            <div className="card-body text-center">
                <h4>{movie.title}</h4>
                {user && (
                    <button className={btnStyle} onClick={handleFavorite}>
                        Favorito
                    </button>
                )}
            </div>
        </div>
    );
};

export default Movie;
