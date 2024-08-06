import { useState } from "react";

const LIKED_EVENTS_STORAGE_KEY = "likedEvents";

// consulta en LocalStorage si esta el eventID
const checkIsEventLiked = (eventId) => {
    const likedEvents =
        JSON.parse(localStorage.getItem(LIKED_EVENTS_STORAGE_KEY)) || [];
    return likedEvents.includes(eventId);
};

const useLikeEvents = (eventId) => {
    const [isEventLiked, setisEventLiked] = useState(
        checkIsEventLiked(eventId)
    );

    const toggleEventLike = () => {
        const likedEvents =
            JSON.parse(localStorage.getItem(LIKED_EVENTS_STORAGE_KEY)) || [];
        const eventIndex = likedEvents.indexOf(eventId);

        if (eventIndex !== -1) {
            likedEvents.splice(eventIndex, 1); // delete
            setisEventLiked(false);
        } else {
            likedEvents.push(eventId); // add
            setisEventLiked(true);
        }
        localStorage.setItem(
            LIKED_EVENTS_STORAGE_KEY,
            JSON.stringify(likedEvents)
        );
    };

    return { isEventLiked, toggleEventLike };
};

export default useLikeEvents;
