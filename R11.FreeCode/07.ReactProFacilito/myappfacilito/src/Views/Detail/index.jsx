import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { es } from "date-fns/locale";
import { format } from "date-fns";

import style from "./Detail.module.css";
import useEventsResults from "../../state/events-results";

const Detail = () => {
  const { data } = useEventsResults();
  console.log("data - useEventResults", data);
  const { eventId } = useParams();
  const [eventData, setEventData] = useState({});
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const url = `
          https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${
          import.meta.env.VITE_TICKETMASTER_API_KEY
        }`;
        const res = await fetch(url);
        const data = await res.json();
        setEventData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setEventData({});
        setError(error);
        setIsLoading(false);
      }
    };

    fetchEventData();
    return () => {};
  }, []);

  if (isLoading && Object.keys(eventData) === 0) {
    return <div>Cargando evento</div>;
  }
  if (Object.keys(error) > 0) {
    return <div>Ha ocurrido error</div>;
  }

  return (
    <div className={style.container}>
      <div className={style.mainInfoContainer}>
        <img
          src={eventData.images?.[0].url}
          className={style.eventImage}
          alt={eventData.name}
        />
        <h4 className={style.eventName}>{eventData.name}</h4>
        <p className={style.infoParagraph}>{eventData.info}</p>

        <p className={style.dateParagraph}>
          {eventData?.dates?.start.dateTime ? (
            <p>
              {format(new Date(eventData.dates.start.dateTime), "d LLLL yyyy")}
            </p>
          ) : null}
        </p>
      </div>
      <div className={style.seatInfoContainer}>
        <h6 className={style.seatMaptitle}> Mapa concierto </h6>
        <img src={eventData.seatmap?.staticUrl} alt="seatmaop event" />
        <p className={style.pleaseNoteLegend}>{eventData.pleaseNote}</p>
        <p className={style.priceRangeLegend}>
          Rango de precios : {eventData.priceRanges?.[0].min} -
          {eventData.priceRanges?.[0].max}
        </p>
      </div>
      <a href={eventData.url}>Ir por tus boletos</a>
    </div>
  );
};

export default Detail;
