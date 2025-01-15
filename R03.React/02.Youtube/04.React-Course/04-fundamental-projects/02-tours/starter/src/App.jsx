import { useEffect, useState } from "react";
import Tours from "./components/Tours";

const url = "https://www.course-api.com/react-tours-project";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            setData(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const removeItem = (id) => {
        const state = data.filter((item) => item.id !== id);
        setData(state);
    };

    useEffect(() => {
        getData();
    }, []);

    if (isLoading) {
        return (
            <main>
                <h2>Loading ...</h2>
            </main>
        );
    }

    if (data.length === 0) {
        return (
            <main>
                <div>
                    <h2>no tours left</h2>
                    <button className="btn" onClick={() => getData()}>
                        {" "}
                        refresh
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main>
            <Tours tours={data} removeTour={removeItem} />
        </main>
    );
};
export default App;
