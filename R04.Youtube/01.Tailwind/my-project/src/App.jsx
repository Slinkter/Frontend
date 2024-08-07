import System from "./components/System";
import Page from "./components/ImgPage";
import Cube from "./components/Cube";
import Columns from "./components/Columns";

const App = () => {
    return (
        <>
            <Columns />
            <Page />
            <Cube />
            <System />
        </>
    );
};

export default App;
