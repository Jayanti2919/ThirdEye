import React from "react";
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ title, creator, thumbnailHash, likeCount, viewCount, videoHash,description }) => {
  const nav = useNavigate();
  return (
    <div className="text-secondary bg-tertiary gap-1 flex flex-col items-start px-3 py-5 rounded-md cursor-pointer"
      onClick={(e)=>{
        console.log("Navigating")
        nav(`/home/viewVideo/${videoHash}`, {state: {title, creator, description}});
      }}
    >
      <img
        src={`http://localhost:8080/ipfs/${thumbnailHash}`}
        alt="thumbnail"
        className="w-96 h-56 bg-secondary mb-5 rounded-md"
      />
      {/* <span>{thumbnailHash}</span> */}
      <p className="text-lg">{title}</p>
      <p className="text-sm">{creator}</p>
      <div className="flex justify-between w-full">
        <p className="text-xs">{viewCount} views</p>
        <p className="text-xs">{likeCount} likes</p>
      </div>
    </div>
  );
};

export default VideoCard;
