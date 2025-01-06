import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./index.css";
const url = "https://picsum.photos/v2/list?page=1&limit=10";
const ImageSliderLuis = () => {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [currentPhoto, setCurrentPhoto] = useState(0);

    const getData = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);

            setImages(data);
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData();
        return () => {};
    }, []);

    const btnPrev = () => {
        setCurrentPhoto(
            currentPhoto !== 0 ? currentPhoto - 1 : images.length - 1
        );
    };
    const btnNext = () => {
        setCurrentPhoto(
            currentPhoto !== images.length - 1 ? currentPhoto + 1 : 0
        );
    };
    if (isError) {
        return <div className="container-image-luis">Error...</div>;
    }
    if (isLoading) {
        return <div className="container-image-luis">Loading...</div>;
    }

    return (
        <div className="container-image-luis">
            <h1>Photos</h1>
            <hr />
            {images.length > 0 &&
                images.map((image, index) => {
                    return (
                        <div key={index}>
                            <img
                                src={image.download_url}
                                alt=""
                                className={
                                    index === currentPhoto
                                        ? "image show"
                                        : "image hide"
                                }
                            />
                        </div>
                    );
                })}
            <hr />
            <div className="bg-image">
                <button onClick={btnPrev}>Prev</button>
                <button onClick={btnNext}>Next</button>
            </div>
        </div>
    );
};

export default ImageSliderLuis;
