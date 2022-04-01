import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
// selectors
import { selectDossiers } from "../../redux/DossierInfos/infosDossier.selectors";
import { selectFacturesMemo } from "../../redux/Factures/Factures.selectors";
import { selectSalairesMemo } from "../../redux/Salaires/salaires.selectors";
import { selectMachineriesMemo } from "../../redux/Machineries/machineries.selectors";
import { selectSitesMemo } from "../../redux/Sites/Sites.selectors";
import { selectPayroll } from "../../redux/Salaires/salaires.selectors";

// actions
import { addInfosDossier } from "../../redux/DossierInfos/infosDossier.actions";
import { addSalaires } from "../../redux/Salaires/salaires.actions";
import { addMachinerie } from "../../redux/Machineries/machineries.actions";
import { addSites } from "../../redux/Sites/Sites.actions";
import { addFactures } from "../../redux/Factures/Factures.actions";

// FORMIK and YUP
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Grid from "@mui/material/Grid";

import { Box, Typography, Button, Modal, Fade, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

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

//Accordion stuff
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import SignpostOutlinedIcon from "@mui/icons-material/SignpostOutlined";

//TOTALS
//import FacturesTotal from "./FacturesTotal";
import FacturesTotalTAX from "./FacturesTotalTAX";
import FacturesTotalHT from "./FacturesTotalHT";
import SalairesTotal from "./SalairesTotal";
import MachineriesTotal from "./MachineriesTotal";
import SitesTotal from "./SitesTotal";

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

const NouveauDossier = ({
  dossiers,
  sites,
  factures,
  salaires,
  payroll,
  machineries,
  addFactures,
  addSalaires,
  addMachinerie,
  addSites,
  addInfosDossier,
}) => {
  const navigate = useNavigate();

  const [factureModal, setFactureModal] = useState(false);
  const [salaireModal, setSalaireModal] = useState(false);
  const [machinerieModal, setMachinerieModal] = useState(false);
  const [siteModal, setSiteModal] = useState(false);
  const [submitModal, setSubmitModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeForms, setActiveForms] = useState(true);
  const [finishedInfos, setFinishedInfos] = useState(false);
  const [accord, setAccord] = useState("panel");
  const [facToEdit, setFacToEdit] = useState(null);
  const [salToEdit, setSalToEdit] = useState(null);
  const [machToEdit, setMachToEdit] = useState(null);

  const dosIds = dossiers.map((dos) => dos.id);

  const INITIAL_FORM_STATE = {
    id: "",
    numero: "",
    date_ev: "",
    date_ouv: "",
    test: "",
    desc_ev: "",
    act_of: "",
    prgm: "",
    prgm_test: "flala",
    dab: false,
    mpt: false,
    mi: false,
    bcg: false,
    MR: 0,
    siteTT: 0,
    facTT: 0,
    facHT: 0,
    salTT: 0,
    machTT: 0,
    dabTT: 0,
    mptTT: 0,
    miTT: 0,
    bcgTT: 0,

    factures: [],
    salaires: [],
    machineries: [],
    sites: [],
  };

  var today = new Date();

  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const FORM_VALIDATION = Yup.object().shape({
    numero: Yup.string().test(
      "unique",
      "Ce numéro existe déjà",
      (value) => !dosIds.includes(value)
    ),
    prgm: Yup.string().required("Champ obligatoire"),
    act_of: Yup.string().required("Champ obligatoire"),
    test: Yup.date().typeError("Date invalide").required("Darori"),
    date_ev: Yup.date()
      .typeError("Date invalide")
      .max(date, `La date doit être égale ou postérieure à aujourd'hui`)
      .required("Champ obligatoire"),
    date_ouv: Yup.date()
      .typeError("Date invalide")
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
    const ids = dossiers
      .map((dos) => dos.id)
      .sort(function (a, b) {
        return a - b;
      });
    const id = ids[ids.length - 1] + 1;
    values.id = id;

    const infoDos = {
      id: values.numero,
      datEv: values.date_ev,
      datOuv: values.date_ouv,
      Evenement: values.desc_ev,
      act_of: values.act_of,
      prgm: values.prgm,
      MR: values.MR,
      status: "actif",
      MA: 0,
      MV: 0,
      Participation: 0,
      adm: true,
      dab: values.dab,
      mpt: values.mpt,
      mi: values.mi,
      bcg: values.bcg,
    };

    addInfosDossier([...dossiers, infoDos]);
    let newFacts = factures;
    newFacts[values.numero] = [];
    addFactures(newFacts);

    let newSites = sites;
    newSites[values.numero] = [];
    addSites(newSites);

    let newSals = salaires;
    newSals[values.numero] = [];
    addSalaires(newSals);

    let newMach = machineries;
    newMach[values.numero] = [];
    addMachinerie(newMach);
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

  const openSubmit = () => {
    setSubmitModal(true);
  };
  const closeSubmit = () => {
    setSubmitModal(false);
  };

  const resetAndExit = (values, isValid) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFinishedInfos(true);
      setAccord(false);
      setActiveForms(false);

      values = INITIAL_FORM_STATE;
      closeSubmit();
      //navigate("/dossier");
    }, 1000);
  };

  const handleAccord = (panel) => (event, accord) => {
    setAccord(accord ? panel : false);
  };

  const typePrejudices = {
    dab: "Dommage au biens",
    mpt: "Mesures preventives temporaires",
    mi: "Mesures d'interventions",
    bcg: "Bris du couvert de glace",
  };

  useEffect(() => {
    if (facToEdit !== null) {
      openFacture();
    }
  }, [facToEdit]);

  useEffect(() => {
    if (salToEdit !== null) {
      openSalaire();
    }
  }, [salToEdit]);

  useEffect(() => {
    if (machToEdit !== null) {
      openMachinerie();
    }
  }, [machToEdit]);

  return (
    <>
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={handleSubmit}
      >
        {(formikProps) => {
          const { values, submitForm, isValid, setFieldValue } = formikProps;

          return (
            <Form>
              <Accordion
                expanded={accord === "panel"}
                onChange={handleAccord("panel")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ backgroundColor: `${accord ? "#a0a0a057" : null}` }}
                >
                  <Typography variant="h5" mr={2}>
                    Nouveau Dossier
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <InfosDossierForm
                    setFieldValue={setFieldValue}
                    isValid={isValid}
                    values={values}
                    openSubmit={openSubmit}
                    finishedInfos={finishedInfos}
                  />
                </AccordionDetails>
              </Accordion>
              <Modal
                open={submitModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Fade in={submitModal}>
                  <Box sx={style2}>
                    <Typography variant="h5">Confimer ?</Typography>
                    <Stack direction="row-reverse" spacing={1} mt={2}>
                      <LoadingButton
                        size="small"
                        variant="contained"
                        loading={loading}
                        onClick={() => {
                          submitForm();
                          if (isValid) resetAndExit(values, isValid);
                        }}
                      >
                        Oui
                      </LoadingButton>
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
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12} md={6}>
                  <MiniTableWrapper
                    disable={activeForms || !values.dab}
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
                          <SitesTotal />
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
                          globalValues={values}
                          closeModal={closeSite}
                          existing
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
                          <Typography ml={1} mr={3} variant="h5">
                            Factures
                          </Typography>
                          <FacturesTotalTAX />
                          <Box mr={2}></Box>
                          <FacturesTotalHT />
                        </Box>
                      </Box>
                    }
                    disable={activeForms}
                    btnClick={openFacture}
                  >
                    <FacturesMiniTables
                      setFacToEdit={setFacToEdit}
                      data={values.factures}
                    />
                  </MiniTableWrapper>
                  <Modal
                    open={factureModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Fade in={factureModal}>
                      <Box sx={style}>
                        <FactureModalForm
                          setFacToEdit={setFacToEdit}
                          edit={facToEdit}
                          globalValues={values}
                          prejudices={typePrejudices}
                          closeModal={closeFacture}
                          date={date}
                          existing
                        />
                      </Box>
                    </Fade>
                  </Modal>
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={1}>
                <Grid item xs={12} md={6}>
                  <MiniTableWrapper
                    disable={activeForms}
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
                          <SalairesTotal />
                        </Box>
                      </Box>
                    }
                    btnClick={openSalaire}
                  >
                    <SalairesMiniTable
                      setSalToEdit={setSalToEdit}
                      data={values.salaires}
                    />
                  </MiniTableWrapper>
                  <Modal
                    open={salaireModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Fade in={salaireModal}>
                      <Box sx={style}>
                        <SalaireModalForm
                          edit={salToEdit}
                          setSalToEdit={setSalToEdit}
                          payroll={payroll}
                          globalValues={values}
                          prejudices={typePrejudices}
                          closeModal={closeSalaire}
                          date={date}
                          existing
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
                          <MachineriesTotal />
                        </Box>
                      </Box>
                    }
                    disable={activeForms}
                    btnClick={openMachinerie}
                  >
                    <MachineriesMiniTable
                      setMachToEdit={setMachToEdit}
                      data={values.machineries}
                    />
                  </MiniTableWrapper>
                  <Modal
                    open={machinerieModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Fade in={machinerieModal}>
                      <Box sx={style}>
                        <MachinerieModalForm
                          setMachToEdit={setMachToEdit}
                          edit={machToEdit}
                          globalValues={values}
                          prejudices={typePrejudices}
                          closeModal={closeMachinerie}
                          existing
                        />
                      </Box>
                    </Fade>
                  </Modal>
                </Grid>
              </Grid>
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
  payroll: selectPayroll,
});

const mapDispatchToProps = (dispatch) => ({
  addInfosDossier: (newDos) => dispatch(addInfosDossier(newDos)),
  addFactures: (newFacts) => dispatch(addFactures(newFacts)),
  addSalaires: (newSals) => dispatch(addSalaires(newSals)),
  addMachinerie: (newMach) => dispatch(addMachinerie(newMach)),
  addSites: (newSites) => dispatch(addSites(newSites)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NouveauDossier);
