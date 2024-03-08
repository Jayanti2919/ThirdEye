import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import axios from "axios";

const Register = () => {
  const [Email, setEmail] = useState("")
  const handleSendOTP=async(e)=>{
    e.preventDefault()
    console.log(Email)
    axios.post('http://localhost:8080/user/RegisterOTP',{email:Email}).then((r)=>console.log(r)).catch((e)=>console.log(e))
  }

  return (
    <div className="text-primary flex justify-center items-center h-screen p-10 md:px-24">
      <div className="h-fit w-full lg:w-[30%] bg-secondary opacity-80 font-poppins p-10 flex flex-col rounded-lg gap-7 items-center">
        <h2 className="text-2xl font-semibold ">Register</h2>
        <form className="w-full flex justify-center items-center flex-col gap-4">
          <TextField id="outlined-basic" label="Email" variant="outlined" color="secondary" size="medium" sx={{ width: '70%' }}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
          />
          <Button variant="contained" color='secondary' sx={{ width: '70%' }}
          onClick={handleSendOTP}
          >Send OTP</Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
