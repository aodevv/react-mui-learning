import React from "react";
import { Routes, Route } from "react-router-dom";

import FileManager from "../pages/FileManager/FileManager";
import Dashboard from "../pages/Dashboard/Dashboard";

const ContentRouter = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Dashboard />} />
      <Route path="/files" element={<FileManager />} />
    </Routes>
  );
};

export default ContentRouter;
