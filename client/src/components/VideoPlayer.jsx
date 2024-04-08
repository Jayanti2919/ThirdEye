import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ options }) => {
  const videoRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      const player = videojs(videoRef.current, options, () => {
        console.log("Player ready");
      });
    }, 0);
  }, [options]);

  return (
    <div
      data-vjs-player
      style={{
        width: "800px",
        height: "450px",
        minWidth: "800px",
        minHeight: "450px",
        marginTop: "20px",
        marginLeft: "20px",
      }}
    >
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered"
        style={{
          width: "100%",
          height: "100%",
          minWidth: "800px",
          minHeight: "450px",
        }}
      />
    </div>
  );
};

export default VideoPlayer;
