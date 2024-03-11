import React,{useEffect} from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Home from "./pages/Home";
import OTPVerification from "./pages/OTPVerification";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import { GetAuthContext,GetAuthUpdateContext } from "./AuthContext";

export default function App() {
  const auth=GetAuthContext()
  const toggle=GetAuthUpdateContext()
  console.log("app:" ,auth)
  useEffect(()=>{
    
    toggle()
    console.log("use effect:",auth)
  },[])
  return (
      <div className="min-h-screen bg-primary">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verifyOtp" element={<OTPVerification />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={auth?<Home />:<Navigate to='/login' replace/>} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </div>
  );
}
