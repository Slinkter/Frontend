import React from "react";
import { useRef } from "react";
import { useState } from "react";

const videoURL =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const MediaPlayer = () => {
    const [isPlay, setIsPlay] = useState(false);
    const videoRef = useRef(null);

    const handleVideo = () => {
        const video = videoRef.current;
        if (!isPlay) {
            video.play();
            setIsPlay(true);
        } else {
            video.pause();
            setIsPlay(false);
        }
    };

    return (
        <div>
            <video ref={videoRef} width="400">
                <source src={videoURL} type="" />
            </video>

            <button onClick={handleVideo}>{isPlay ? "Pause" : "Play"}</button>
        </div>
    );
};

export default MediaPlayer;
