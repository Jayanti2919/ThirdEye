import React from "react";
import HomeTopNav from "../components/HomeTopNav";
import VideoPlayer from "../components/VideoPlayer";

const ViewVideo = () => {
  const videoOptions = {
    autoplay: true,
    controls: true,
    sources: [{
      src: '/payment-bg-vid.mp4',
      type: 'video/mp4'
    }]
  };

  return (
    <div>
      <div>
        <HomeTopNav />
        <VideoPlayer options={videoOptions} />
      </div>
    </div>
  );
};

export default ViewVideo;