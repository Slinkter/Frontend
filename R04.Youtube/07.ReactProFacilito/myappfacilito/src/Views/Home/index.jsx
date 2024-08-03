import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import useEventsResults from "../../state/events-results";
import Navbar from "../../Components/Navbar";
import Events from "../../Components/Events";
import style from "./Home.module.css";

const Home = () => {
    //
    const { data, isLoading, error, fetchEvents } = useEventsResults(); // store zustand
    //
    const [seachTerm, setSeachTerm] = useState("");
    const [isToggle, setIsToggle] = useState(false);
    const containerRef = useRef();
    const fetchMyEventsRef = useRef();
    /*  */
    fetchMyEventsRef.current = fetchEvents;
    const events = useMemo(
        () => data?._embedded?.events || [],
        [data?._embedded?.events]
    );
    const pageCount = useMemo(() => data?.page || {}, [data?.page]);
    // funciones
    const handleNavbarSearch = (term) => {
        setSeachTerm(term);
        fetchEvents(`&keyword=${term}`);
    };

    const handlePageClick = useCallback(
        ({ selected }) => {
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
            return <div> error!!! </div>;
        }

        return (
            <>
                <button onClick={() => setIsToggle(!isToggle)}>
                    {isToggle ? "ON" : "OFF"}
                </button>
                <Events searchTerm={seachTerm} events={events} />
                <ReactPaginate
                    className={style.pagination}
                    disabledClassName={style.disabledPage}
                    activeClassName={style.activePage}
                    nextClassName={style.nextgit}
                    previousClassName={style.previous}
                    pageClassName={style.page}
                    previousLabel="< "
                    breakLabel="..."
                    nextLabel=" >"
                    pageRangeDisplayed={5}
                    pageCount={pageCount.totalPages}
                    renderOnZeroPageCount={null}
                    onPageChange={handlePageClick}
                />
            </>
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
