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

const SideNav = () => {
  return (
    <div className="text-primary cursor-pointer relative z-20 h-[90vh] w-14 px-2 rounded-full py-10 bg-secondary opacity-60">
      <ul className="flex flex-col justify-between h-full py-5 text-[10px] items-center uppercase">
        <li>
          <Tooltip title="Home">
            <IconButton>
              <HomeRounded />
            </IconButton>
          </Tooltip>
        </li>
        <li>
          {" "}
          <Tooltip title="Features">
            <IconButton>
              <InfoRounded />
            </IconButton>
          </Tooltip>
        </li>
        <li>
          {" "}
          <Tooltip title="Pricing">
            <IconButton>
              <CurrencyExchangeRounded />
            </IconButton>
          </Tooltip>
        </li>
        <li>
          {" "}
          <Tooltip title="Login">
            <IconButton>
              <LoginRounded />
            </IconButton>
          </Tooltip>
        </li>
        <li>
          {" "}
          <Tooltip title="Register">
            <IconButton>
              <HowToRegRounded />
            </IconButton>
          </Tooltip>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
