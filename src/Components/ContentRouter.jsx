import React from "react";
import { Routes, Route } from "react-router-dom";

import FileManager from "../pages/FileManager/FileManager";
import Dashboard from "../pages/Dashboard/Dashboard";
import FacturePage from "../pages/FacturesPage/FacturePage";
import FactureTypes from "../pages/TypeHandlers/FactureTypes";
import MachinerieTypes from "../pages/TypeHandlers/MachineriesTypes";
import FactureForm from "../pages/FacturesForm/FactureForm";
import MachineriesForm from "../pages/MachineriesForm/MachineriesForm";
import DossierDetails from "../pages/Dossier/DossierDetails";

const ContentRouter = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Dashboard />} />
      <Route path="/files" element={<FileManager />} />
      <Route path="/dossier/:dossierId" element={<DossierDetails />} />
      <Route path="/dossier/:dossierId/:type/">
        <Route path="Factures" element={<FactureTypes />} />
        <Route path="machineries" element={<MachinerieTypes />} />
      </Route>
      <Route path="/dossier/:dossierId/:type/Factures">
        <Route path="new" element={<FactureForm />} />
      </Route>
      <Route path="/dossier/:dossierId/:type/machineries">
        <Route path="new" element={<MachineriesForm />} />
      </Route>
      <Route path="/factures" element={<FacturePage />} />
      <Route path="/new" element={<MachineriesForm />} />
    </Routes>
  );
};

export default ContentRouter;
