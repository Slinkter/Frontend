import MyComponent from "./components/MyComponent.jsx";
import StoreProvider from "./store/StoreProvider.js";

function App() {
    return (
        <div className="App">
            <StoreProvider>
                <MyComponent />
            </StoreProvider>
        </div>
    );
}

export default App;
