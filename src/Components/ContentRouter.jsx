import React from "react";
import { Routes, Route } from "react-router-dom";

import FileManager from "../pages/FileManager/FileManager";
import Dashboard from "../pages/Dashboard/Dashboard";
import FacturePage from "../pages/FacturesPage/FacturePage";
import SalairesPage from "../pages/SalairesPage/SalairesPage";
import MachineriePage from "../pages/MachineriePage/MachineriePage";
import SitesPage from "../pages/SitesPage/SitesPage";
import FactureTypes from "../pages/TypeHandlers/FactureTypes";
import MachinerieTypes from "../pages/TypeHandlers/MachineriesTypes";
import SalairesTypes from "../pages/TypeHandlers/SalairesTypes";
import NouveauDossier from "../pages/NouveauDossier/NouveauDossier";
import ExistingDossier from "../pages/ExistingDossier/ExistingDossier";
import Finance from "../pages/Finance/Finance";

// testing
const ContentRouter = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Dashboard />} />
      <Route path="/dossier" element={<FileManager />} />
      <Route path="/dossier/:dossierId" element={<ExistingDossier />} />
      <Route path="/dossier/:dossierId/:type/">
        <Route path="Factures" element={<FactureTypes />} />
        <Route path="machineries" element={<MachinerieTypes />} />
        <Route path="salaires" element={<SalairesTypes />} />
      </Route>
      <Route path="/factures" element={<FacturePage />} />
      <Route path="/salaires" element={<SalairesPage />} />
      <Route path="/sites" element={<SitesPage />} />
      <Route path="/machineries" element={<MachineriePage />} />
      <Route path="/nouveau_dossier" element={<NouveauDossier />} />
      <Route path="/finance" element={<Finance />} />
      <Route path="/testing" element={<NouveauDossier />} />
    </Routes>
  );
};

export default ContentRouter;
