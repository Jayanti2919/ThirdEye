import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import SearchRounded from "@mui/icons-material/SearchRounded";
import { Avatar } from "@mui/material";

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
  return (
    <ThemeProvider theme={theme}>
      <div className="">
        <ul className="grid md:grid-cols-3 grid-cols-2 w-screen pt-5 px-5">
          <li className="md:block hidden"></li>
          <li className="w-full flex gap-1 items-center justify-center text-secondary">
            <input
              type="text"
              className="bg-accent opacity-65 rounded-full w-[90%] h-8 px-5 py-3 focus:outline-none text-primary placeholder-tertiary"
              placeholder="Search"
            />
            <IconButton aria-label="Search">
              <SearchRounded sx={{ color: "#9D9FE2", opacity: "65%" }} />
            </IconButton>
          </li>
          <li className="flex items-center justify-end px-5">
            <div className="cursor-pointer">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </div>
          </li>
        </ul>
      </div>
    </ThemeProvider>
  );
};

export default HomeTopNav;
