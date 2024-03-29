import React, { useState } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectFacturesMemo } from "../../../redux/Factures/Factures.selectors";
import { addFactures } from "../../../redux/Factures/Factures.actions";

import {
  selectDossiers,
  selectPop,
} from "../../../redux/DossierInfos/infosDossier.selectors";
import { addInfosDossier } from "../../../redux/DossierInfos/infosDossier.actions";

// FORMIK and YUP
import { Formik, Form } from "formik";
import * as Yup from "yup";

// MUI ICONS
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
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import Textfield from "../../../Components/FormUI/Textfield";
import Select from "../../../Components/FormUI/Select";
import DatePicker from "../../../Components/FormUI/DateTime";
import Checkbox from "../../../Components/FormUI/Checkbox";
import Submit from "../../../Components/FormUI/Submit";
//import DatePro from "../../../Components/FormUI/DateTimePro";

import EditIcon from "@mui/icons-material/Edit";

const FactureModalForm = ({
  globalValues,
  prejudices,
  closeModal,
  date,
  existing,
  factures,
  addFactures,
  edit,
  setFacToEdit,
  addInfosDossier,
  dossiers,
  dosToEdit,
  role,
  population,
}) => {
  const [editing, setEditing] = useState(false);
  const sites = globalValues.sites.map((site) => site.site);

  const isAdmin = role === "admin";
  const modifAjust = isAdmin ? "Ajustement" : "Modification";

  let INITIAL_FORM_STATE, oldMontant, oldAjust;
  if (edit !== null) {
    let siteId = sites.findIndex(
      (site, index) => site === globalValues.factures[edit].site_con
    );
    siteId = siteId !== -1 ? siteId : "";
    INITIAL_FORM_STATE = {
      id: edit,
      desc_fact: globalValues.factures[edit].desc_fact,
      date_fact: globalValues.factures[edit].date_fact,
      type: globalValues.factures[edit].type,
      montant_rec: globalValues.factures[edit].montant_rec,
      ajust: globalValues.factures[edit].ajust,
      fournis: globalValues.factures[edit].fournis,
      site_con: siteId,
      tax: globalValues.factures[edit].tax,
      role: role,
    };
    oldMontant = globalValues.factures[edit].montant_rec;
    oldAjust = globalValues.factures[edit].ajust;
  } else {
    INITIAL_FORM_STATE = {
      id: "",
      desc_fact: "",
      date_fact: "",
      type: "",
      fournis: "",
      montant_rec: 0,
      ajust: 0,
      site_con: "",
      tax: false,
      role: role,
    };
  }

  const FORM_VALIDATION = Yup.object().shape({
    type: Yup.string().required("Champ obligatoire"),
    site_con: Yup.string().when("type", {
      is: "dab", // alternatively: (val) => val == true
      then: (schema) => schema.required("Champ obligatoire"),
    }),
    date_fact: Yup.date()
      .typeError("INVALID_DATE")
      .min(
        globalValues.date_ev,
        `La date ne peut pas précéder le ${globalValues.date_ev}`
      )
      .max(date, `La date doit être égale ou postérieure à aujourd'hui`)
      .required("Champ obligatoire"),
    desc_fact: Yup.string().required("Champ obligatoire"),
    fournis: Yup.string().required("Champ obligatoire"),
    montant_rec: Yup.number()
      .min(0, "Valeur négatif !")
      .required("Champ obligatoire"),
    ajust: Yup.number().when("role", {
      is: (role) => role === "admin",
      then: Yup.number()
        .min(0, "Valeur négative !")
        .max(oldMontant, "Valeur supérieur montant total"),
    }),
  });
  const allowed = [];
  if (globalValues.dab) allowed.push("dab");
  if (globalValues.mpt) allowed.push("mpt");
  if (globalValues.mi) allowed.push("mi");
  if (globalValues.bcg) allowed.push("bcg");

  const filteredPrejudices = Object.keys(prejudices)
    .filter((key) => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = prejudices[key];
      return obj;
    }, {});

  const handleSubmit = (values) => {
    let id;
    let newFactures = globalValues.factures;

    const ids =
      newFactures.length > 0
        ? newFactures
            .map((fac) => fac.id)
            .sort(function (a, b) {
              return a - b;
            })
        : [];

    //ADD total to dossier
    const diff =
      edit === null ? values.montant_rec : values.montant_rec - oldMontant;
    const diffAjust = isAdmin ? values.ajust - oldAjust : values.ajust;
    const dosCopy = JSON.parse(JSON.stringify(dossiers));
    const dosId = edit === null ? globalValues.id : dosToEdit.id;

    dosToEdit.MR = dosToEdit.MR + diff;

    dosToEdit.MA = dosToEdit.MA - diffAjust;
    if (population > 0) {
      dosToEdit.Participation =
        dosToEdit.MR > 3 * population ? 3 * population : dosToEdit.MR;
    }

    const otherDoses = dosCopy.filter((dossier) => dossier.id !== dosId);
    const newDoses = [...otherDoses, dosToEdit].sort((a, b) =>
      a.id >= b.id ? 1 : -1
    );
    addInfosDossier(newDoses);
    ////////////

    if (values.type === "dab") {
      globalValues.sites[values.site_con].montant_rec =
        globalValues.sites[values.site_con].montant_rec + diff;
      globalValues.sites[values.site_con].f_montant_rec =
        globalValues.sites[values.site_con].f_montant_rec + diff;
    }
    id = ids.length ? ids[ids.length - 1] + 1 : 0;
    newFactures = Object.assign([], newFactures);
    if (edit === null) {
      values.id = id;
      newFactures.push({ ...values, site_con: sites[values.site_con] });
    } else {
      const otherFacs = newFactures.filter((fac) => fac.id !== edit);
      newFactures = [
        ...otherFacs,
        { ...values, site_con: sites[values.site_con] },
      ].sort((a, b) => (a.id >= b.id ? 1 : -1));
    }

    if (existing) {
      let newFacts = JSON.parse(JSON.stringify(factures));
      const dosInt = globalValues.numero;
      Object.keys(newFacts).forEach(function (key, index) {
        if (key === dosInt) {
          newFacts[key] = newFactures;
        }
      });
      addFactures(newFacts);
    }
    globalValues.factures = newFactures;

    setFacToEdit(null);
    setEditing(false);
    closeModal();
  };

  const handleClose = () => {
    setFacToEdit(null);
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
                const { values, isValid } = formikProps;

                return (
                  <Form>
                    <Grid item>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="h5" mb={1}>
                          {edit !== null ? modifAjust : "Ajout facture"}
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
                        <Textfield
                          name="desc_fact"
                          multiline
                          rows={4}
                          label="Description"
                          disabled={edit !== null && !editing}
                        />
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Textfield
                            name="fournis"
                            label="Fournisseur"
                            disabled={edit !== null && !editing}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <DatePicker
                            name="date_fact"
                            label="Date"
                            disabled={edit !== null && !editing}
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Textfield
                            name="montant_rec"
                            label="Montant réclamé"
                            type="number"
                            disabled={edit !== null && !editing}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Textfield
                            disabled={!isAdmin}
                            name="ajust"
                            label="Ajustement"
                            type="number"
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Box mt={1}>
                          <Checkbox
                            name="tax"
                            disabled={edit !== null && !editing}
                            legend="Taxable ?"
                            label="oui"
                          />
                        </Box>
                      </Grid>
                      <Stack direction="row-reverse" spacing={1} mt={2}>
                        <Submit
                          variant="contained"
                          disabled={!isAdmin && edit !== null && !editing}
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
                          onClick={handleClose}
                          size="small"
                          startIcon={<CloseIcon />}
                        >
                          Annuler
                        </Button>
                      </Stack>
                      <Stack direction="row-reverse" spacing={1} mt={2}>
                        <Button
                          size="small"
                          color="error"
                          variant="contained"
                          startIcon={<CloudUploadIcon />}
                        >
                          Upload
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          startIcon={<RemoveRedEyeIcon />}
                        >
                          Aperçuu
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
  factures: selectFacturesMemo,
  dossiers: selectDossiers,
  population: selectPop,
});

const mapDispatchToProps = (dispatch) => ({
  addFactures: (newFacts) => dispatch(addFactures(newFacts)),
  addInfosDossier: (newInfos) => dispatch(addInfosDossier(newInfos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FactureModalForm);
