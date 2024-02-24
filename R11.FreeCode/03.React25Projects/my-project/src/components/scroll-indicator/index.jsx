import React, { useEffect, useState } from "react";
import "./style.css";

const ScrollIndicator = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [scrollPercentage, setScrollPercentage] = useState(0);

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

    return () => {};
  }, [url]);

  function handleScrollPercentage() {
    const a = document.body.scrollTop;
    const b = document.documentElement.scrollTop;
    const c = document.documentElement.scrollHeight;
    const d = document.documentElement.clientHeight;

    const howMuchScrolled = a || b;
    const height = c - d;
    setScrollPercentage((howMuchScrolled / height) * 100);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercentage);

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  console.log(loading);
  console.log(scrollPercentage);

  if (errorMessage) {
    return <div>Error!</div>;
  }
  if (loading) {
    return <div>loading data ! please wait</div>;
  }

  return (
    <div>
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
    </div>
  );
};

export default ScrollIndicator;
