import React from "react";
import Accordian from "./components/Accordian";
import RandomColor from "./components/random-color";
import StarRating from "./components/star-rating";
import ImageSlider from "./components/image-slider";
import LoadMoreData from "./components/load-more";

const App = () => {
  return (
    <div>
      {/*   <RandomColor /> */}
      {/*    <StarRating noOfStarts={10} /> */}
      {/* <ImageSlider
        url={"https://picsum.photos/v2/list"}
        page={"1"}
        limit={"10"}
      /> */}
      <LoadMoreData />
    </div>
  );
};

export default App;
