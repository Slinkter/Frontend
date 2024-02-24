import React from "react";
import Accordian from "./components/Accordian";
import RandomColor from "./components/random-color";
import StarRating from "./components/star-rating";
import ImageSlider from "./components/image-slider";
import LoadMoreData from "./components/load-more";
import TreeView from "./components/tree-view";
import menus from "./components/tree-view/data";
import QrGenerator from "./components/qr-generator";
import LigthDarkMode from "./components/light-dark-mode";
import ScrollIndicator from "./components/scroll-indicator";

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
      {/*       <LoadMoreData /> */}
      {/*       <TreeView menus={menus} /> */}
      {/*       <QrGenerator /> */}
      {/*   <LigthDarkMode /> */}
      <ScrollIndicator url={"https://dummyjson.com/products?limit=100"} />
    </div>
  );
};

export default App;
