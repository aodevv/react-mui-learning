import React, { useState } from "react";

// FORMIK and YUP
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Box, Typography, Button, Modal } from "@mui/material";

import FacturesMiniTables from "../../Components/MiniTables/Factures/FacturesMiniTable";

import InfosDossierForm from "../../Components/Forms/InfoDossier/InfosDossierForm";

//TABLES
import MiniTableWrapper from "../../Components/MiniTableWrapper/MiniTableWrapper";
import MachineriesMiniTable from "../../Components/MiniTables/Machineries/MachineriesMiniTable";
import SalairesMiniTable from "../../Components/MiniTables/Salaires/SalairesMiniTable";

//FORMS
import FactureModalForm from "../../Components/Forms/FactureModalForm/FactureModalForm";

import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  borderRadius: 2,
  p: "30px 10px",
};

const NouveauDossier = () => {
  const [factureModal, setFactureModal] = useState(false);
  const INITIAL_FORM_STATE = {
    id: "",
    date_ev: "",
    date_ouv: "",
    desc_ev: "",
    act_of: "",
    prgm: "",
    dab: false,
    mpt: false,
    mi: false,
    bcg: false,

    factures: [],
    salaires: [],
    machineries: [],
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  const openFacture = () => {
    setFactureModal(true);
  };

  const closeFacture = () => {
    setFactureModal(false);
  };

  const typePrejudices = {
    dab: "Dommage au biens",
    mpt: "Mesures preventives temporaires",
    mi: "Mesures d'interventions",
    bcg: "Bris du couvert de glace",
  };
  return (
    <>
      <Formik initialValues={{ ...INITIAL_FORM_STATE }} onSubmit={handleSubmit}>
        {(formikProps) => {
          const { values, submitForm } = formikProps;
          return (
            <Form>
              <Grid>
                <InfosDossierForm />
              </Grid>
              <Grid container spacing={2} mt={3}>
                <Grid item xs={6}>
                  <MiniTableWrapper
                    title={
                      <Box
                        display="flex"
                        alignContent="center"
                        alignItems="center"
                      >
                        <ReceiptOutlinedIcon />
                        <Typography ml={1} variant="h5">
                          Factures
                        </Typography>
                      </Box>
                    }
                    disable={values.id ? false : true}
                    btnClick={openFacture}
                  >
                    <FacturesMiniTables data={values.factures} />
                  </MiniTableWrapper>
                  <Modal
                    open={factureModal}
                    onClose={closeFacture}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <FactureModalForm globalValues={values} />
                    </Box>
                  </Modal>
                </Grid>
                <Grid item xs={6}>
                  <MiniTableWrapper
                    disable={values.id ? false : true}
                    title={
                      <Box
                        display="flex"
                        alignContent="center"
                        alignItems="center"
                      >
                        <AttachMoneyIcon />
                        <Typography ml={1} variant="h5">
                          Salaires
                        </Typography>
                      </Box>
                    }
                    btnClick={() => console.log("Clicked")}
                  >
                    <SalairesMiniTable />
                  </MiniTableWrapper>
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={1}>
                <Grid item xs={6}>
                  <MiniTableWrapper
                    title={
                      <Box
                        display="flex"
                        alignContent="center"
                        alignItems="center"
                      >
                        <PrecisionManufacturingOutlinedIcon />
                        <Typography ml={1} variant="h5">
                          Machineries
                        </Typography>
                      </Box>
                    }
                    disable={values.id ? false : true}
                    btnClick={() => console.log("Clicked")}
                  >
                    <MachineriesMiniTable />
                  </MiniTableWrapper>
                </Grid>
              </Grid>

              <Button onClick={submitForm}>Submit</Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default NouveauDossier;
