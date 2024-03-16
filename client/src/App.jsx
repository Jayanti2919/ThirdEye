import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import LoginPk from "./pages/LoginPk";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Home from "./pages/Home";
import OTPVerification from "./pages/OTPVerification";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import { GetAuthContext, GetAuthUpdateContext } from "./AuthContext";
import LikedVideos from "./components/likedVideos";
import Subscriptions from "./pages/Subscriptions";
import Payments from "./pages/Payments";
import CreateChannel from './pages/CreateChannel';

export default function App() {
  const auth = GetAuthContext();
  // const toggle=GetAuthUpdateContext()
  console.log("app:", auth);
  
  // useEffect(()=>{

  //   toggle()
  //   console.log("use effect:",auth)
  // },[])
  return (
    <div className="min-h-screen bg-primary">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/createChannel" element={auth? <CreateChannel />: <Navigate to='/login'/>} /> */}
        <Route path="/createChannel" element={<CreateChannel />} />
        <Route path="/login/2" element={<LoginPk />} />
        <Route path="/verifyOtp" element={<OTPVerification />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={auth ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route
          path="/home/subscriptions"
          element={auth ? <Subscriptions /> : <Navigate to="/login" />}
        />
        <Route
          path="/home/likedvideos"
          element={auth ? <LikedVideos /> : <Navigate to="/login" />}
        />
        <Route path="/home/payments" element={auth?<Payments />: <Navigate to="/login"/>} />
      </Routes>
      
    </div>
  );
}
