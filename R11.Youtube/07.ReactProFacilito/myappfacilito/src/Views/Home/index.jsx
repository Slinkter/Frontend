import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import Navbar from "../../Components/Navbar";
import Events from "../../Components/Events";

import ReactPaginate from "react-paginate";
import style from "./Home.module.css";
import useEventsResults from "../../state/events-results";

const Home = () => {
    const { data, isLoading, error, fetchEvents } = useEventsResults();
    const events = useMemo(
        () => data?._embedded?.events || [],
        [data?._embedded?.events]
    );
    const pageCount = useMemo(() => data?.page || {}, [data?.page]);
    const [seachTerm, setSeachTerm] = useState("");
    const containerRef = useRef();

    const fetchMyEventsRef = useRef();
    fetchMyEventsRef.current = fetchEvents;

    const [isToggle, setIsToggle] = useState(false);

    const handleNavbarSearch = (term) => {
        setSeachTerm(term);
        fetchEvents(`&keyword=${term}`);
    };

    const handlePageClick = useCallback(
        ({ selected }) => {
            console.log(selected);
            fetchEvents(`&keyword=${seachTerm}&page=${selected}`);
        },
        [seachTerm, fetchEvents]
    );

    useEffect(() => {
        fetchMyEventsRef.current();
    }, []);

    const renderEvents = () => {
        if (isLoading) {
            return <div> Cargando resultado</div>;
        }
        if (error) {
            return <div> Cargando resultado</div>;
        }

        return (
            <div>
                <button onClick={() => setIsToggle(!isToggle)}>
                    {isToggle ? "oN" : "OFF"}
                </button>
                <Events searchTerm={seachTerm} events={events} />
                <ReactPaginate
                    className={style.pagination}
                    nextClassName={style.nextgit}
                    previousClassName={style.previous}
                    pageClassName={style.page}
                    breakLabel="..."
                    nextLabel=" >"
                    activeClassName={style.activePage}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount.totalPages}
                    previousLabel="< "
                    disabledClassName={style.disabledPage}
                    renderOnZeroPageCount={null}
                />
            </div>
        );
    };

    return (
        <>
            <Navbar onSearch={handleNavbarSearch} ref={containerRef} />
            {renderEvents()}
        </>
    );
};

export default Home;
