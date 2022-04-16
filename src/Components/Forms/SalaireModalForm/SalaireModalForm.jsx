import React, { useState } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectSalairesMemo } from "../../../redux/Salaires/salaires.selectors";
import { addSalaires } from "../../../redux/Salaires/salaires.actions";

import { selectDossiers } from "../../../redux/DossierInfos/infosDossier.selectors";
import { addInfosDossier } from "../../../redux/DossierInfos/infosDossier.actions";

// ICONS
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import EditIcon from "@mui/icons-material/Edit";

// FORMIK and YUP
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Custom componenets

import Textfield from "../../../Components/FormUI/Textfield";
import Select from "../../../Components/FormUI/Select";
import DatePicker from "../../../Components/FormUI/DateTime";
import Checkbox from "../../../Components/FormUI/Checkbox";
import Submit from "../../../Components/FormUI/Submit";

import SalaireTotal from "./SalaireTotal";

import Tsup from "./Tsup";
import Tsup2 from "./Tsup2";

import Nom from "../../FormUI/Payroll/Nom";
import Prenom from "../../FormUI/Payroll/Prenom";
import Status from "../../FormUI/Payroll/Status";
import Treg from "../../FormUI/Payroll/Treg";
import TauxVac from "../../FormUI/Payroll/TauxVac";

const SalaireModalForm = ({
  closeModal,
  globalValues,
  prejudices,
  date,
  salaires,
  addSalaires,
  existing,
  payroll,
  edit,
  setSalToEdit,
  addInfosDossier,
  dossiers,
  dosToEdit,
  role,
}) => {
  const allowed = [];
  const [editing, setEditing] = useState(false);
  if (globalValues.dab) allowed.push("dab");
  if (globalValues.mpt) allowed.push("mpt");
  if (globalValues.mi) allowed.push("mi");
  if (globalValues.bcg) allowed.push("bcg");

  const isAdmin = role === "admin";
  const modifAjust = isAdmin ? "Ajustement" : "Modification";

  const filteredPrejudices = Object.keys(prejudices)
    .filter((key) => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = prejudices[key];
      return obj;
    }, {});

  const sites = globalValues.sites.map((site) => site.site);

  const payrollNameList = [""];

  payroll.forEach((pay, index) =>
    payrollNameList.push(`${pay.nom} ${pay.prenom}`)
  );

  let INITIAL_FORM_STATE, oldMontant, oldAjust;

  if (edit !== null) {
    let siteId = sites.findIndex(
      (site, index) => site === globalValues.salaires[edit].site_con
    );
    siteId = siteId !== -1 ? siteId : "";
    INITIAL_FORM_STATE = {
      curSal: "",
      id: edit,
      type: globalValues.salaires[edit].type,
      nom: globalValues.salaires[edit].nom,
      prenom: globalValues.salaires[edit].prenom,
      status: globalValues.salaires[edit].status,
      date_per: globalValues.salaires[edit].date_per,
      montant_rec: globalValues.salaires[edit].montant_rec,
      ajust: globalValues.salaires[edit].ajust,
      site_con: siteId,
      Hreg: globalValues.salaires[edit].Hreg,
      Hsup: globalValues.salaires[edit].Hsup,
      Hsup2: globalValues.salaires[edit].Hsup2,
      Treg: globalValues.salaires[edit].Treg,
      Tsup: globalValues.salaires[edit].Tsup,
      Tsup2: globalValues.salaires[edit].Tsup2,
      taux_vac: globalValues.salaires[edit].taux_vac,
      ae: globalValues.salaires[edit].ae,
      rrq: globalValues.salaires[edit].rrq,
      rqap: globalValues.salaires[edit].rqap,
      fss: globalValues.salaires[edit].fss,
      csst: globalValues.salaires[edit].csst,
    };
    oldMontant = globalValues.salaires[edit].montant_rec;
    oldAjust = globalValues.salaires[edit].ajust;
  } else {
    INITIAL_FORM_STATE = {
      curSal: "",
      id: null,
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
  }

  const FORM_VALIDATION = Yup.object().shape({
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
      .min(
        globalValues.date_ev,
        `La date ne peut pas précéder le ${globalValues.date_ev}`
      )
      .max(date, `La date doit être égale ou postérieure à aujourd'hui`)
      .required("Champ obligatoire"),
    Hsup: Yup.number().min(0, "Valeur négative !"),
    Hsup2: Yup.number().min(0, "Valeur négative !"),
    Tsup: Yup.number().min(0, "Valeur négative !"),
    Tsup2: Yup.number().min(0, "Valeur négative !"),
    montant_rec: Yup.number()
      .min(1, "Aucun montant n'est réclamé")
      .required("Champ obligatoire"),
    ajust: Yup.number()
      .min(0, "Valeur négative !")
      .max(oldMontant, "Valeur supérieur montant total"),
  });

  const data = {
    occ: "Occasionel",
    reg: "Régulier",
  };
  const handleSubmit = (values) => {
    let id;

    let newSalaires = globalValues.salaires;
    const ids = newSalaires
      .map((sal) => sal.id)
      .sort(function (a, b) {
        return a - b;
      });

    //ADD total to dossier
    const dosCopy = JSON.parse(JSON.stringify(dossiers));
    const dosId = dosToEdit.id;
    const diff =
      edit === null ? values.montant_rec : values.montant_rec - oldMontant;
    const diffAjust = isAdmin ? values.ajust - oldAjust : values.ajust;
    dosToEdit.MR = dosToEdit.MR + diff;
    dosToEdit.MA = dosToEdit.MA - diffAjust;

    const otherDoses = dosCopy.filter((dossier) => dossier.id !== dosId);
    const newDoses = [...otherDoses, dosToEdit].sort((a, b) =>
      a.id >= b.id ? 1 : -1
    );
    addInfosDossier(newDoses);
    ////////////

    if (values.type === "dab") {
      globalValues.sites[values.site_con].montant_rec =
        globalValues.sites[values.site_con].montant_rec + diff;
      globalValues.sites[values.site_con].s_montant_rec =
        globalValues.sites[values.site_con].s_montant_rec + diff;
    }
    id = ids.length ? ids[ids.length - 1] + 1 : 0;
    newSalaires = Object.assign([], newSalaires);

    if (edit === null) {
      values.id = id;
      newSalaires.push({ ...values, site_con: sites[values.site_con] });
    } else {
      const otherSals = newSalaires.filter((fac) => fac.id !== edit);
      newSalaires = [
        ...otherSals,
        { ...values, site_con: sites[values.site_con] },
      ].sort((a, b) => (a.id >= b.id ? 1 : -1));
    }

    //values.site_con = sites[values.site_con];
    if (existing) {
      console.log("floo");
      let newSals = JSON.parse(JSON.stringify(salaires));
      const dosInt = globalValues.numero;
      Object.keys(newSals).forEach(function (key, index) {
        if (parseInt(key) === dosInt) {
          newSals[key] = newSalaires;
        }
      });
      addSalaires(newSals);
    }
    globalValues.salaires = newSalaires;
    closeModal();
  };

  const handleClose = () => {
    setSalToEdit(null);
    closeModal();
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(!editing);
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
                const { values, handleReset, isValid } = formikProps;
                return (
                  <Form>
                    <Grid item>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="h5" mb={1}>
                          {edit !== null ? modifAjust : "Ajout salaire"}
                        </Typography>
                        {edit !== null && !isAdmin ? (
                          <IconButton
                            aria-label="delete"
                            color={!editing ? "default" : "primary"}
                            size="medium"
                            onClick={handleEdit}
                          >
                            <EditIcon fontSize="inherit" />
                          </IconButton>
                        ) : null}
                      </Box>
                      {edit === null ? (
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <Select
                              name="curSal"
                              label="Salarié"
                              options={payrollNameList}
                              defaultValue=""
                            />
                          </Grid>
                        </Grid>
                      ) : null}

                      <Grid container spacing={1}>
                        <Grid item xs={4}>
                          <Nom
                            name="nom"
                            label="Nom"
                            payroll={payroll}
                            disabled={edit !== null && !editing}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Prenom
                            name="prenom"
                            label="Prénom"
                            payroll={payroll}
                            disabled={edit !== null && !editing}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Status
                            name="status"
                            label="Status"
                            options={data}
                            payroll={payroll}
                            disabled={edit !== null && !editing}
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Select
                            name="type"
                            label="Préjudice"
                            options={filteredPrejudices}
                            disabled={
                              !Object.keys(filteredPrejudices).length > 0 ||
                              (edit !== null && !editing)
                            }
                          />
                        </Grid>
                        {values.type === "dab" ? (
                          <Grid item xs={6}>
                            <Select
                              name="site_con"
                              label="Site concerné"
                              options={sites}
                              disabled={edit !== null && !editing}
                            />
                          </Grid>
                        ) : null}
                      </Grid>

                      <Grid item xs={12}>
                        <DatePicker
                          name="date_per"
                          disabled={edit !== null && !editing}
                          label="Date"
                        />
                      </Grid>
                      <Typography mt={1}>Heures</Typography>
                      <Grid container spacing={1}>
                        <Grid item xs={4}>
                          <Textfield
                            name="Hreg"
                            label="Heures régulières"
                            type="number"
                            disabled={edit !== null && !editing}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Textfield
                            name="Hsup"
                            label="Heures sup"
                            type="number"
                            disabled={edit !== null && !editing}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Textfield
                            name="Hsup2"
                            label="Heures sup 2"
                            type="number"
                            disabled={edit !== null && !editing}
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
                            disabled={edit !== null && !editing}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Tsup
                            name="Tsup"
                            label="Taux sup"
                            type="number"
                            disabled={edit !== null && !editing}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Tsup2
                            name="Tsup2"
                            label="Taux sup 2"
                            type="number"
                            disabled={edit !== null && !editing}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TauxVac
                            name="taux_vac"
                            label="Taux vacances"
                            type="number"
                            payroll={payroll}
                            disabled={edit !== null && !editing}
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
                          <Checkbox
                            disabled={edit !== null && !editing}
                            name="ae"
                            label="AE"
                          />
                        </Grid>
                        <Grid item mr={2} xs={2} l={1}>
                          <Checkbox
                            disabled={edit !== null && !editing}
                            name="rrq"
                            label="RRQ"
                          />
                        </Grid>
                        <Grid item mr={2} xs={2} l={1}>
                          <Checkbox
                            disabled={edit !== null && !editing}
                            name="rqap"
                            label="RQAP"
                          />
                        </Grid>
                        <Grid item xs={2} l={1}>
                          <Checkbox
                            disabled={edit !== null && !editing}
                            name="fss"
                            label="FSS"
                          />
                        </Grid>
                        <Grid item xs={2} l={1}>
                          <Checkbox
                            disabled={edit !== null && !editing}
                            name="csst"
                            label="CSST"
                          />
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
                              disabled={!isAdmin}
                              name="ajust"
                              label="Ajustement"
                              type="number"
                            />
                          </Grid>
                        </Box>
                      </Grid>
                      <Stack direction="row-reverse" spacing={1} mt={2}>
                        <Submit
                          disabled={
                            !isAdmin &&
                            ((edit !== null && !editing) || !isValid)
                          }
                          variant="contained"
                          size="small"
                        >
                          {edit !== null ? "Modifier" : "Enregistrer"}
                        </Submit>
                        {edit === null ? (
                          <Button
                            type="reset"
                            size="small"
                            disabled={edit !== null && !editing}
                            startIcon={<UndoIcon />}
                          >
                            Réinitialiser
                          </Button>
                        ) : null}
                        <Button
                          size="small"
                          onClick={handleClose}
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

const mapStateToProps = createStructuredSelector({
  salaires: selectSalairesMemo,
  dossiers: selectDossiers,
});

const mapDispatchToProps = (dispatch) => ({
  addSalaires: (newSals) => dispatch(addSalaires(newSals)),
  addInfosDossier: (newInfos) => dispatch(addInfosDossier(newInfos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SalaireModalForm);
