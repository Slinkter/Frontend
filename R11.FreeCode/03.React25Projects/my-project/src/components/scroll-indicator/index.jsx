import React, { useEffect, useState } from "react";
import "./style.css";

const ScrollIndicator = ({ url }) => {
  const [data, setData] = useState([]); // array
  const [loading, setLoading] = useState(false); // boolean
  const [errorMessage, setErrorMessage] = useState(""); // string
  const [scrollPercentage, setScrollPercentage] = useState(0); // number

  async function fetchData(getUrl) {
    try {
      setLoading(true);
      const res = await fetch(getUrl);
      const data = await res.json();

      if (data && data.products && data.products.length > 0) {
        setData(data.products);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  }

  useEffect(() => {
    fetchData(url);
  }, [url]);

  function handleScrollPercentage() {
    //

    const a = document.documentElement.scrollTop; // element scrolled
    const b = document.documentElement.clientHeight; // altura de la ventana  de navegador
    const c = document.documentElement.scrollHeight; // altura total de html generado

    //
    const howMuchScrolled = a;
    const height = c - b;
    console.log(a, b, c);
    setScrollPercentage((howMuchScrolled / height) * 100);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercentage);
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  if (errorMessage) {
    return <div>Error!</div>;
  }
  if (loading) {
    return <div>loading data ! please wait</div>;
  }

  return (
    <>
      <div className="top-container">
        <h1>Curstom Scrool Indicator</h1>
        <div className="scroll-progress-tracking-container">
          <div
            className="current-progress-bar"
            style={{ width: ` ${scrollPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="data-container">
        {data && data.length > 0
          ? data.map((item) => <p key={item.id}>{item.title}</p>)
          : null}
      </div>
    </>
  );
};

export default ScrollIndicator;
