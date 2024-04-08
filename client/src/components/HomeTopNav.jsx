import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import SearchRounded from "@mui/icons-material/SearchRounded";
import { Avatar, Button } from "@mui/material";
import { useState } from "react";
import { SettingsApplicationsRounded, FileUploadRounded, AddShoppingCartRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  components: {
    MuiTouchRipple: {
      styleOverrides: {
        root: {
          color: "#F1EFEF",
        },
      },
    },
  },
});

const HomeTopNav = () => {
  const nav = new useNavigate();
  const [profileDetails, setProfileDetails] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <div className="">
        <ul className="grid md:grid-cols-3 grid-cols-2 w-screen pt-5 px-5">
          <li className="md:block hidden"></li>
          <li className="w-full flex gap-1 items-center justify-center text-secondary">
            <input
              type="text"
              className="bg-accent opacity-65 rounded-full w-[90%] h-8 px-5 py-5 focus:outline-none text-primary placeholder-tertiary"
              placeholder="Search"
            />
            <IconButton aria-label="Search">
              <SearchRounded sx={{ color: "#9D9FE2", opacity: "65%" }} />
            </IconButton>
          </li>
          <li className="flex items-center justify-end px-5">
            <div className="cursor-pointer">
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                onClick={() => setProfileDetails(!profileDetails)}
              />
              <div
                className={`bg-secondary text-primary ${
                  profileDetails ? "block" : "hidden"
                } absolute z-10 h-fit px-10 right-5 top-16 rounded-md border-solid border-2 border-primary opacity-90 py-5 flex flex-col  gap-5`}
              >
                <Button
                  sx={{
                    alignItems: "start",
                    justifyContent: "start",
                    color: "#0E0C0D",
                  }}
                  onClick={(e)=>{
                    e.preventDefault();
                    nav("/home/editChannel")
                  }}
                >
                  <SettingsApplicationsRounded sx={{ marginLeft: "5px", marginRight:'10px' }} />
                  <span>Channel Settings</span>
                </Button>
                <Button
                  sx={{
                    alignItems: "start",
                    justifyContent: "start",
                    color: "#0E0C0D",
                  }}
                  onClick={(e) => {e.preventDefault(); nav("/home/uploadVideo")}}
                >
                  <FileUploadRounded sx={{ marginLeft: "5px", marginRight:'10px' }} />
                  <span>Upload Video</span>
                </Button>
                <Button
                  sx={{
                    alignItems: "start",
                    justifyContent: "start",
                    color: "#0E0C0D",
                  }}
                >
                  <AddShoppingCartRounded sx={{ marginLeft: "5px", marginRight:'10px' }} />
                  <span>Buy Eyes</span>
                </Button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </ThemeProvider>
  );
};

export default HomeTopNav;
