import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import "@fontsource/roboto/400.css";

import "./App.css";

import Topnav from "./Components/Topnav/Topnav";
import Sidemenu from "./Components/Sidemenu/Sidemenu";
import ContentRouter from "./Components/ContentRouter";
import Collapse from "@mui/material/Collapse";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { frFR } from "@mui/material/locale";

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
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="App__top">
          <Topnav sideNav={sideNav} setSideNav={setSideNav} />
        </div>
        <div className="App__bottom">
          <Collapse orientation="horizontal" in={sideNav}>
            {
              <div className="sidemenu">
                <Sidemenu pathname={pathname.split("/")[1]} />
              </div>
            }
          </Collapse>

          <div className="content">
            <ContentRouter />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
