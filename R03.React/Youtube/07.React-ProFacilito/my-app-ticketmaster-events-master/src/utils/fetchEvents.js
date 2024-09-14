import wrapPromise from "./wrapPromise";

const fetchEventDetail = async (eventId) => {
    try {
        const apikey = import.meta.env.VITE_TICKETMASTER_API_KEY;
        const url = `https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${apikey}`;
        //
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
