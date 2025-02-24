import { useState, useTransition, lazy, Suspense } from "react";
const SlowComponent = lazy(() => import("./SlowComponent"));
const LatestReact = () => {
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [show, setShow] = useState(false);

  const divStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    marginTop: "2rem",
  };
  /*  */
  const handleChange = (e) => {
    setText(e.target.value);

    if (e.target.value.length === 0) {
      setItems([]);
    }

    startTransition(() => {
      const newItems = Array.from({ length: 10000 }, (_, index) => {
        return (
          <div key={index}>
            <img src="/vite.svg" alt="" />
          </div>
        );
      });

      setItems(newItems);
    });
  };
  /* render */
  return (
    <Suspense fallback={<h4>Loading...suspense activado</h4>}>
      <section>
        {/*  */}
        <form className="form">
          <input
            type="text"
            className="form-input"
            value={text}
            onChange={handleChange}
          />
        </form>
        {/*  */}

        {isPending ? "Loading 123..." : <div style={divStyle}>{items}</div>}
        <hr />
        <h4>Items Below</h4>
        {/*  */}
        <button onClick={() => setShow(!show)} className="btn">
          toggle
        </button>
        {show && <SlowComponent />}
      </section>
    </Suspense>
  );
};
export default LatestReact;
