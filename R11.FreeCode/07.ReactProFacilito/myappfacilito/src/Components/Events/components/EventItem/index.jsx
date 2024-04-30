import styles from "./EventItem.module.css";

import Heart from "../../../../assets/heart.png";
import HeartNo from "../../../../assets/heart-no.png";
import useLikeEvents from "../../../../hook/useLikeEvents";

const EventItem = ({ info, name, image, onEventClick, id }) => {
  const { isEventLiked, toggleEventLike } = useLikeEvents(id);

  const handleSeeMoreClick = (e) => {
    e.stopPropagation();
    onEventClick(id);
  };
  const handleHeartClick = () => {
    toggleEventLike();
  };

  return (
    <div
      className={styles.eventItemContainer}
      onClick={() => console.log("soy el padre div ")}
    >
      <div className={styles.imageContainer}>
        <img
          src={isEventLiked ? Heart : HeartNo}
          alt=""
          className={styles.heartImage}
          onClick={handleHeartClick}
        />
        <img
          src={image}
          alt="name"
          className={styles}
          width={200}
          height={200}
        />
      </div>

      <div className={styles.eventInfoContainer}>
        <h4 className={styles.eventName}>{name}</h4>
        <p className={styles.eventInfo}>{info}</p>
        <button className={styles.seeMoreBtn} onClick={handleSeeMoreClick}>
          {/*      <Link to={`/detail/${id}`}>Ver mas</Link> */}
          ver mas
        </button>
      </div>
    </div>
  );
};

export default EventItem;
