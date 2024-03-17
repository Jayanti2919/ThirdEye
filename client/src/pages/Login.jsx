import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ParticlesComponent from "../components/ParticleComponent";
import isValidEmail from "../emailValidator";
import { GetAuthContext } from "../AuthContext";

const Login = ({ setLoginState }) => {
  const [Email, setEmail] = useState("");
  const [open, setOpen] = React.useState(false);
  const auth = GetAuthContext();
  console.log("Login:", auth);
  const nav = useNavigate();
  useEffect(() => {
    if (auth) {
      nav("/home");
    }
  }, [auth]);

  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!isValidEmail(Email)) {
      alert("Invalid email address");
      return;
    }
    setOpen(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}/user/loginOTP`, { email: Email })
      .then((r) => {
        alert(r.data.message);
        if (r.data.message === "OTP sent successfully") {
          setLoginState(true);
          nav("/verifyOtp", {
            state: {
              email: Email,
              cardLabel: "Login",
            },
          });
        } else if (r.data.message === "User not found") {
          nav("/register");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setOpen(false));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="absolute z-20 top-0 left-0 p-5 flex flex-col items-center gap-2 cursor-pointer"
        onClick={(e) => nav("/")}
      >
        <img src="thirdeye_logo_white.svg" alt="logo" className="h-20 w-20" />
        <h1 className="text-secondary uppercase alumni-sans text-xl tracking-[5px] ml-2">
          thirdeye
        </h1>
      </div>
      <div className="absolute">
        <ParticlesComponent id="tsparticles" />
      </div>
      <div className="h-fit w-fit flex items-center justify-center flex-col relative z-20">
        <Card
          cardLabel="Login"
          txtLabel="Email"
          buttonLabel="Send OTP"
          setAction={setEmail}
          handleSubmit={handleSendOTP}
          open={open}
          setOpen={setOpen}
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
  );
};

export default Login;
