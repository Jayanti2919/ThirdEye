import React, { useState } from "react";
import Button from "@mui/material/Button";
import {  InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const CardPassword = ({
  cardLabel,
  txtLabel,
  buttonLabel,
  setAction,
  handleSubmit,
  value
}) => {
    const [show, setShow] = useState(false)
  return (
    <div className="text-primary flex justify-center items-center h-fit w-full m-10 md:px-24">
      <div className="h-fit w-full lg:w-full bg-secondary opacity-60 font-poppins py-20 flex flex-col rounded-lg gap-7 items-center">
        <h2 className="text-2xl font-semibold ">{cardLabel}</h2>
        <form className="w-full flex justify-center items-center flex-col gap-4 mt-5">
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              {txtLabel}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={show ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={(e)=>{
                        e.preventDefault()
                        setShow(!show)
                    }}
                    edge="end"
                  >
                    {show ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              value={value}
              onChange={setAction}
              label="Password"
            />
          </FormControl>

          <Button
            variant="outlined"
            sx={{
              color: "#0E0C0D",
              border: "1px solid #0E0C0D",
              ":hover": {
                border: "1px solid #353B64",
                backgroundColor: "#353B64",
                color: "#F1EFEF",
              },
            }}
            onClick={handleSubmit}
          >
            {buttonLabel}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CardPassword;
