import React, { useState } from "react";
import Card from '../components/Card'
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [Email, setEmail] = useState("")
  const nav = useNavigate()
  const handleSendOTP = async (e) => {
    e.preventDefault()
    axios.post(`${import.meta.env.VITE_API_URL}/register/sendOTP`, { email: Email }).then((r) => {
      alert(r.data.message)
      if (r.data.message === 'OTP sent successfully') {
        nav('/verifyOtp', {
          state: {
            email: Email,
            cardLabel: "Register"
          }
        }
        )
      }
    }).catch((e) => console.log(e))
  }

  return (
    <div className="h-screen flex items-center justify-center flex-col">

      <Card cardLabel="Register" txtLabel="Email" buttonLabel="Send OTP" setAction={setEmail} handleSubmit={handleSendOTP} />
      <span className="text-secondary cursor-pointer hover:text-[#ffffff]" onClick={(e)=>{
        e.preventDefault()
        nav("/login")
      }}>Already registered?</span>
    </div>
  );
};

export default Register;
