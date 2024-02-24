import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./index.css";

const ImageSlider = ({ url, page, limit }) => {
  const [images, setImages] = useState([]); // [{},{},{}]
  const [currentSlide, setCurrentSlide] = useState(0);

  const [loading, setLoading] = useState(false);
  const [errorMsh, setErrorMsh] = useState("");

  async function fetchImages() {
    try {
      setLoading(true);
      const url_api = `${url}?page=${page}}&limit=${limit}`;
      const res = await fetch(url_api);
      const data = await res.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (e) {
      setErrorMsh(e.message);
      setLoading(false);
    }
  }

  function handlePreviews() {
    // si currentSlide es igual a 0 , [].length -1 , ir al ultimo , sino -1
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }

  function handleNext() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }

  useEffect(() => {
    if (url !== "") {
      fetchImages();
    }
  }, [url]);

  if (loading) {
    return <div className="container">Loading Data !!! please wait</div>;
  }

  if (errorMsh) {
    return <div className="container">Error ocurred !!{errorMsh}</div>;
  }

  console.log(currentSlide);

  return (
    <div className="container">
      <BsArrowLeftCircleFill
        className="arrow arrow-left"
        onClick={handlePreviews}
      />
      {/* ----------------------- */}
      {images && images.length
        ? images.map((img, index) => (
            <img
              key={img.id}
              alt={img.download_url}
              src={img.download_url}
              className={
                currentSlide === index ? "current-image" : "hide-current-image"
              }
            />
          ))
        : null}

      {/* ----------------------- */}
      <span className="circle-indicators">
        {images && images.length
          ? images.map((_, index) => (
              <button
                key={index}
                className={
                  currentSlide === index
                    ? "current-indicator"
                    : "current-indicator inactive-indicator"
                }
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))
          : null}
      </span>
      {/* ----------------------- */}
      <BsArrowRightCircleFill
        onClick={handleNext}
        className="arrow arrow-right"
      />
    </div>
  );
};

export default ImageSlider;
