import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import EventItem from "../../../../Components/Events/components/EventItem";

const LikedEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const navite = useNavigate();

  useEffect(() => {
    const fetchEventsDetails = async () => {
      try {
        setIsLoading(true);
        const likedEvents =
          JSON.parse(localStorage.getItem("likedEvents")) || [];
        const results = [];
        console.log(likedEvents);

        for (const eventId of likedEvents) {
          const url = `
          https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${
            import.meta.env.VITE_TICKETMASTER_API_KEY
          }`;

          const res = await fetch(url);
          const data = await res.json();
          console.log(url);
          results.push(data);
        }

        setEvents(results);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEventsDetails();
  }, []);

  const handleEventItemClick = (eventId) => {
    navite(`/detail/${eventId}`);
  };

  if (Object.keys(error).length > 0) {
    return <div>error</div>;
  }

  if (isLoading) {
    return <div>Cargando ...</div>;
  }

  return (
    <div>
      {events.map((event, index) => (
        <EventItem
          key={`liked-event-item${event.id}-${index}`}
          name={event.name}
          info={event.info}
          image={event.images[0].url}
          onEventClick={handleEventItemClick}
          id={event.id}
        />
      ))}
    </div>
  );
};

export default LikedEvents;
