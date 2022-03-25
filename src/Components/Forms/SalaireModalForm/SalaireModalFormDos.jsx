import React, { useState } from "react";

// FORMIK and YUP
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { connect } from "react-redux";
import { addSalaires } from "../../../redux/Salaires/salaires.actions";
import { addSites } from "../../../redux/Sites/Sites.actions";
import { addInfosDossier } from "../../../redux/DossierInfos/infosDossier.actions";

// MUI ICONS
import { Container, Grid, Typography, Box, Button, Stack } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";

import Textfield from "../../../Components/FormUI/Textfield";
import Select from "../../../Components/FormUI/Select";
import SelectDossier from "../../../Components/FormUI/SelectDossier";
import SelectPrejudice from "../../../Components/FormUI/SelectPrejudice";
import SelectSites from "../../../Components/FormUI/SelectSites";
import DatePicker from "../../../Components/FormUI/DateTime";
import Checkbox from "../../../Components/FormUI/Checkbox";
import Submit from "../../../Components/FormUI/Submit";

import SalaireTotal from "./SalaireTotal";

import Tsup from "./Tsup";
import Tsup2 from "./Tsup2";
import id from "date-fns/esm/locale/id/index.js";
import Nom from "../../FormUI/Payroll/Nom";
import Prenom from "../../FormUI/Payroll/Prenom";
import Status from "../../FormUI/Payroll/Status";
import Treg from "../../FormUI/Payroll/Treg";
import TauxVac from "../../FormUI/Payroll/TauxVac";

const SalaireModalFormDos = ({
  prejudices,
  closeModal,
  date,
  sites,
  numDos,
  dossiers,
  addSalaires,
  addInfosDossier,
  addSites,
  salaires,
  payroll,
}) => {
  const [validDate, setValiDate] = useState("2010-01-01");
  var today = new Date();

  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const INITIAL_FORM_STATE = {
    curSal: "",
    numDos: "",
    type: "",
    nom: "",
    prenom: "",
    status: "",
    date_per: "",
    montant_rec: 0,
    ajust: 0,
    site_con: "",
    Hreg: 0,
    Hsup: 0,
    Hsup2: 0,
    Treg: 0,
    Tsup: 0,
    Tsup2: 0,
    taux_vac: 0,
    ae: false,
    rrq: false,
    rqap: false,
    fss: false,
    csst: false,
  };
  const FORM_VALIDATION = Yup.object().shape({
    numDos: Yup.string().required("Champ obligatoire"),
    type: Yup.string().required("Champ obligatoire"),
    site_con: Yup.string().when("type", {
      is: "dab", // alternatively: (val) => val == true
      then: (schema) => schema.required("Champ obligatoire"),
    }),
    nom: Yup.string().required("Champ obligatoire"),
    prenom: Yup.string().required("Champ obligatoire"),
    status: Yup.string().required("Champ obligatoire"),
    Hreg: Yup.number().when("status", {
      is: "occ",
      then: Yup.number().min(1, "Champ obligatoire"),
    }),
    Treg: Yup.number().when("status", {
      is: "occ",
      then: Yup.number().min(1, "Champ obligatoire"),
    }),
    taux_vac: Yup.number()
      .max(100, "Ne doit pas dépasser 100%")
      .required("Champ obligatoire"),
    date_per: Yup.date()
      .typeError("INVALID_DATE")
      .min(validDate, `La date ne peut pas précéder le ${validDate}`)
      .max(date, `La date doit être égale ou postérieure à aujourd'hui`)
      .required("Champ obligatoire"),
    Hsup: Yup.number().min(0, "Valeur négative !"),
    Hsup2: Yup.number().min(0, "Valeur négative !"),
    Tsup: Yup.number().min(0, "Valeur négative !"),
    Tsup2: Yup.number().min(0, "Valeur négative !"),
  });
  const dosCopy = JSON.parse(JSON.stringify(dossiers));
  const sitesCopy = JSON.parse(JSON.stringify(sites));

  const data = {
    occ: "Occasionel",
    reg: "Régulier",
  };

  const payrollNameList = [""];

  payroll.forEach((pay, index) =>
    payrollNameList.push(`${pay.nom} ${pay.prenom}`)
  );

  const handleSubmit = (values, { resetForm }) => {
    const dosInt = values.numDos;
    let newSals = JSON.parse(JSON.stringify(salaires));
    const salaireDos = newSals[dosInt];
    let id;
    const ids = salaireDos
      .map((fac) => fac.id)
      .sort(function (a, b) {
        return a - b;
      });
    id = ids.length ? ids[ids.length - 1] + 1 : 0;

    const siteToAdd = sites[dosInt].map((site) => site.site)[values.site_con];
    const newSal = {
      id: id,
      type: values.type,
      prenom: values.nom,
      nom: values.prenom,
      status: values.status,
      date_per: values.date_per,
      montant_rec: values.montant_rec,
      ajust: values.ajust,
      site_con: siteToAdd,
      Hreg: values.Hreg,
      Hsup: values.Hsup,
      Hsup2: values.Hsup2,
      Treg: values.Treg,
      Tsup: values.Tsup,
      Tsup2: values.Tsup2,
      taux_vac: values.taux_vac,
      ae: values.ae,
      rrq: values.rrq,
      rqap: values.rqap,
      fss: values.fss,
      csst: values.csst,
    };
    salaireDos.push(newSal);
    Object.keys(newSals).forEach(function (key, index) {
      if (key === dosInt) {
        newSals[key] = salaireDos;
      }
    });
    addSalaires(newSals);
    const dosId = values.numDos;
    const siteId = siteToAdd;

    const dosToEdit = dosCopy.find((dossier) => dossier.id === dosId);
    dosToEdit.MR = dosToEdit.MR + values.montant_rec;

    const otherDoses = dosCopy.filter((dossier) => dossier.id !== dosId);
    addInfosDossier(
      [...otherDoses, dosToEdit].sort((a, b) => (a.id >= b.id ? 1 : -1))
    );

    if (values.type === "dab") {
      const siteDos = sitesCopy[dosId];
      const siteToEdit = siteDos.find((site) => site.site === siteId);
      const otherSites = siteDos.filter((site) => site.site !== siteId);
      siteToEdit.s_montant_rec = siteToEdit.s_montant_rec + values.montant_rec;
      siteToEdit.montant_rec = siteToEdit.montant_rec + values.montant_rec;
      Object.keys(sitesCopy).forEach((item, key) => {
        if (key === dosId) sitesCopy[key] = [...otherSites, siteToEdit];
      });
      addSites(sitesCopy);
    }
    resetForm();
    closeModal();
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Container maxWidth="l">
            <Formik
              initialValues={{ ...INITIAL_FORM_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={handleSubmit}
            >
              {(formikProps) => {
                const { values } = formikProps;

                return (
                  <Form>
                    <Grid item>
                      <Typography variant="h5" mb={1}>
                        Ajout salaire
                      </Typography>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Select
                            name="curSal"
                            label="Salarié"
                            options={payrollNameList}
                            defaultValue=""
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <SelectDossier
                            dossiers={dossiers}
                            setValiDate={setValiDate}
                            name="numDos"
                            label="Numéro dossier"
                            options={numDos}
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <SelectPrejudice
                            name="type"
                            label="Préjudice"
                            defaultValue=""
                            options={prejudices}
                            dossiers={dossiers}
                            disabled={values.numDos === ""}
                          />
                        </Grid>
                        {values.type === "dab" ? (
                          <Grid item xs={6}>
                            <SelectSites
                              defaultValue=""
                              name="site_con"
                              label="Site concerné"
                              sites={sites}
                              disabled={values.type !== "dab"}
                            />
                          </Grid>
                        ) : null}
                      </Grid>
                      <Grid container spacing={1}>
                        <Grid item xs={4}>
                          <Nom name="nom" label="Nom" payroll={payroll} />
                        </Grid>
                        <Grid item xs={4}>
                          <Prenom
                            name="prenom"
                            label="Prénom"
                            payroll={payroll}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Status
                            name="status"
                            label="Status"
                            options={data}
                            payroll={payroll}
                          />
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <DatePicker name="date_per" label="Date" />
                      </Grid>
                      <Typography mt={1}>Heures</Typography>
                      <Grid container spacing={1}>
                        <Grid item xs={4}>
                          <Textfield
                            name="Hreg"
                            label="Heures régulières"
                            type="number"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Textfield
                            name="Hsup"
                            label="Heures sup"
                            type="number"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Textfield
                            name="Hsup2"
                            label="Heures sup 2"
                            type="number"
                          />
                        </Grid>
                      </Grid>
                      <Typography mt={1}>Taux</Typography>
                      <Grid container spacing={1}>
                        <Grid item xs={3}>
                          <Treg
                            name="Treg"
                            label="Taux régulier"
                            payroll={payroll}
                            type="number"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Tsup name="Tsup" label="Taux sup" type="number" />
                        </Grid>
                        <Grid item xs={3}>
                          <Tsup2
                            name="Tsup2"
                            label="Taux sup 2"
                            type="number"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TauxVac
                            name="taux_vac"
                            label="Taux vacances"
                            type="number"
                            payroll={payroll}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container mt={1} pl={2} spacing={2}>
                        <Grid item xs={2} l={1}>
                          <Checkbox name="ae" label="AE" />
                        </Grid>
                        <Grid item mr={2} xs={2} l={1}>
                          <Checkbox name="rrq" label="RRQ" />
                        </Grid>
                        <Grid item mr={2} xs={2} l={1}>
                          <Checkbox name="rqap" label="RQAP" />
                        </Grid>
                        <Grid item xs={2} l={1}>
                          <Checkbox name="fss" label="FSS" />
                        </Grid>
                        <Grid item xs={2} l={1}>
                          <Checkbox name="csst" label="CSST" />
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Box mt={2} display="flex" alignItems="center">
                          <Typography variant="h5" mr={2}>
                            Salaire réclamé:{" "}
                            <Box sx={{ fontWeight: 600, display: "inline" }}>
                              {/* {`$ ${ins1000Sep(formatNum(values.cout))}`} */}
                              <SalaireTotal name="montant_rec" />
                            </Box>
                          </Typography>
                          <Grid item xs={4}>
                            <Textfield
                              disabled
                              name="ajust"
                              label="Ajustement"
                              type="number"
                            />
                          </Grid>
                        </Box>
                      </Grid>
                      <Stack direction="row" spacing={1} mt={2}>
                        <Submit variant="contained" size="small">
                          Ajouter
                        </Submit>
                        <Button
                          type="reset"
                          size="small"
                          startIcon={<UndoIcon />}
                        >
                          Réinitialiser
                        </Button>
                        <Button
                          size="small"
                          onClick={closeModal}
                          startIcon={<CloseIcon />}
                        >
                          Annuler
                        </Button>
                      </Stack>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addSalaires: (newSals) => dispatch(addSalaires(newSals)),
  addInfosDossier: (newInfos) => dispatch(addInfosDossier(newInfos)),
  addSites: (newSites) => dispatch(addSites(newSites)),
});

export default connect(null, mapDispatchToProps)(SalaireModalFormDos);
