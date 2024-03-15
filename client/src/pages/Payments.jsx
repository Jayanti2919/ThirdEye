import React from "react";
import HomeSideNav from "../components/HomeSideNav";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Payments = () => {
  const nav = useNavigate();
  const handleRedirect = (e, path) => {
    e.preventDefault();
    nav(path);
  };
  
  return (
    <div className="bg-primary relative z-10 overflow-x-hidden">
      <div className="absolute h-screen justify-center items-center flex left-10">
        <HomeSideNav />
      </div>
      <div className="h-screen flex items-center px-5 w-screen">
        <div className="flex flex-col text-secondary w-full items-center justify-center gap-10">
          <img src="/thirdeye_logo_white.svg" alt="thirdeye" />
          <h1 className="uppercase alumni-sans text-5xl leading-[30px]">
            Payment Information
          </h1>
          <div className="flex flex-col gap-5 mt-5">
            <input type="text" placeholder="Card Number" className="input-field" />
            <input type="text" placeholder="Name on Card" className="input-field" />
            <input type="text" placeholder="Expiration Date (MM/YYYY)" className="input-field" />
            <input type="text" placeholder="CVV" className="input-field" />
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
                handleRedirect(e, "/payment-confirmation");
              }}
            >
              Pay Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
