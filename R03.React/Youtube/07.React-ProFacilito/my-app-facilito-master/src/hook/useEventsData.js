import { useState } from "react";
const useEventsData = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    const fetchEvents = async (params) => {
        try {
            console.log("fetchEvents");
            const apikey = import.meta.env.VITE_TICKETMASTER_API_KEY;
            const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&countryCode=MX${
                params?.length ? params : ""
            }`;
            console.log("URL", url);
            const res = await fetch(url);
            const data = await res.json();
            setData(data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }
    };

    return {
        events: data?._embedded?.events || [],
        isLoading,
        error,
        fetchEvents,
        pageCount: data?.page || {},
    };
};

export default useEventsData;

/* 
const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=RUMlldV5z0lh0xli5AJAgYWF13TePTL7${
  params?.length ? params : ""
}`;
 */
