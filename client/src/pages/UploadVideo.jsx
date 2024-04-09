import React, { useState, useEffect } from "react";
import HomeTopNav from "../components/HomeTopNav";
import HomeSideNav from "../components/HomeSideNav";
import { TextField, Input } from "@mui/material";
import Selector from "../components/Selector";
import { CloseRounded } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Cookies from "js-cookie";
import axios from "axios";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UploadVideo = () => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const [email, setEmail] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [videoHash, setVideoHash] = useState("");
  const [thumbnailHash, setThumbnailHash] = useState("");
  const [isVideoUploaded, setIsVideoUploaded] = useState(false);

  useEffect(() => {

    const cookie=JSON.parse(Cookies.get('myCookie'))
    if(cookie){
      setEmail(cookie.email)
    }
  }, []);

  const handleSubmit=() => {
  
      const formData = new FormData();
      formData.append("video", videoFile);
      formData.append("thumbnail", thumbnailFile);
      
      axios
        .post("http://localhost:8000/uploadToIPFS", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          setVideoHash(response.data.cid);
          setThumbnailHash(response.data.cidThumbnail);
          // handleUpdateDetails();
        })
        .catch((error) => {
          console.error(error);
        });
    
  }
  useEffect(() => {
    handleUpdateDetails();
  },[thumbnailHash])

  const handleUpdateDetails=()=>{
    console.log(title, desc, genre, tags, videoHash, thumbnailHash);
    axios.post(`${import.meta.env.VITE_API_URL}/video/uploadVideo`, {
      title: title,
      description: desc,
      genre: genre,
      tags: tags,
      videoHash: videoHash,
      thumbnailHash: thumbnailHash,
      email: email,
    }).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }
  return (
    <div className="text-secondary overflow-x-hidden">
      <div className="absolute h-screen justify-center items-center flex left-10 px-5">
        <HomeSideNav />
      </div>
      <div>
        <HomeTopNav />
      </div>
      <div className="h-fit md:h-screen w-screen flex justify-center items-center px-4 md:pr-10 md:pl-40 mb-10">
        <div className="h-fit flex justify-between w-full border-[1px] border-accent mt-10 py-10 px-10 bg-secondary bg-opacity-10">
          <form action="" className="mt-10 flex flex-col gap-5">
            <h2 className="text-2xl uppercase tracking-[10px] font-semibold">
              upload a video
            </h2>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              onChange={(e)=>{setTitle(e.target.value)}}
              size="medium"
              sx={{
                "& .MuiInputBase-input": {
                  color: "#F1EFEF",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#9D9FE2",
                  },
                  fieldset: {
                    borderColor: "#F1EFEF",
                  },
                  "&:hover fieldset": {
                    borderColor: "#9D9FE2",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#9D9FE2",
                  },
                  "&.MuiInputLabel-outlined": {
                    color: "#F1EFEF",
                  },
                },
              }}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              onChange={(e)=>{setDescription(e.target.value)}}
              multiline
              maxRows={4}
              variant="filled"
              size="medium"
              sx={{
                "& .MuiInputBase-input": {
                  color: "#F1EFEF",
                },
                ".css-phksla-MuiInputBase-root-MuiFilledInput-root::after": {
                  borderBottom: "1px solid #9D9FE2",
                },
                "& .MuiFilledInput-root": {
                  "&:hover": {
                    borderBottomColor: "#9D9FE2",
                  },
                  "&.Mui-focused": {
                    borderBottomColor: "#9D9FE2",
                  },
                  "&.Mui-focused:hover": {
                    borderBottomColor: "#9D9FE2",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#9D9FE2",
                  },
                  "&.MuiInputLabel-filled": {
                    color: "#F1EFEF",
                  },
                },
              }}
            />

            <div className="">
              <Selector genre={genre} setGenre={setGenre}/>
            </div>

            <TextField
              id="outlined-basic"
              label="Tags"
              variant="outlined"
              size="medium"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  if (tags.length >= 5) return;
                  setInputValue(inputValue.trim());
                  if (inputValue === "" || inputValue === " ") return;
                  if (tags.includes(inputValue)) return;
                  setTags([...tags, inputValue]);
                  setInputValue("");
                }
              }}
              sx={{
                "& .MuiInputBase-input": {
                  color: "#F1EFEF",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#9D9FE2",
                  },
                  fieldset: {
                    borderColor: "#F1EFEF",
                  },
                  "&:hover fieldset": {
                    borderColor: "#9D9FE2",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#9D9FE2",
                  },
                  "&.MuiInputLabel-outlined": {
                    color: "#F1EFEF",
                  },
                },
              }}
            />
            <div className="flex gap-2">
              <span className="text-secondary opacity-50">Tags added: </span>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-accent bg-tertiary px-2 py-1 rounded-md cursor-pointer group flex"
                  onClick={(e) => {
                    e.preventDefault();
                    setTags(tags.filter((tagItem) => tagItem !== tag));
                  }}
                >
                  <div className={`hidden group-hover:block`}>
                    <CloseRounded sx={{ fontSize: "16px" }} />
                  </div>
                  {tag}
                </span>
              ))}
            </div>
            <span
              className={`${tags.length < 5 ? "hidden" : "block"} text-warn`}
            >
              Maximum of 5 tags allowed!
            </span>
          </form>
          <form action="" className="flex flex-col px-20 gap-10">
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{
                backgroundColor: "#9D9FE2",
              }}
            >
              Upload video file
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                  e.preventDefault();
                  setVideoFile(e.target.files[0]);
                  setIsVideoUploaded(true);
                }}
              />
            </Button>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{
                backgroundColor: "#9D9FE2",
              }}
            >
              Upload thumbnail file
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                  e.preventDefault();
                  setIsVideoUploaded(true);
                  setThumbnailFile(e.target.files[0]);
                }}
              />
            </Button>
            <span
              className={`text-warn ${isVideoUploaded ? "block" : "hidden"}`}
            >
              If you upload this image, it will be stored on IPFS forever with
              no guaranteeed way of deleting it in the future. Please be wise
              with what you upload.
            </span>
            <Button variant="contained" onClick={handleSubmit}>
              Upload Video and Thumbnail files
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
