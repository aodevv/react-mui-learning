import React from "react";
import { Routes, Route } from "react-router-dom";

import FileManager from "../pages/FileManager/FileManager";
import Dashboard from "../pages/Dashboard/Dashboard";
import FacturePage from "../pages/FacturesPage/FacturePage";
import FactureForm from "../pages/FacturesForm/FactureForm";

const ContentRouter = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Dashboard />} />
      <Route path="/files" element={<FileManager />} />
      <Route path="/factures" element={<FacturePage />} />
      <Route path="/new" element={<FactureForm />} />
    </Routes>
  );
};

export default ContentRouter;
