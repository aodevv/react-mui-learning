import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import "@fontsource/roboto/400.css";

import "./App.css";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import Topnav from "./Components/Topnav/Topnav";
import Sidemenu from "./Components/Sidemenu/Sidemenu";
import ContentRouter from "./Components/ContentRouter";
import BreadCrumb from "./Components/BreadCrumb/BreadCrumb";
import Collapse from "@mui/material/Collapse";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { frFR } from "@mui/material/locale";

const navWidth = {
  "@media (max-width: 1366px)": {
    position: "fixed",
    zIndex: 22,
  },
};

const App = () => {
  const [sideNav, setSideNav] = useState(false);
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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <div className="App__top">
            <Topnav sideNav={sideNav} setSideNav={setSideNav} />
          </div>
          <div className="App__bottom">
            <Collapse sx={navWidth} orientation="horizontal" in={sideNav}>
              {
                <div className="sidemenu">
                  <Sidemenu pathname={pathname.split("/")[1]} />
                </div>
              }
            </Collapse>

            <div className="content">
              <BreadCrumb />
              <ContentRouter />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default App;
