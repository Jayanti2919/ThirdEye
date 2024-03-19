import React from "react";

const VideoCard = ({ title, creator, thumbnailHash, likeCount, viewCount }) => {
  return (
    <div className="text-secondary bg-tertiary gap-1 flex flex-col items-start px-3 py-5 rounded-md cursor-pointer">
      <img
        src={`https://ipfs.io/ipfs/${thumbnailHash}`}
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
