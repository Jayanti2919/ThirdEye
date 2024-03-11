import React from "react";
import {
  HomeRounded,
  InfoRounded,
  CurrencyExchangeRounded,
  LoginRounded,
  HowToRegRounded,
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

const SideNav = () => {
  const nav = useNavigate();

  const handleNavigation = (path) => {
    nav(path);
  };
  return (
    <div className="text-primary cursor-pointer fixed z-20 h-[90vh] w-14 px-2 rounded-full py-10 bg-secondary hidden md:block opacity-60">
      <ul className="flex flex-col justify-between h-full py-5 text-[10px] items-center uppercase">
        <li>
          <Tooltip title="Home">
            <IconButton onClick={() => handleNavigation("/")}>
              <HomeRounded />
            </IconButton>
          </Tooltip>
        </li>
        <li>
          {" "}
          <Tooltip title="Features">
            <IconButton onClick={() => handleNavigation("/features")}>
              <InfoRounded />
            </IconButton>
          </Tooltip>
        </li>
        <li>
          {" "}
          <Tooltip title="Pricing">
            <IconButton onClick={() => handleNavigation("/pricing")}>
              <CurrencyExchangeRounded />
            </IconButton>
          </Tooltip>
        </li>
        <li>
          {" "}
          <Tooltip title="Sign In">
            <IconButton onClick={() => handleNavigation("/login")}>
              <LoginRounded />
            </IconButton>
          </Tooltip>
        </li>
        <li>
          {" "}
          <Tooltip title="Sign Up">
            <IconButton onClick={() => handleNavigation("/register")}>
              <HowToRegRounded />
            </IconButton>
          </Tooltip>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
