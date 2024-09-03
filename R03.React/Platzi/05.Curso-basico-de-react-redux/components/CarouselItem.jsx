// Librerias
import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// CSS
import "../assets/styles/components/CarouselItem.scss";
// Icons
import playIcon from "../assets/static/play-icon.png";
import plusIcon from "../assets/static/plus-icon.png";
import removeIcon from "../assets/static/remove-icon.png";
// Actions
import { setFavorite, deleteFavorite } from "../tools/actions";
// ---> el reducer escucha ?
const MapDispatchToProps = {
  setFavorite,
  deleteFavorite,
};
// --->
const CarouselItem = (props) => {
  // values
  const { id, cover, title, year, contentRating, duration, isList } = props;
  // MapDispatchToProps
  const { setFavorite, deleteFavorite } = props;
  const [isLoading, setIsLoading] = useState(true);
  // Add Fav
  const handleSetFavorite = () => {
    // setFavorite (payload)
    setFavorite({ id, cover, title, year, contentRating, duration });
  };
  // Delete Fav
  const handleDeleteFavorite = (itemId) => {
    // deleteFavorite (payload)
    deleteFavorite(itemId);
  };
  // --> Icon Delete
  const deleteItemFav = (
    <img
      className="carousel-item__details--img"
      src={removeIcon}
      alt="remove icon"
      onClick={() => handleDeleteFavorite(id)}
    />
  );
  // --> Icon Add
  const addItemFav = (
    <img
      className="carousel-item__details--img"
      src={plusIcon}
      alt="Plus Icon"
      onClick={handleSetFavorite}
    />
  );
  // --> Icon Play
  const playItem = (
    <img
      className="carousel-item__details--img"
      src={playIcon}
      alt="Play Icon"
    />
  );
  // css className
  const ci01 = "carousel-item ";
  const ci02 = "carousel-item__img";
  const ci03 = "carousel-item__details";
  const ci04 = "carousel-item__details--title";
  const ci05 = "carousel-item__details--subtitle";
  //
  const handleImageLoad = () => {
    setIsLoading(false); // La imagen se ha cargado, establecer isLoading en falso
  };
  // Render component
  return (
    <div className={ci01}>
      <div className={isLoading ? `${ci02} loading` : ci02}>
        <img
          className={ci02}
          src={cover}
          alt={title}
          onLoad={handleImageLoad}
        />
        {isLoading && <div className="loading-spinner" />}
      </div>
      <div className={ci03}>
        <div>
          <Link to={`/player/${id}`}>{playItem}</Link>
          {isList ? deleteItemFav : addItemFav}
        </div>
        <p className={ci04}>{title}</p>
        <p className={ci05}>{`${year}`}</p>
        <p className={ci05}>{`${contentRating}`}</p>
        <p className={ci05}>{`${duration}`}</p>
      </div>
    </div>
  );
};
// PropTypes Component
CarouselItem.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
};

export default connect(null, MapDispatchToProps)(CarouselItem);
