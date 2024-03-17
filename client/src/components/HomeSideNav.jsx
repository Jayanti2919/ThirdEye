import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import {
  AccountBalanceWalletRounded,
  SubscriptionsRounded,
  FavoriteRounded,
  LogoutRounded,
  VisibilityRounded,
  AlternateEmailRounded,
  KeyRounded,
  BarChartRounded,
  CurrencyExchangeRounded,
  HomeRounded,
} from "@mui/icons-material";
import { Button } from "@mui/material";

const HomeSideNav = () => {
  const nav = useNavigate();
  const [address, setAddress] = useState("adasda");
  const [publicKey, setPublicKey] = useState("qwe2341rewaseqe24");
  const [eyes, setEyes] = useState(100);
  const [earnings, setEarnings] = useState(20);
  const [spendings, setSpendings] = useState(40);
  const [walletDetails, setWalletDetails] = useState(false);
  const [showEyes, setShowEyes] = useState(false);

  let details = [
    {
      icon: <AlternateEmailRounded />,
      title: "Wallet Address",
      value: address,
    },
    {
      icon: <KeyRounded />,
      title: "Public Key",
      value: publicKey,
    },
    {
      icon: <VisibilityRounded />,
      title: "EYE",
      value: eyes,
    },
    {
      icon: <BarChartRounded />,
      title: "Earnings in EYE",
      value: earnings,
    },
    {
      icon: <CurrencyExchangeRounded />,
      title: "Spending in EYE",
      value: spendings,
    },
  ];
  const handleNavigation = (path) => {
    nav(path);
  };
  return (
    <div className="text-primary cursor-pointer fixed z-20 h-[90vh] w-14 px-2 rounded-full py-10 bg-secondary hidden md:block opacity-60">
      <ul className="flex flex-col justify-between h-full py-5 text-[10px] items-center">
        <li>
          {" "}
          <Tooltip title="Home">
            <IconButton onClick={() => handleNavigation("/home")}>
              <HomeRounded />
            </IconButton>
          </Tooltip>
        </li>
        <li className="relative">
          <Tooltip title="Wallet">
            <IconButton
              onClick={() => {
                setWalletDetails(!walletDetails);
                setShowEyes(false);
              }}
            >
              <AccountBalanceWalletRounded />
            </IconButton>
          </Tooltip>
          <div
            className={`${
              walletDetails
                ? "absolute bg-secondary h-50 w-[20vw] xl:px-10 rounded-md left-[140%] border-2 border-primary z-20 -top-10 p-5 text-primary"
                : "hidden"
            }`}
          >
            <div className="">
              <h3 className="text-xl text-primary font-semibold capitalize">
                wallet details
              </h3>
              {details.map((detail, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center my-2"
                >
                  <div className="flex gap-2 items-center">
                    {detail.icon}
                    <p className="capitalize">{detail.title}</p>
                  </div>
                  <p className="font-medium ml-2">{detail.value}</p>
                </div>
              ))}
              
              <Button
                variant="outlined"
                size="small"
                sx={{
                  color: "#9D9FE2",
                  border: "1px solid #9D9FE2",
                  padding: "2px 5px",
                  fontSize: "10px",
                  marginTop: "5px",
                  ":hover": {
                    border: "1px solid #353B64",
                    backgroundColor: "#353B64",
                    color: "#F1EFEF",
                  },
                }}
                onClick={(e)=>{e.preventDefault();nav('/home/payments')}}
              >
                Buy More
              </Button>
            </div>
          </div>
        </li>
        <li>
          {" "}
          <Tooltip title="Subscriptions">
            <IconButton onClick={() => handleNavigation("/home/subscriptions")}>
              <SubscriptionsRounded />
            </IconButton>
          </Tooltip>
        </li>
        <li>
          {" "}
          <Tooltip title="Liked Videos">
            <IconButton onClick={() => handleNavigation("/home/likedvideos")}>
              <FavoriteRounded />
            </IconButton>
          </Tooltip>
        </li>
        <li className="relative">
          {" "}
          <Tooltip title="EYE">
            <IconButton onClick={() => {setShowEyes(!showEyes); setWalletDetails(false)}}>
              <VisibilityRounded />
            </IconButton>
          </Tooltip>
          <div
            className={`${
              showEyes
                ? "absolute bg-secondary h-50 w-[20vw] xl:px-10 rounded-md left-[140%] border-2 border-primary z-20 top-0 p-5 text-primary"
                : "hidden"
            }`}
          >
            <div className="">
              <h3 className="text-xl text-primary font-semibold uppercase">
                eyes
              </h3>
              <div className="flex justify-between items-center my-2">
                <div className="flex gap-2 items-center text-md">
                  <VisibilityRounded />
                  <p className="capitalize">EYE</p>
                </div>
                <p className="font-medium">{eyes}</p>
              </div>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  color: "#9D9FE2",
                  border: "1px solid #9D9FE2",
                  padding: "2px 5px",
                  fontSize: "10px",
                  ":hover": {
                    border: "1px solid #353B64",
                    backgroundColor: "#353B64",
                    color: "#F1EFEF",
                  },
                }}
                onClick={(e)=>{e.preventDefault();nav('/home/payments')}}
              >
                Buy More
              </Button>
            </div>
          </div>
        </li>
        <li>
          {" "}
          <Tooltip title="Sign Out">
            <IconButton onClick={() => handleNavigation("/login")}>
              <LogoutRounded />
            </IconButton>
          </Tooltip>
        </li>
      </ul>
    </div>
  );
};

export default HomeSideNav;
