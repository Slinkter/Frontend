// components
import Navbar from "./Navbar";
import CartContainer from "./CartContainer";
import { useGlovalContext } from "./context";

function App() {
  const { loading } = useGlovalContext();

  if (loading) {
    return (
      <main>
        <div className="loading" style={{ marginTop: "6rem" }}></div>
      </main>
    );
  }

  console.log(loading);

  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
