import React from "react";
import { connect } from "react-redux";
// Componets
import Header from "../components/Header";
import Search from "../components/Search";
import Categories from "../components/Categories";
import Carousel from "../components/Carousel";
import CarouselItem from "../components/CarouselItem";
// CSS Style
import "../assets/styles/App.scss";
//
const mapStateToProps = (state) => {
  const props = {
    myList: state.myList,
    trends: state.trends,
    originals: state.originals,
  };
  return props;
};

//
const Home = (props) => {
  //
  const { myList, trends, originals } = props;
  //

  // --> List Favorite
  const ListFavorite = (
    <Categories title="Mi Lista">
      <Carousel>
        {myList.map((item) => (
          <CarouselItem key={item.id} {...item} isList />
        ))}
      </Carousel>
    </Categories>
  );
  // --> List Trends
  const ListTrends = (
    <Categories title="Tendencias">
      <Carousel>
        {trends.map((item) => (
          <CarouselItem key={item.id} {...item} />
        ))}
      </Carousel>
    </Categories>
  );
  // --> List Originals
  const ListOriginals = (
    <Categories title="Originales ">
      <Carousel>
        {originals.map((item) => (
          <CarouselItem key={item.id} {...item} />
        ))}
      </Carousel>
    </Categories>
  );

  // render Components
  return (
    <>
      <Header />
      <Search isHome />
      {myList.length > 0 && ListFavorite}
      {trends.length > 0 && ListTrends}
      {originals.length > 0 && ListOriginals}
    </>
  );
};

export default connect(mapStateToProps, null)(Home);
