import React, { useEffect, useState } from "react";
import HomeSideNav from "../components/HomeSideNav";
import HomeTopNav from "../components/HomeTopNav";
import VideoCard from "../components/VideoCard";
import axios from "axios";
const Home = () => {
  const [videos, setVideos] = useState([])
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/video/getTenVideos`).then(r => {
      const newVideos = response.data.message;
      setVideos(prevVideos => [...prevVideos, ...newVideos]);
    }).catch(e => console.log(e))
  }, [])

  return (
    <div className="relative overflow-x-hidden pb-10">
      <div className="absolute h-screen justify-center items-center flex left-10 px-5">
        <HomeSideNav />
      </div>
      <div>
        <HomeTopNav />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 items-center ml-0 md:ml-28 md:px-14 px-10 gap-5 mt-10">
        {videos.map((video, index) => (
          <VideoCard key={index} title={video.title} creator={video.channelName} thumbnailHash={video.thumbnailHash} likeCount={video.likeCount} viewCount={video.viewCount} />
        ))}
      </div>
    </div>
  );
}

export default Home;