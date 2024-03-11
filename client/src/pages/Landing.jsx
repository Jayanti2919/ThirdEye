import React from "react";
import ParticlesComponent from "../components/ParticleComponent";
import "../App.css";
import SideNav from "../components/SideNav";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const nav = useNavigate();
  const handleRedirect = (e, path) => {
    e.preventDefault();
    nav(path);
  };
  return (
    <div className="bg-primary relative z-10">
      <div className="absolute">
        <ParticlesComponent id="tsparticles" />
      </div>
      <div className="h-screen flex items-center px-5 w-screen">
        <SideNav />
        <div className="flex flex-col text-secondary w-full items-center justify-center gap-10">
          <img src="thirdeye_logo_white.svg" alt="thirdeye" />
          <h1 className="uppercase alumni-sans text-5xl leading-[30px]">
            third eye
          </h1>
          <div className="flex gap-10 mt-5">
            <Button
              variant="outlined"
              sx={{
                color: "#9D9FE2",
                border: "1px solid #9D9FE2",
                ":hover": {
                  border: "1px solid #353B64",
                  backgroundColor: "#353B64",
                  color: "#F1EFEF",
                },
              }}
              onClick={(e) => {
                handleRedirect(e, "/login");
              }}
            >
              sign in
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "#9D9FE2",
                border: "1px solid #9D9FE2",
                ":hover": {
                  border: "1px solid #353B64",
                  backgroundColor: "#353B64",
                  color: "#F1EFEF",
                },
              }}
              onClick={(e) => {
                handleRedirect(e, "/register");
              }}
            >
              sign up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
