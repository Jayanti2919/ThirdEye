import React from "react";
import HomeSideNav from "../components/HomeSideNav";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ParticlesComponent from "../components/ParticleComponent";
const Payments = () => {
  const nav = useNavigate();
  const handleRedirect = (e, path) => {
    e.preventDefault();
    nav(path);
  };

  return (
    <div className="bg-primary relative z-10 overflow-x-hidden">
      <div className="absolute">
        <img src="/payment-bg-2.png" className=" h-[220vh] md:h-screen w-screen object-cover" alt="" />
      </div>
      <div className="absolute h-screen justify-center items-center flex left-10 px-5">
        <HomeSideNav />
      </div>
      <div className="h-fit md:h-screen w-screen flex justify-center items-center py-10 px-4 md:pr-10 md:pl-40">

        <div className=" h-[200vh] md:h-full w-full bg-white-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border-2 border-accent border-opacity-20 grid md:grid-cols-2">
          <div className="">hii</div>
          <div className="flex items-center justify-start py-52 md:py-52 md:pr-10 lg:pr-40 ">
            <div className=" h-full w-full rounded-xl grid grid-cols-3 px-10 md:px-0">
              <div className="bg-[#181818] col-span-2 rounded-s-xl"></div>
              <div className="bg-primary rounded-e-xl"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Payments;
