import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ParticlesComponent from "../components/ParticleComponent";
import {GetAuthContext, GetAuthUpdateContext} from '../AuthContext'

const Register = () => {
  const [Email, setEmail] = useState("");
  const nav = useNavigate();
  const auth=GetAuthContext()
  const updateAuth=GetAuthUpdateContext()
  console.log(auth)
  const handleSendOTP = async (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/register/sendOTP`, {
        email: Email,
      })
      .then((r) => {
        alert(r.data.message);
        if (r.data.message === "OTP sent successfully") {
          nav("/verifyOtp", {
            state: {
              email: Email,
              cardLabel: "Register",
            },
          });
        } 
      })
      .catch((e) => {
        if(e.response.status===409){
          alert('User already registered')
          nav('/login')
        } else {
          alert(r.data.message)
          setEmail('')
        }
      });
  };

  useEffect(() => {
    if(auth){
      nav('/home')
    } 
  },[auth])

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="absolute z-20 top-0 left-0 p-5 flex flex-col items-center gap-2 cursor-pointer" onClick={(e)=>nav('/')}>
        <img src="thirdeye_logo_white.svg" alt="" className="h-20 w-20"/>
        <h1 className="text-secondary uppercase alumni-sans text-xl tracking-[5px] ml-2">thirdeye</h1>
      </div>
      <div className="absolute">
        <ParticlesComponent id="tsparticles" />
      </div>
      <div className="h-fit w-fit flex items-center justify-center flex-col relative z-20">
        <Card
          cardLabel="Register"
          txtLabel="Email"
          buttonLabel="Send OTP"
          setAction={setEmail}
          handleSubmit={handleSendOTP}
        />
        <span
          className="text-secondary cursor-pointer hover:text-[#9D9FE2]"
          onClick={(e) => {
            e.preventDefault();
            nav("/login");
          }}
        >
          Already registered?
        </span>
        <span 
        className="text-secondary cursor-pointer hover:text-[#9D9FE2]"
        onClick={(e)=>{
          e.preventDefault()
          updateAuth()
          console.log(auth)
        }}>hii change auth</span>
      </div>
    </div>
  );
};

export default Register;
