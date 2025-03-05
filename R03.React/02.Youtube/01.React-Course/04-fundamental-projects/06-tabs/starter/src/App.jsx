import { useEffect, useState } from "react";
import BtnContainer from "./BtnContainer";
import JobInfo from "./JobInfo";

const url = "https://www.course-api.com/react-tabs-project";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState(null);
    const [currentItem, setCurrentItem] = useState(0);

    const getData = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            setData(data);
        } catch (error) {
            isError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    console.log(data);

    if (isLoading) {
        return (
            <section className="jobs-center">
                <div className="loading"></div>
            </section>
        );
    }

    return (
        <section className="jobs-center">
            <BtnContainer
                jobs={data}
                currentItem={currentItem}
                setCurrentItem={setCurrentItem}
            />
            <JobInfo jobs={data} currentItem={currentItem} />
        </section>
    );
};
export default App;
