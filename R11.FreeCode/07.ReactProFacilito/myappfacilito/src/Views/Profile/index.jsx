import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

const Profile = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  /* revisar el pathname */

  const handleTabClick = (path) => {
    navigate(`/profile/${path}`);
  };
  return (
    <div>
      <Link to="/" className={styles.homeLink}>
        Inicio
      </Link>
      <div
        style={{
          margin: 12,
        }}
      >
        <span
          style={{ marginRight: 8 }}
          className={`
        ${pathname.includes("my-info") ? styles.active : ""}
        ${styles.tab}`}
          onClick={() => handleTabClick("my-info")}
        >
          Mi Informacion
        </span>
        <span
          className={`
        ${pathname.includes("liked-events") ? styles.active : ""} 
        ${styles.tab}`}
          onClick={() => handleTabClick("liked-events")}
        >
          Eventos Favorito
        </span>

        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
