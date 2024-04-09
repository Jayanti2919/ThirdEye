import React from "react";
import HomeSideNav from "../components/HomeSideNav";
import HomeTopNav from "../components/HomeTopNav";

const EditChannel = () => {
  return (
    <div className="relative overflow-x-hidden pb-10">
      <div className="absolute h-screen justify-center items-center flex left-10 px-5">
        <HomeSideNav />
      </div>
      <div>
        <HomeTopNav />
      </div>
    </div>
  );
};

export default EditChannel;
