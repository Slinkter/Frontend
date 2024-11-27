import { SearchProvider } from "./context/SearchContext";
import CatFactContainer from "./components/CatFact";
import GiphyContainer from "./components/Giphy";

export default function App() {
    document.title = "prueba tecnica 01";

    return (
        <div className="maincontainer">
            <SearchProvider>
                <CatFactContainer />
                <GiphyContainer />
            </SearchProvider>
        </div>
    );
}
