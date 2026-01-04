import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import "../assets/styles/components/Player.scss"; // Migrado
import { connect } from "react-redux";
import { getVideoSource } from "../tools/actions";
import NotFound from "./NotFound";

function Player(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const hasPlaying = Object.keys(props.playing).length > 0;

  useEffect(() => {
    props.getVideoSource(id);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return hasPlaying ? (
    <div className="fixed inset-0 w-full h-full bg-black z-50 flex items-center justify-center">
      <video controls autoPlay className="w-full h-full object-contain">
        <source src={props.playing.source} type="video/mp4" />
      </video>
      <div className="absolute top-5 left-5">
        <button 
          type="button" 
          onClick={handleBack}
          className="bg-black/50 hover:bg-black/80 text-white font-bold py-2 px-6 rounded-full border border-white/20 backdrop-blur-md transition-all"
        >
          Regresar
        </button>
      </div>
    </div>
  ) : (
    <NotFound />
  );
}

const mapStateToProps = (state) => {
  return { playing: state.playing };
};

const mapDispatchToProps = { getVideoSource };

export default connect(mapStateToProps, mapDispatchToProps)(Player);
