import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";

const Card = ({
  cardLabel,
  txtLabel,
  buttonLabel,
  setAction,
  handleSubmit,
  open,
  setOpen
}) => {
  
  return (
    <div className="text-primary flex justify-center items-center h-fit w-full m-10 md:px-24">
      <div className="h-fit w-full lg:w-full bg-secondary opacity-60 font-poppins py-20 flex flex-col rounded-lg gap-7 items-center">
        <h2 className="text-2xl font-semibold ">{cardLabel}</h2>
        <form className="w-full flex justify-center items-center flex-col gap-4 mt-5">
          <TextField
            id="outlined-basic"
            label={txtLabel}
            variant="outlined"
            size="medium"
            sx={{
              width: "70%",
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#353B64',
                },
              },
              '& .MuiInputLabel-root': {
                '&.Mui-focused': {
                  color: '#353B64',
                },
              },
            }}
            onChange={(e) => {
              setAction(e.target.value);
            }}
          />
          
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
          <div className={open?"block":"hidden"}>
            <CircularProgress color="inherit"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Card;
