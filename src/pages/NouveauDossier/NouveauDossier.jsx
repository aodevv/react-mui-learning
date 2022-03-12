import React, { useState } from "react";

// FORMIK and YUP
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardContent from "@mui/material/CardContent";
import { Box, Typography, Button, Modal, Backdrop, Fade } from "@mui/material";

import FacturesMiniTables from "../../Components/MiniTables/Factures/FacturesMiniTable";

import InfosDossierForm from "../../Components/Forms/InfoDossier/InfosDossierForm";

//TABLES
import MiniTableWrapper from "../../Components/MiniTableWrapper/MiniTableWrapper";
import MachineriesMiniTable from "../../Components/MiniTables/Machineries/MachineriesMiniTable";
import SalairesMiniTable from "../../Components/MiniTables/Salaires/SalairesMiniTable";
import SiteConcerneMiniTable from "../../Components/MiniTables/SiteConcerne/SiteConcerneMiniTable";

//FORMS
import FactureModalForm from "../../Components/Forms/FactureModalForm/FactureModalForm";
import SalaireModalForm from "../../Components/Forms/SalaireModalForm/SalaireModalForm";
import MachinerieModalForm from "../../Components/Forms/MachinerieModalForm/MachinerieModalForm";
import SiteModalForm from "../../Components/Forms/SitesModalForm/SiteModalForm";

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
  const [salaireModal, setSalaireModal] = useState(false);
  const [machinerieModal, setMachinerieModal] = useState(false);
  const [siteModal, setSiteModal] = useState(false);
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
    sites: [],
  };

  var today = new Date();

  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const FORM_VALIDATION = Yup.object().shape({
    id: Yup.string().required("Champ obligatoire"),
    prgm: Yup.string().required("Champ obligatoire"),
    act_of: Yup.string().required("Champ obligatoire"),
    date_ev: Yup.date()
      .typeError("INVALID_DATE")
      .max(date, `La date doit être égale ou postérieure à aujourd'hui`)
      .required("Champ obligatoire"),
    date_ouv: Yup.date()
      .typeError("INVALID_DATE")
      .when(
        "date_ev",
        (date_ev, Yup) =>
          date_ev &&
          Yup.min(
            date_ev,
            "La date d'ouverture ne peut pas précéder la date d'événement"
          )
      )
      .max(date, `La date doit être égale ou postérieure à aujourd'hui`)
      .required("Champ obligatoire"),
    desc_ev: Yup.string().required("Champ obligatoire"),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  const openFacture = () => {
    setFactureModal(true);
  };
  const closeFacture = () => {
    setFactureModal(false);
  };

  const openSalaire = () => {
    setSalaireModal(true);
  };
  const closeSalaire = () => {
    setSalaireModal(false);
  };

  const openMachinerie = () => {
    setMachinerieModal(true);
  };
  const closeMachinerie = () => {
    setMachinerieModal(false);
  };

  const openSite = () => {
    setSiteModal(true);
  };
  const closeSite = () => {
    setSiteModal(false);
  };

  const typePrejudices = {
    dab: "Dommage au biens",
    mpt: "Mesures preventives temporaires",
    mi: "Mesures d'interventions",
    bcg: "Bris du couvert de glace",
  };
  return (
    <>
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        onSubmit={handleSubmit}
        validationSchema={FORM_VALIDATION}
      >
        {(formikProps) => {
          const { values, submitForm } = formikProps;

          return (
            <Form>
              <Grid>
                <InfosDossierForm values={values} />
              </Grid>
              <Grid container spacing={2} mt={3}>
                <Grid item xs={12} md={6}>
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
                          Sites
                        </Typography>
                      </Box>
                    }
                    btnClick={openSite}
                  >
                    <SiteConcerneMiniTable data={values.sites} />
                  </MiniTableWrapper>
                  <Modal
                    open={siteModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Fade in={siteModal}>
                      <Box sx={style}>
                        <SiteModalForm
                          globalValues={values}
                          closeModal={closeSite}
                        />
                      </Box>
                    </Fade>
                  </Modal>
                </Grid>
                <Grid item xs={12} md={6}>
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
                    disable={values.sites.length === 0 ? true : false}
                    btnClick={openFacture}
                  >
                    <FacturesMiniTables data={values.factures} />
                  </MiniTableWrapper>
                  <Modal
                    open={factureModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Fade in={factureModal}>
                      <Box sx={style}>
                        <FactureModalForm
                          globalValues={values}
                          prejudices={typePrejudices}
                          closeModal={closeFacture}
                          date={date}
                        />
                      </Box>
                    </Fade>
                  </Modal>
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={1}>
                <Grid item xs={12} md={6}>
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
                    btnClick={openSalaire}
                  >
                    <SalairesMiniTable data={values.salaires} />
                  </MiniTableWrapper>
                  <Modal
                    open={salaireModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Fade in={salaireModal}>
                      <Box sx={style}>
                        <SalaireModalForm
                          globalValues={values}
                          prejudices={typePrejudices}
                          closeModal={closeSalaire}
                          date={date}
                        />
                      </Box>
                    </Fade>
                  </Modal>
                </Grid>
                <Grid item xs={12} md={6}>
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
                    btnClick={openMachinerie}
                  >
                    <MachineriesMiniTable data={values.machineries} />
                  </MiniTableWrapper>
                  <Modal
                    open={machinerieModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Fade in={machinerieModal}>
                      <Box sx={style}>
                        <MachinerieModalForm
                          globalValues={values}
                          prejudices={typePrejudices}
                          closeModal={closeMachinerie}
                        />
                      </Box>
                    </Fade>
                  </Modal>
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
