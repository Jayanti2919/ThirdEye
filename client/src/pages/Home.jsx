import React, {useEffect, useState} from "react";
import HomeSideNav from "../components/HomeSideNav";
import HomeTopNav from "../components/HomeTopNav";
import VideoCard from "../components/VideoCard";
import axios from "axios";
const Home = () => {

  let videos = [
    {
      
      title: 'Video 1',
      creator: 'Creator 1',
      thumbnailHash: 'QmRL6x6ycb9oTXKHxRkAMfxmgprgNS1LRQHWN2qqHb6v2f',
      likeCount: 10,
      viewCount: 100,
    },
    {
      title: 'Video 2',
      creator: 'Creator 2',
      thumbnailHash: 'QmRL6x6ycb9oTXKHxRkAMfxmgprgNS1LRQHWN2qqHb6v2f',
      likeCount: 10,
      viewCount: 100,
    },
    {
      title: 'Video 3',
      creator: 'Creator 3',
      thumbnailHash: 'QmRL6x6ycb9oTXKHxRkAMfxmgprgNS1LRQHWN2qqHb6v2f',
      likeCount: 10,
      viewCount: 100,
    },
    {
      title: 'Video 4',
      creator: 'Creator 4',
      thumbnailHash: 'QmVJ9bAxRqHaKcjm5vnobHoQcs9mqx6iA5Lu2b7Fn6zn8v',
      likeCount: 10,
      viewCount: 100,
    },
    {
      title: 'Video 4',
      creator: 'Creator 4',
      thumbnailHash: 'QmVJ9bAxRqHaKcjm5vnobHoQcs9mqx6iA5Lu2b7Fn6zn8v',
      likeCount: 10,
      viewCount: 100,
    },
    {
      title: 'Video 4',
      creator: 'Creator 4',
      thumbnailHash: 'QmVJ9bAxRqHaKcjm5vnobHoQcs9mqx6iA5Lu2b7Fn6zn8v',
      likeCount: 10,
      viewCount: 100,
    },
    {
      title: 'Video 4',
      creator: 'Creator 4',
      thumbnailHash: 'QmVJ9bAxRqHaKcjm5vnobHoQcs9mqx6iA5Lu2b7Fn6zn8v',
      likeCount: 10,
      viewCount: 100,
    },
    {
      title: 'Video 4',
      creator: 'Creator 4',
      thumbnailHash: 'QmVJ9bAxRqHaKcjm5vnobHoQcs9mqx6iA5Lu2b7Fn6zn8v',
      likeCount: 10,
      viewCount: 100,
    },

  ]
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_URL}/videos/getTenVideos`).then(r=>{
      console.log(r)
    }).catch(e=>console.log(e))
  },[])

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
          <VideoCard key={index} title={video.title} creator={video.creator} thumbnailHash={video.thumbnailHash} likeCount={video.likeCount} viewCount={video.viewCount} />
        ))}
      </div>
    </div>
  );
}

export default Home;