import React, { useState } from "react";
import Card from '../components/Card'
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [Email, setEmail] = useState("")
  const nav = useNavigate()
  const handleSendOTP = async (e) => {
    e.preventDefault()
    axios.post(`${import.meta.env.VITE_API_URL}/user/loginOTP`, { email: Email }).then((r) => {
      alert(r.data.message)
      if (r.data.message === 'OTP sent successfully') {
        nav('/verifyOtp', {
          state: {
            email: Email,
            cardLabel: "Login"
          }
        }
        )
      } else if (r.data.message === 'User not found') {
        nav('/register')
      }
    }).catch((e) => console.log(e))
  }

  return (
    <div className="h-screen flex items-center justify-center flex-col">

      <Card cardLabel="Login" txtLabel="Email" buttonLabel="Send OTP" setAction={setEmail} handleSubmit={handleSendOTP} />
      <span className="text-secondary cursor-pointer hover:text-[#ffffff]" onClick={(e)=>{
        e.preventDefault()
        nav("/register")
      }}>Not registered yet?</span>
    </div>

  );
};

export default Login;
