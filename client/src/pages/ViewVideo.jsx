import React, { useState } from "react";
import HomeTopNav from "../components/HomeTopNav";
import VideoPlayer from "../components/VideoPlayer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SubscriptionsRoundedIcon from "@mui/icons-material/SubscriptionsRounded";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

const ViewVideo = () => {
  const videoOptions = {
    autoplay: true,
    controls: true,
    sources: [
      {
        src: "/payment-bg-vid.mp4",
        type: "video/mp4",
      },
    ],
  };

  const [liked, setLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div>
      <div className="overflow-x-hidden text-secondary px-10">
        <HomeTopNav />
        <VideoPlayer options={videoOptions} />
        <h2 className="text-4xl mt-5">Video Title</h2>
        <p className="text-accent text-xs mt-2">Video Description</p>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <span className="text-xs">Channel Name</span>
            <IconButton
              aria-label="Subscribe"
              size="small"
              sx={{
                color: "#F1EFEF",
              }}
            >
              {subscribed ? (
                <SubscriptionsRoundedIcon
                  fontSize="small"
                  onClick={() => setSubscribed(!subscribed)}
                />
              ) : (
                <SubscriptionsOutlinedIcon
                  fontSize="small"
                  onClick={() => setSubscribed(!subscribed)}
                />
              )}
            </IconButton>
          </div>
          <div className="flex gap-2 pb-5">
            <IconButton
              aria-label="delete"
              size="small"
              sx={{
                color: "#F1EFEF",
              }}
            >
              {liked ? (
                <ThumbUpIcon
                  fontSize="small"
                  onClick={() => setLiked(!liked)}
                />
              ) : (
                <ThumbUpAltOutlinedIcon
                  fontSize="small"
                  onClick={() => setLiked(!liked)}
                />
              )}
            </IconButton>
            <IconButton
              aria-label="delete"
              size="small"
              sx={{
                color: "#F1EFEF",
              }}
            >
              <ShareRoundedIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewVideo;
