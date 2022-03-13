import React from "react";
import { Routes, Route, Redirect } from "react-router-dom";

import FileManager from "../pages/FileManager/FileManager";
import Dashboard from "../pages/Dashboard/Dashboard";
import FacturePage from "../pages/FacturesPage/FacturePage";
import FactureTypes from "../pages/TypeHandlers/FactureTypes";
import MachinerieTypes from "../pages/TypeHandlers/MachineriesTypes";
import DossierDetails from "../pages/Dossier/DossierDetails";
import SalairesTypes from "../pages/TypeHandlers/SalairesTypes";
import NouveauDossier from "../pages/NouveauDossier/NouveauDossier";

// testing
const ContentRouter = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Dashboard />} />
      <Route path="/dossier" element={<FileManager />} />
      <Route path="/dossier/:dossierId" element={<DossierDetails />} />
      <Route path="/dossier/:dossierId/:type/">
        <Route path="Factures" element={<FactureTypes />} />
        <Route path="machineries" element={<MachinerieTypes />} />
        <Route path="salaires" element={<SalairesTypes />} />
      </Route>
      <Route path="/factures" element={<FacturePage />} />
      <Route path="/testing" element={<NouveauDossier />} />
    </Routes>
  );
};

export default ContentRouter;
