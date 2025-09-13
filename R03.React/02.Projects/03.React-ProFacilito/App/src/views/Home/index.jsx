import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import ReactPaginate from "react-paginate";

import Navbar from "../../components/Navbar";
import Events from "../../components/Events";

import useEventsResults from "../../state/events-results";
import styles from "./Home.module.css";

const Home = () => {
    // hooks
    const [isToggle, setIsToggle] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const containerRef = useRef();
    const fetchMyEventsRef = useRef();
    // store
    const { data, isLoading, error, fetchEvents } = useEventsResults();
    // get events
    const events = useMemo(
        () => data?._embedded?.events || [],
        [data?._embedded?.events]
    );
    // get pages
    const page = useMemo(() => data?.page || {}, [data?.page]);
    //
    fetchMyEventsRef.current = fetchEvents; // combinacion store y ref

    useEffect(() => {
        fetchMyEventsRef.current(); // exec fetch
    }, []);

    const handleNavbarSearch = (term) => {
        setSearchTerm(term);
        fetchEvents(`&keyword=${term}`);
    };

    const handlePageClick = useCallback(
        ({ selected }) => {
            fetchEvents(`&keyword=${searchTerm}&page=${selected}`);
        },
        [searchTerm, fetchEvents]
    );

    const renderEvents = () => {
        if (isLoading) {
            return <div>Cargando resultados...</div>;
        }

        if (error) {
            return <div>Ha ocurrido un error</div>;
        }

        return (
            <div>
                <button onClick={() => setIsToggle(!isToggle)}>
                    {isToggle ? "ON" : "OFF"}
                </button>
                <Events searchTerm={searchTerm} events={events} />
                <ReactPaginate
                    className={styles.pagination}
                    nextClassName={styles.next}
                    previousClassName={styles.previous}
                    pageClassName={styles.page}
                    activeClassName={styles.activePage}
                    disabledClassName={styles.disabledPage}
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={page.totalPages}
                    previousLabel="<"
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
