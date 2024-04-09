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
import { useNavigate, useParams, useLocation } from "react-router-dom";

const ViewVideo = () => {
  
  const [liked, setLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const nav = useNavigate();
  const { id } = useParams();
  const loc=useLocation();
  console.log(loc.state);
  console.log(id);
  const videoOptions = {
    autoplay: true,
    controls: true,
    sources: [
      {
        src: `http://localhost:8080/ipfs/${loc.state.videoHash}`,
        type: "video/mp4",
      },
    ],
  };

  return (
    <div>
      <div className="overflow-x-hidden text-secondary px-10 relative">
        <HomeTopNav />
        <img
          src="/thirdeye_logo_white.svg"
          alt="home"
          className="h-10 w-10 cursor-pointer ml-5 absolute top-5 left-1"
          onClick={(e) => {
            e.preventDefault();
            nav("/home");
          }}
        />
        <VideoPlayer options={videoOptions} />
        <h2 className="text-4xl mt-5">{loc.state.title}</h2>
        <p className="text-accent text-xs mt-2">{loc.state.description}</p>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <span className="text-xs">{loc.state.creator}</span>
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
