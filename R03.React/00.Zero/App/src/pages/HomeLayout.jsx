import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { Outlet } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import { isPending } from "@reduxjs/toolkit";

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <div>
      <Header></Header>
      <Navbar></Navbar>
      {!isPending ? (
        <Loading></Loading>
      ) : (
        <section className="align-element py-20">
          <Outlet></Outlet>
        </section>
      )}
    </div>
  );
};

export default HomeLayout;
