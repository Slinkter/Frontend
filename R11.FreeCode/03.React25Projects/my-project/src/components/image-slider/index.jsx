import { useEffect } from "react";
import { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./index.css";

/* 
  url={"https://picsum.photos/v2/list"}
  page={"1"}
  limit={"20"}

*/

const ImageSlider = ({ url, page, limit }) => {
  const [images, setImages] = useState([]); // [{},{},{},{},{},{},{},{}]
  const [currentSlide, setCurrentSlide] = useState(0); // number
  const [loading, setLoading] = useState(false); // boolean
  const [errorMsh, setErrorMsh] = useState(""); // string

  async function fetchImages() {
    setLoading(true);
    try {
      // url
      const url_api = `${url}?page=${page}}&limit=${limit}`;
      //
      const res = await fetch(url_api);
      const data = await res.json();
      //
      if (data) {
        setImages(data);
        setLoading(false);
      }
      console.log(data);
      console.log(url_api);
    } catch (e) {
      setErrorMsh(e.message);
      setLoading(false);
    }
  }

  function handlePreviews() {
    const lastElemnt = images.length - 1; // si currentSlide es igual a 0 ---> ir al ultimo( [array].length -1) ,--> sino -1
    setCurrentSlide(currentSlide === 0 ? lastElemnt : currentSlide - 1);
  }

  function handleNext() {
    const lastElemnt = images.length - 1;
    setCurrentSlide(currentSlide === lastElemnt ? 0 : currentSlide + 1);
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
      <div>
        <BsArrowLeftCircleFill
          className="arrow arrow-left"
          onClick={handlePreviews}
        />
        {/* -------------IMGs---------- */}
        {images && images.length
          ? images.map((img, index) => (
              <img
                key={img.id}
                alt={img.download_url}
                src={img.download_url}
                className={
                  currentSlide === index
                    ? "current-image"
                    : "hide-current-image"
                }
              />
            ))
          : null}

        {/* ----------------------- */}
        <span className="circle-indicators-container">
          {images && images.length
            ? images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={
                    currentSlide === index
                      ? "current-indicator"
                      : "current-indicator inactive-indicator"
                  }
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
    </div>
  );
};

export default ImageSlider;
