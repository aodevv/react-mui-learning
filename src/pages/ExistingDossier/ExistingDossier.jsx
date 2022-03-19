import React, { useState } from "react";

//REDUX
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
// selectors
import { selectDossiers } from "../../redux/DossierInfos/infosDossier.selectors";
import { selectFacturesMemo } from "../../redux/Factures/Factures.selectors";
import { selectSalairesMemo } from "../../redux/Salaires/salaires.selectors";
import { selectMachineriesMemo } from "../../redux/Machineries/machineries.selectors";
import { selectSitesMemo } from "../../redux/Sites/Sites.selectors";

// FORMIK and YUP
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Grid from "@mui/material/Grid";

import { Box, Typography, Button, Modal, Fade, Stack } from "@mui/material";

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
import SignpostOutlinedIcon from "@mui/icons-material/SignpostOutlined";

//Accordion stuff
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  borderRadius: 2,
  p: "30px 30px",
};

const ExistingDossier = ({
  dossiers,
  sites,
  factures,
  salaires,
  machineries,
}) => {
  const [factureModal, setFactureModal] = useState(false);
  const [salaireModal, setSalaireModal] = useState(false);
  const [machinerieModal, setMachinerieModal] = useState(false);
  const [siteModal, setSiteModal] = useState(false);
  const [submitModal, setSubmitModal] = useState(false);
  const testing = 1;
  const curInfosDos = dossiers[testing];
  const curFacts = factures[testing];
  const curSites = sites[testing];
  const curSals = salaires[testing];
  const curMachs = machineries[testing];

  let [mm, dd, yyyy] = curInfosDos.datEv.split("/");
  dd = dd.length === 1 ? "0" + dd : dd;
  mm = mm.length === 1 ? "0" + mm : mm;

  let [mm2, dd2, yyyy2] = curInfosDos.datOuv.split("/");
  dd2 = dd2.length === 1 ? "0" + dd2 : dd2;
  mm2 = mm2.length === 1 ? "0" + mm2 : mm2;

  const INITIAL_FORM_STATE = {
    id: "",
    numero: curInfosDos.id,
    date_ev: `${yyyy}-${mm}-${dd}`,
    date_ouv: `${yyyy2}-${mm2}-${dd2}`,
    desc_ev: curInfosDos.Evenement,
    act_of: curInfosDos.actOf,
    prgm: curInfosDos.prgm,
    dab: curInfosDos.dab,
    mpt: curInfosDos.mpt,
    mi: curInfosDos.mi,
    bcg: curInfosDos.bcg,
    MR: curInfosDos.MR,

    factures: curFacts,
    salaires: curSals,
    machineries: curMachs,
    sites: curSites,
  };

  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const handleSubmit = () => {};
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

  const openSubmit = () => {
    setSubmitModal(true);
  };
  const closeSubmit = () => {
    setSubmitModal(false);
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
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h5" mr={2}>
                      Dossier
                    </Typography>
                    <Typography variant="h5" sx={{ backgroundColor: "yellow" }}>
                      <b>ABC</b>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <InfosDossierForm
                      values={values}
                      openSubmit={openSubmit}
                      existing={true}
                    />
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Modal
                open={submitModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Fade in={submitModal}>
                  <Box sx={style2}>
                    <Typography variant="h5">Confimer ?</Typography>
                    <Stack direction="row-reverse" spacing={1} mt={2}>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                          submitForm();
                        }}
                      >
                        Oui
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={closeSubmit}
                      >
                        Non
                      </Button>
                    </Stack>
                  </Box>
                </Fade>
              </Modal>
              <Grid container spacing={2} mt={3}>
                <Grid item xs={12} md={6}>
                  <MiniTableWrapper
                    disable={values.dab ? false : true}
                    title={
                      <Box
                        display="flex"
                        alignContent="center"
                        alignItems="center"
                      >
                        <SignpostOutlinedIcon />
                        <Box display="flex" alignItems="center">
                          <Typography ml={1} mr={4} variant="h5">
                            Sites
                          </Typography>
                          <Typography>
                            <b>$ 0.00</b>
                          </Typography>
                        </Box>
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
                          existing={true}
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
                        sx={{ width: "100%" }}
                      >
                        <ReceiptOutlinedIcon />
                        <Box display="flex" alignItems="center">
                          <Typography ml={1} mr={4} variant="h5">
                            Factures
                          </Typography>
                          {/* <FacturesTotal /> */}
                        </Box>
                      </Box>
                    }
                    disable={values.date_ev !== "" ? false : true}
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
                          existing={true}
                        />
                      </Box>
                    </Fade>
                  </Modal>
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={1}>
                <Grid item xs={12} md={6}>
                  <MiniTableWrapper
                    disable={values.date_ev !== "" ? false : true}
                    title={
                      <Box
                        display="flex"
                        alignContent="center"
                        alignItems="center"
                      >
                        <AttachMoneyIcon />
                        <Box display="flex" alignItems="center">
                          <Typography ml={1} mr={4} variant="h5">
                            Salaires
                          </Typography>
                          <Typography>
                            <b>$ 0.00</b>
                          </Typography>
                        </Box>
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
                          existing={true}
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
                        <Box display="flex" alignItems="center">
                          <Typography ml={1} mr={4} variant="h5">
                            Machineries
                          </Typography>
                          <Typography>
                            <b>$ 0.00</b>
                          </Typography>
                        </Box>
                      </Box>
                    }
                    disable={values.date_ev !== "" ? false : true}
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
                          existing={true}
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

const mapStateToProps = createStructuredSelector({
  dossiers: selectDossiers,
  sites: selectSitesMemo,
  factures: selectFacturesMemo,
  salaires: selectSalairesMemo,
  machineries: selectMachineriesMemo,
});

export default connect(mapStateToProps)(ExistingDossier);
