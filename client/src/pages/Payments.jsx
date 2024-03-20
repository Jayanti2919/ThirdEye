import React from "react";
import HomeSideNav from "../components/HomeSideNav";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';

const Payments = () => {
  const nav = useNavigate();
  const handleRedirect = (e, path) => {
    e.preventDefault();
    nav(path);
  };

  return (
    <div className="bg-primary relative z-10 overflow-x-hidden">
      <div className="absolute inset-0">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay loop muted>
          <source
            src="/payment-bg-vid.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="absolute h-screen justify-center items-center flex left-10 px-5">
        <HomeSideNav />
      </div>
      <div className="h-fit md:h-screen w-screen flex justify-center items-center py-10 px-4 md:pr-10 md:pl-40">

        <div className=" h-[200vh] md:h-full w-full bg-white-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border-2 border-accent border-opacity-20 grid md:grid-cols-2">
          <div className="">hii</div>
          <div className="flex items-center justify-end md:py-52 lg:py-10 md:pr-10 lg:pl-52 ">
            <div className=" h-[50vh] md:h-full w-full rounded-xl grid grid-cols-3 px-3 md:px-0 opacity-85 shadow">
              <div className="h-[80vh] md:h-full bg-[#181818] text-secondary col-span-2 rounded-s-xl grid grid-rows-2">
                <div className=" flex flex-col justify-center items-center gap-7">

                  <h3 className="font-bold uppercase">Channel Name</h3>
                  <TextField
                    id="outlined-required"
                    label="Private Key"
                    variant="outlined"
                    sx={{
                      width: "70%",
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#FFF', // Border color for default state in dark mode
                          opacity: 0.5
                        },
                        '&:hover fieldset': {
                          borderColor: '#FFF', // Border color for hover state in dark mode
                          opacity: 1
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#D9D9D9',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#FFF', // Label color in dark mode
                      },
                      '& .MuiInputBase-input': {
                        color: '#FFF', // Text color in dark mode
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FFF', // Border color for focused state in dark mode
                      },
                      '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                        color: '#FFF', // Color when label is shrunk in dark mode
                      },
                      '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
                        color: '#A0A0A0', // Placeholder color in dark mode
                      },
                      '& .MuiOutlinedInput-input:-ms-input-placeholder': {
                        color: '#A0A0A0', // Placeholder color in dark mode for Internet Explorer/Edge
                      },
                      '& .MuiOutlinedInput-input::-ms-input-placeholder': {
                        color: '#A0A0A0', // Placeholder color in dark mode for Microsoft Edge
                      },
                      '& .MuiOutlinedInput-input::-moz-placeholder': {
                        color: '#A0A0A0', // Placeholder color in dark mode for Mozilla Firefox
                      },
                      '& .MuiOutlinedInput-input:-moz-placeholder': {
                        color: '#A0A0A0', // Placeholder color in dark mode for Mozilla Firefox
                      },

                    }}
                  />

                </div>
                <div className="flex justify-center items-center">
                  <div className="border-accent border-2 border-dashed h-20 w-20 "></div>
                </div>
              </div>
              <div className="bg-primary border-l-2 border-opacity-35 border-accent rounded-e-xl grid text-secondary">
                <div className="grid justify-center items-center pt-10">
                  <div className="h-10 w-10 rounded-full bg-accent flex justify-center items-center">
                    <ShoppingCartCheckoutRoundedIcon />
                  </div>
                </div>
                <div className="flex flex-col-reverse items-end pb-10">
                  <h1 className="uppercase rotate-90">thirdeye</h1>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Payments;