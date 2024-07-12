import { ThemeComponent } from "./store";
import Home from "./Home";

function App() {
    //
    return (
        <div className="App">
            <section className="container m-5">
                <h1> React usecontext </h1>
                <ThemeComponent>
                    <Home />
                </ThemeComponent>
            </section>
        </div>
    );
}

export default App;
