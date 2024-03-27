import React, { useState,useEffect } from "react";
import CardPassword from "../components/CardPassword";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ParticlesComponent from "../components/ParticleComponent";
import { setCookie } from "../utils/cookies";

const LoginPk = ({loginState}) => {
    const nav=useNavigate()
    const loc=useLocation()
    const [pk, setPk] = useState("")
    const handleChange=(e=>{
        setPk(e.target.value)
    })
    useEffect(() => {
      console.log(loc.state)
      if (loc.state === null) {
        nav("/login");
      }
    }, []);
    const handleSubmit= (e=>{
        e.preventDefault()
        setCookie(loc.state.email,pk).then(r=>{
          
        }).catch(e=>console.log(e))
        
    })
    useEffect(()=>{
        if(!loginState){
            nav('/login')
        }
    },[])
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="absolute z-20 top-0 left-0 p-5 flex flex-col items-center gap-2 cursor-pointer"
        onClick={(e) => nav("/")}
      >
        <img src="/thirdeye_logo_white.svg" alt="logo" className="h-20 w-20" />
        <h1 className="text-secondary uppercase alumni-sans text-xl tracking-[5px] ml-2">
          thirdeye
        </h1>
      </div>
      <div className="absolute">
        <ParticlesComponent id="tsparticles" />
      </div>
      <div className="h-fit w-fit flex items-center justify-center flex-col relative z-20">
        <CardPassword 
        cardLabel="Login"
        txtLabel="Private Key"
        buttonLabel="Sign with Private Key"
        setAction={handleChange}
        handleSubmit={handleSubmit}
        />
        <span
          className="text-secondary cursor-pointer hover:text-[#9D9FE2]"
          onClick={(e) => {
            e.preventDefault();
            nav("/register");
          }}
        >
          Not registered yet?
        </span>
        
      </div>
    </div>
  )
}

export default LoginPk