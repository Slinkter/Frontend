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
import UseFetchHookTest from "./components/use-fetch/UseFetchHookTest";
import UseWindowsResizeTest from "./components/use-window-resize/test";
import ScrollToTopAndBottm from "./components/scroll-to-top-bot";
import ScrollToSection from "./components/scroll-to-section";

const App = () => {
    return (
        <>
            {/* <RandomColor /> */}
            {/*  <ImageSlider /> */}
            {/* <LoadMoreData /> */}
            {/* <LigthDarkMode /> */}
            {/* <ScrollIndicator url={"https://dummyjson.com/products?limit=100"} /> */}
            {/* <TabTest /> */}
            {/* <ModalTest /> */}
            {/* <GithubProfileFinder /> */}
            {/* <SearchAutoComplete /> */}
            {/* <UseFetchHookTest /> */}
            {/* <ScrollToTopAndBottm /> */}
            {/* <ScrollToSection /> */}
            {/* <StarRating noOfStarts={10} /> */}
            {/* <TreeView menus={menus} /> */}
            {/* <TicTacToe /> */}
            {/* <UseWindowsResizeTest /> */}
            {/* <QrGenerator /> */}
        </>
    );
};

export default App;
