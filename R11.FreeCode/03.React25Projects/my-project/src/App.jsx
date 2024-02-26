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
import TabTest from "./components/custom-tabs/tab-test";
import ModalTest from "./components/custom-modal-popup/modal-test";
import GithubProfileFinder from "./components/github-profile-finder";
import SearchAutoComplete from "./components/search-autocomplete";
import TicTacToe from "./components/tic-tac-toe";
import UseFetchHookTest from "./components/use-fetch/test";

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
      {/* <LoadMoreData /> */}
      {/* <TreeView menus={menus} /> */}
      {/* <QrGenerator /> */}
      {/* <LigthDarkMode /> */}
      {/* <ScrollIndicator url={"https://dummyjson.com/products?limit=100"} /> */}

      {/* <TabTest /> */}
      {/*     <ModalTest /> */}
      {/* <GithubProfileFinder /> */}
      {/*       <SearchAutoComplete /> */}
      {/* <TicTacToe /> */}

      <UseFetchHookTest />
    </div>
  );
};

export default App;
