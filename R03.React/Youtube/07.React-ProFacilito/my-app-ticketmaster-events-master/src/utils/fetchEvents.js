import wrapPromise from "./wrapPromise";

const fetchEventDetail = async (eventId) => {
    try {
        const url = `https://apticketmaster.com/discovery/v2/events/${eventId}?apikey=${
            import.meta.env.VITE_TICKETMASTER_API_KEY
        }`;
        // --->
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const fetchData = (eventId) => {
    return {
        eventDetail: wrapPromise(fetchEventDetail(eventId)),
    };
};

export default fetchData;
