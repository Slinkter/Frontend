import React from "react";

const Tour = ({ image, date, title, info, location, duration, cost }) => {
    return (
        <article className="tour-card">
            <div className="tour-img-container">
                <img src={image} alt="" className="tour-img" />
                <p className="tour-date">{date}</p>
            </div>
            <div className="tour-info">
                <div className="tour-title">
                    <h4>{title} </h4>
                </div>
                <p>{info}</p>
                <div className="tour-footer">
                    <p>
                        <span className="fas fa-map"></span>
                        {location}
                    </p>

                    <p>from ${cost}</p>
                    <p>{duration}</p>
                </div>
            </div>
        </article>
    );
};

export default Tour;
