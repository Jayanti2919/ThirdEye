import React, {useState} from "react";
import HomeSideNav from "../components/HomeSideNav";
import HomeTopNav from "../components/HomeTopNav";

const Home = () => {

  return (
    <div className="relative">
      <div className="absolute h-screen justify-center items-center flex left-10 px-5">
        <HomeSideNav />
      </div>
      <div>
        <HomeTopNav />
      </div>
    </div>
  );
}

export default Home;