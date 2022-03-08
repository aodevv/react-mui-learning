import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Box, Typography } from "@mui/material";

import MyStepper from "../../Components/Stepper/Stepper";
import SelectStep from "./SelectStep/SelectStep";

const steps = ["Infos dossier", "DAB", "MPT", "MI"];
const stepsFull = [
  "Infos dossier",
  "Dommages aux biens",
  "Mesures préventives temporaires",
  "Mesures d'intervention",
];

const NouveauDossier = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return [1, 2, 3].includes(step);
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const renderSwitch = (param) => {
    switch (param) {
      case 0:
        return <Typography>Infos dossier</Typography>;
      case 1:
        return <Typography>DAB</Typography>;
      case 2:
        return <Typography>MPT</Typography>;
      case 3:
        return <Typography>MI</Typography>;
      default:
        return "Submited";
    }
  };

  return (
    <Grid>
      <Card>
        <CardContent>
          <MyStepper
            steps={steps}
            handleNext={handleNext}
            handleBack={handleBack}
            handleSkip={handleSkip}
            handleReset={handleReset}
            activeStep={activeStep}
            isStepSkipped={isStepSkipped}
            isStepOptional={isStepOptional}
          />
        </CardContent>
      </Card>
      <Box mt={2}>
        <SelectStep step={activeStep} />
      </Box>
    </Grid>
  );
};

export default NouveauDossier;
