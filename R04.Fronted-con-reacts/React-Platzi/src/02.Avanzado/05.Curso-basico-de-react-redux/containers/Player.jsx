import React, { useEffect } from "react";
import { useNavigate, useParams, Redirect } from "react-router-dom";
import "../assets/styles/components/Player.scss";
import { connect } from "react-redux";
import { getVideoSource } from "../tools/actions";
import NotFound from "./NotFound";
function Player(props) {
  //
  const navigate = useNavigate();
  const { id } = useParams();
  const hasPlaying = Object.keys(props.playing).length > 0; // booleano
  //
  useEffect(() => {
    props.getVideoSource(id);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return hasPlaying ? (
    <div className="Player">
      <video controls autoPlay>
        <source src={props.playing.source} type="video/mp4" />
      </video>
      <div className="Player-back">
        <button type="button" onClick={handleBack}>
          Regresar
        </button>
      </div>
    </div>
  ) : (
    <NotFound />
  );
}

/* 
export default Player;
*/

const mapStateToProps = (state) => {
  return {
    playing: state.playing,
  };
};

const mapDispatchToProps = {
  getVideoSource,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
