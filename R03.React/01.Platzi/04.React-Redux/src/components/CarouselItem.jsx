import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import "../assets/styles/components/CarouselItem.scss"; // Migrado a Tailwind
import playIcon from "../assets/static/play-icon.png";
import plusIcon from "../assets/static/plus-icon.png";
import removeIcon from "../assets/static/remove-icon.png";
import { setFavorite, deleteFavorite } from "../tools/actions";

const MapDispatchToProps = {
    setFavorite,
    deleteFavorite,
};

const CarouselItem = (props) => {
    const { id, cover, title, year, contentRating, duration, isList } = props;
    const { setFavorite, deleteFavorite } = props;
    const [isLoading, setIsLoading] = useState(true);

    const handleSetFavorite = () => {
        setFavorite({ id, cover, title, year, contentRating, duration });
    };

    const handleDeleteFavorite = (itemId) => {
        deleteFavorite(itemId);
    };

    // Icons
    const iconClass = "w-6 h-6 object-contain cursor-pointer hover:scale-110 transition-transform mr-2";
    
    const deleteItemFav = (
        <img className={iconClass} src={removeIcon} alt="remove" onClick={() => handleDeleteFavorite(id)} />
    );
    const addItemFav = (
        <img className={iconClass} src={plusIcon} alt="plus" onClick={handleSetFavorite} />
    );
    const playItem = (
        <img className={iconClass} src={playIcon} alt="play" />
    );

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const handleImageError = () => {
        setIsLoading(false);
    };

    return (
        <div className="relative inline-block w-[200px] h-[300px] rounded-3xl overflow-hidden cursor-pointer flex-shrink-0 transition-transform duration-300 origin-center hover:scale-105 hover:z-10 shadow-lg group bg-gray-900 snap-center">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                    <div className="w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
                </div>
            )}
            
            <img
                className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                src={cover}
                alt={title}
                onLoad={handleImageLoad}
                onError={handleImageError}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="flex items-center mb-2">
                    <Link to={`/player/${id}`}>{playItem}</Link>
                    {isList ? deleteItemFav : addItemFav}
                </div>
                <p className="text-white text-sm font-bold mb-1">{title}</p>
                <div className="flex items-center text-[10px] text-gray-300 gap-2">
                    <span>{year}</span>
                    <span className="border border-gray-500 px-1 rounded">{contentRating}</span>
                    <span>{duration} min</span>
                </div>
            </div>
        </div>
    );
};

CarouselItem.propTypes = {
    cover: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.number,
    contentRating: PropTypes.string,
    duration: PropTypes.number,
};

export default connect(null, MapDispatchToProps)(CarouselItem);
