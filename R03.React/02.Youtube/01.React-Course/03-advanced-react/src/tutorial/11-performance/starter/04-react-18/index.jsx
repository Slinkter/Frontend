import { lazy } from "react";
import { Suspense } from "react";
import { useTransition } from "react";
import { useState } from "react";
const SlowComponent = lazy(() => import("./SlowComponent"));

const LatestReact = () => {
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <Suspense fallback={<h4>Loading...</h4>}>
      <section>
        <form className="form">
          <input
            type="text"
            className="form-input"
            value={text}
            onChange={handleChange}
          />
        </form>
        <h4>Items Below</h4>
        {isPending ? (
          "Loading..."
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              marginTop: "2rem",
            }}
          >
            {items}
          </div>
        )}
        <button className="btn">toggle</button>
        {!show && <SlowComponent />}
      </section>
    </Suspense>
  );
};
export default LatestReact;
