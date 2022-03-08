import React from "react";
import InfosDossierForm from "../../../Components/Forms/InfoDossier/InfosDossierForm";
import { Typography } from "@mui/material";

const stepsFull = [
  "Infos dossier",
  "Dommages aux biens",
  "Mesures préventives temporaires",
  "Mesures d'intervention",
];

const SelectStep = ({ step }) => {
  switch (step) {
    case 0:
      return <InfosDossierForm />;

    default:
      return <Typography>Comming soon</Typography>;
  }
};

export default SelectStep;
