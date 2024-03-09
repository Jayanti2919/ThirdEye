import React from "react";
import ParticlesComponent from "../components/ParticleComponent";
import "../App.css";
import SideNav from "../components/SideNav";

const Landing = () => {
  return (
    <div className="bg-primary relative z-10">
      <div className="absolute">
      <ParticlesComponent id="tsparticles"/>
      </div>
      <div className="h-screen md:flex items-center w-14 px-5 hidden">

      <SideNav />
      </div>

    </div>
  );
};

export default Landing;
