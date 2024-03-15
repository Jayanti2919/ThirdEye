import React from "react";
import SideNav from "../components/SideNav";

const LikedVideos = () => {
    return (
        <div className="bg-primary relative z-10 overflow-x-hidden">
      <div className="absolute h-screen justify-center items-center flex left-10">
        <SideNav />
      </div>
      </div>
    );
};

export default LikedVideos;