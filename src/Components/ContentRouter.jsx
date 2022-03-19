import React from "react";
import { Routes, Route } from "react-router-dom";

import FileManager from "../pages/FileManager/FileManager";
import Dashboard from "../pages/Dashboard/Dashboard";
import FacturePage from "../pages/FacturesPage/FacturePage";
import SalairesPage from "../pages/SalairesPage/SalairesPage";
import MachineriePage from "../pages/MachineriePage/MachineriePage";
import FactureTypes from "../pages/TypeHandlers/FactureTypes";
import MachinerieTypes from "../pages/TypeHandlers/MachineriesTypes";
import DossierDetails from "../pages/Dossier/DossierDetails";
import SalairesTypes from "../pages/TypeHandlers/SalairesTypes";
import NouveauDossier from "../pages/NouveauDossier/NouveauDossier";
import ExistingDossier from "../pages/ExistingDossier/ExistingDossier";

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
      <Route path="/salaires" element={<SalairesPage />} />
      <Route path="/machineries" element={<MachineriePage />} />
      <Route path="/testing" element={<NouveauDossier />} />
      <Route path="/testing2" element={<ExistingDossier />} />
    </Routes>
  );
};

export default ContentRouter;
