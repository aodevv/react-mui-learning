import React, { useState } from "react";

// FORMIK and YUP
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Box, Typography, Button } from "@mui/material";

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
  const [currSubmit, setCurrSubmit] = useState(null);

  const INITIAL_FORM_STATE = {
    infosDossier: {
      id: "",
      date_ev: "",
      date_ouv: "",
      desc_doss: "",
      act_of: "",
      prgm: "",
    },
    dab: {
      factures: [],
      salaires: [],
      machineries: [],
    },
    mpt: {
      factures: [],
      salaires: [],
      machineries: [],
    },
    mi: {
      factures: [],
      salaires: [],
      machineries: [],
    },
  };

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

    submitCurrent();
    console.log("Before submit:", activeStep);
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

  const submitCurrent = () => {
    switch (activeStep) {
      case 0:
        setCurrSubmit(0);
        break;

      default:
        break;
    }
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

  const handleSubmit = (values) => {
    console.log("GLOBAL");
    console.log(values);
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
      <Formik initialValues={{ ...INITIAL_FORM_STATE }} onSubmit={handleSubmit}>
        {(formikProps) => {
          const { values, handleReset, submitForm } = formikProps;
          return (
            <Box mt={2}>
              <SelectStep
                step={activeStep}
                globalValues={values}
                currSubmit={currSubmit}
                setCurrSubmit={setCurrSubmit}
              />
              <Button onClick={submitForm}>SUBMIT</Button>
            </Box>
          );
        }}
      </Formik>
    </Grid>
  );
};

export default NouveauDossier;
