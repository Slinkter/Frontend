import React, { useEffect, useState } from "react";

const MultipleReturnsBasics = () => {
  //
  const [isLoading, setIsLoading] = useState(true);
  //
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {};
  }, []);
  // pre - render component
  if (isLoading) {
    return <h2> Loading ...</h2>;
  }
  // Render component
  return (
    <>
      <h1>hola</h1>
    </>
  );
};

export default MultipleReturnsBasics;
