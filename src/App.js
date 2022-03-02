import React from "react";
import { useLocation } from "react-router-dom";

import "@fontsource/roboto/400.css";

import "./App.css";

import Topnav from "./Components/Topnav/Topnav";
import Sidemenu from "./Components/Sidemenu/Sidemenu";
import ContentRouter from "./Components/ContentRouter";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { frFR } from "@mui/material/locale";

const App = () => {
  const { pathname } = useLocation();
  const theme = createTheme(
    {
      palette: {
        mode: "light",
      },
    },
    frFR
  );
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="App__top">
          <Topnav />
        </div>
        <div className="App__bottom">
          <div className="sidemenu">
            <Sidemenu pathname={pathname.split("/")[1]} />
          </div>
          <div className="content">
            <ContentRouter />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
