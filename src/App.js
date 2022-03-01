import React from "react";
import { useLocation } from "react-router-dom";

import "@fontsource/roboto/400.css";

import "./App.css";

import Topnav from "./Components/Topnav/Topnav";
import Sidemenu from "./Components/Sidemenu/Sidemenu";
import ContentRouter from "./Components/ContentRouter";

const App = () => {
  const { pathname } = useLocation();
  return (
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
  );
};

export default App;
