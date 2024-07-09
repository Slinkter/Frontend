import ButtonApp from "./components/ButtonApp";
import ConditionApp from "./components/ConditionApp";
import CounterApp from "./components/CounterApp";
import ErrorApp from "./components/ErrorApp";
import ProductApp from "./components/ProductApp";
import ShoppingCard from "./components/ShoppingCard";

function App() {
    document.title = "Repaso 01";
    //

    return (
        <div className="App">
            <ButtonApp />
            <ConditionApp />
            <CounterApp />
            <ProductApp />
            <ShoppingCard />
            <ErrorApp />
        </div>
    );
}

export default App;
