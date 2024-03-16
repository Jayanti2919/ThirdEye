import React, {useState, useEffect} from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import ParticlesComponent from "../components/ParticleComponent";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CreateChannel = () => {
  const nav = useNavigate();
  const loc = useLocation();
  const [channelName, setChannelName] = useState('');
  const [channelDesc, setChannelDesc] = useState('');

  useEffect(() => {
    if (loc.state === null) {
      nav("/register");
    }
  }, []);

  const handleCreateChannel = (e) => {
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_API_URL}/user/updateUser`, { email: loc.state.email, channelName: channelName, channelDesc: channelDesc, profilePic: "" })
      .then((r)=>{
        alert(r.data.message);
        nav('/home')
      }).catch((e)=>{
        console.log(e);
        alert(e);
      })
  };

  return (
    <div className="text-secondary flex items-center justify-center h-screen">
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
      <form
        action=""
        onSubmit={(e) => {
          handleCreateChannel(e);
        }}
        className="bg-secondary opacity-60 w-fit h-fit flex flex-col px-10 py-10 rounded-md shadow-md shadow-tertiary gap-2 items-center justify-center"
      >
        <h2 className="capitalize text-primary text-2xl font-semibold">
          create your channel
        </h2>
        <div className="mt-6 flex flex-col gap-5">
          <TextField
            label="Channel Name"
            onChange={(e)=>{setChannelName(e.target.value)}}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#353B64",
                },
              },
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: "#353B64",
                },
              },
            }}
          />
          <TextField
            label="Channel Description"
            onChange={(e)=>{setChannelDesc(e.target.value)}}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#353B64",
                },
              },
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: "#353B64",
                },
              },
            }}
          />
        </div>
        <Button
          variant="outlined"
          sx={{
            marginTop: "20px",
            color: "#0E0C0D",
            border: "1px solid #0E0C0D",
            ":hover": {
              border: "1px solid #353B64",
              backgroundColor: "#353B64",
              color: "#F1EFEF",
            },
          }}
          type="submit"
        >
          Create Channel
        </Button>
      </form>
    </div>
  );
};

export default CreateChannel;
