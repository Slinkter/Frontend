import React from "react";
import Accordian from "./components/Accordian";
import GithubProfileFinder from "./components/github-profile-finder";
import ImageSlider from "./components/image-slider";
import LigthDarkMode from "./components/light-dark-mode";
import LoadMoreData from "./components/load-more";
import ModalTest from "./components/custom-modal-popup/modal-test";
import QrGenerator from "./components/qr-generator";
import RandomColor from "./components/random-color";
import ScrollIndicator from "./components/scroll-indicator";
import ScrollToSection from "./components/scroll-to-section";
import ScrollToTopAndBottm from "./components/scroll-to-top-bot";
import SearchAutoComplete from "./components/search-autocomplete";
import StarRating from "./components/star-rating";
import TabTest from "./components/custom-tabs/tab-test";
import TicTacToe from "./components/tic-tac-toe";
import TreeView from "./components/tree-view";
import UseFetchHookTest from "./components/use-fetch/UseFetchHookTest";
import UseWindowsResizeTest from "./components/use-window-resize/test";
import menus from "./components/tree-view/data";
import RandomColorLuis from "./componentsLuis/random-color/RandomColorLuis";
import ImageSliderLuis from "./componentsLuis/ImageSlider/ImageSliderLuis";
import LoadMoreDataLuis from "./componentsLuis/LoadMoreDataLuis/LoadMoreDataLuis";

const App = () => {
    return (
        <>
            <LoadMoreData />
            {/* -----> Profesor <----- */}
            {/* <RandomColor /> */}
            {/* <ImageSlider /> */}
            {/* 
           
            <LigthDarkMode />
            <ScrollIndicator />
            <TabTest />
            <ModalTest /> */}
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
            {/* -----> Luis <----- */}
            {/*     <RandomColorLuis /> */}
            {/*   <ImageSliderLuis /> */}
            <LoadMoreDataLuis />
        </>
    );
};

export default App;
