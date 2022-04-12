import React, { useState } from "react";

// FORMIK and YUP
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { connect } from "react-redux";
import { addFactures } from "../../../redux/Factures/Factures.actions";
import { addSites } from "../../../redux/Sites/Sites.actions";
import { addInfosDossier } from "../../../redux/DossierInfos/infosDossier.actions";

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

import Textfield from "../../../Components/FormUI/Textfield";
import Select from "../../../Components/FormUI/SelectDossier";
import SelectPrejudice from "../../../Components/FormUI/SelectPrejudice";
import SelectSites from "../../../Components/FormUI/SelectSites";
import DatePicker from "../../../Components/FormUI/DateTime";
import Checkbox from "../../../Components/FormUI/Checkbox";
import Submit from "../../../Components/FormUI/Submit";

import EditIcon from "@mui/icons-material/Edit";

const FactureModalFormDos = ({
  prejudices,
  closeModal,
  sites,
  numDos,
  dossiers,
  addFactures,
  addSites,
  addInfosDossier,
  factures,
  setFacToEdit,
  edit,
}) => {
  const [validDate, setValiDate] = useState("2010-01-01");
  const [editing, setEditing] = useState(false);
  var today = new Date();

  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  let INITIAL_FORM_STATE;
  if (edit !== null) {
    var [dosFacEdit, idFacEdit] = edit.split(";");
    idFacEdit = parseInt(idFacEdit);
    const facVals = factures[dosFacEdit].find((fac) => fac.id === idFacEdit);
    const sitesList = sites[dosFacEdit].map((site) => site.site);
    console.log(sitesList);
    let siteId = sitesList.findIndex(
      (site, index) => site === facVals.site_con
    );

    INITIAL_FORM_STATE = {
      numDos: dosFacEdit,
      id: idFacEdit,
      desc_fact: facVals.desc_fact,
      date_fact: facVals.date_fact,
      type: facVals.type,
      montant_rec: facVals.montant_rec,
      ajust: facVals.ajust,
      fournis: facVals.fournis,
      site_con: siteId,
      tax: facVals.tax,
    };
  } else {
    INITIAL_FORM_STATE = {
      numDos: "",
      id: "",
      desc_fact: "",
      date_fact: "",
      type: "",
      fournis: "",
      montant_rec: 0,
      ajust: 0,
      site_con: "",
      tax: false,
    };
  }

  const FORM_VALIDATION = Yup.object().shape({
    numDos: Yup.string().required("Champ obligatoire"),
    type: Yup.string().required("Champ obligatoire"),
    site_con: Yup.string().when("type", {
      is: "dab", // alternatively: (val) => val == true
      then: (schema) => schema.required("Champ obligatoire"),
    }),
    date_fact: Yup.date()
      .typeError("INVALID_DATE")
      .min(validDate, `La date ne peut pas précéder le ${validDate}`)
      .max(date, `La date doit être égale ou postérieure à aujourd'hui`)
      .required("Champ obligatoire"),
    desc_fact: Yup.string().required("Champ obligatoire"),
    fournis: Yup.string().required("Champ obligatoire"),
    montant_rec: Yup.number()
      .min(0, "Valeur négatif !")
      .required("Champ obligatoire"),
  });
  const dosCopy = JSON.parse(JSON.stringify(dossiers));
  const sitesCopy = JSON.parse(JSON.stringify(sites));

  const handleSubmit = (values, { resetForm }) => {
    const dosInt = values.numDos;
    let newFacts = JSON.parse(JSON.stringify(factures));
    let factureDos = newFacts[dosInt];
    let id;
    const ids = factureDos
      .map((fac) => fac.id)
      .sort(function (a, b) {
        return a - b;
      });
    id = ids.length ? ids[ids.length - 1] + 1 : 0;
    const siteToAdd = sites[dosInt].map((site) => site.site)[values.site_con];
    let facId;

    if (edit !== null) {
      facId = idFacEdit;
    } else {
      facId = id;
    }
    const newFact = {
      id: facId,
      desc_fact: values.desc_fact,
      date_fact: values.date_fact,
      type: values.type,
      montant_rec: values.montant_rec,
      site_con: siteToAdd,
      tax: values.tax,
      fournis: values.fournis,
      ajust: values.ajust,
    };

    if (edit === null) {
      factureDos.push({ ...newFact });
    } else {
      const otherFacs = factureDos.filter((fac) => fac.id !== idFacEdit);
      factureDos = [...otherFacs, { ...newFact }].sort((a, b) =>
        a.id >= b.id ? 1 : -1
      );
    }

    Object.keys(newFacts).forEach(function (key, index) {
      if (key === dosInt) {
        newFacts[key] = factureDos;
      }
    });
    addFactures(newFacts);

    const dosId = values.numDos;
    const siteId = siteToAdd;

    const dosToEdit = dosCopy.find((dossier) => dossier.id === dosId);
    if (edit === null) {
      dosToEdit.MR = dosToEdit.MR + values.montant_rec;
      const otherDoses = dosCopy.filter((dossier) => dossier.id !== dosId);
      addInfosDossier(
        [...otherDoses, dosToEdit].sort((a, b) => (a.id >= b.id ? 1 : -1))
      );
      if (values.type === "dab") {
        const siteDos = sitesCopy[dosId];
        const siteToEdit = siteDos.find((site) => site.site === siteId);
        const otherSites = siteDos.filter((site) => site.site !== siteId);
        siteToEdit.f_montant_rec =
          siteToEdit.f_montant_rec + values.montant_rec;
        siteToEdit.montant_rec = siteToEdit.montant_rec + values.montant_rec;
        Object.keys(sitesCopy).forEach((item, key) => {
          if (key === dosId) sitesCopy[key] = [...otherSites, siteToEdit];
        });
        addSites(sitesCopy);
      }
    }

    resetForm();
    closeModal();
    setFacToEdit(null);
    setEditing(false);
  };

  const handleClose = () => {
    if (edit !== null) {
      setFacToEdit(null);
    }
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
              validateOnMount
            >
              {(formikProps) => {
                const { values, isValid } = formikProps;

                return (
                  <Form>
                    <Grid item>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="h5" mb={1}>
                          {edit !== null ? "Modification" : "Ajout facture"}
                        </Typography>
                        {edit !== null ? (
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
                      <Grid item xs={12}>
                        <Select
                          dossiers={dossiers}
                          setValiDate={setValiDate}
                          name="numDos"
                          label="Numéro dossier"
                          options={numDos}
                          disabled={edit !== null}
                        />
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <SelectPrejudice
                            name="type"
                            label="Préjudice"
                            defaultValue=""
                            options={prejudices}
                            dossiers={dossiers}
                            edit={edit}
                            disabled={
                              values.numDos === "" ||
                              (edit !== null && !editing)
                            }
                          />
                        </Grid>

                        {values.type === "dab" ? (
                          <Grid item xs={6}>
                            <SelectSites
                              defaultValue=""
                              name="site_con"
                              edit={edit}
                              label="Site concerné"
                              sites={sites}
                              disabled={
                                values.type !== "dab" ||
                                (edit !== null && !editing)
                              }
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
                            disabled={
                              values.numDos === "" ||
                              (edit !== null && !editing)
                            }
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
                            disabled
                            name="ajust"
                            label="Ajustement"
                            type="number"
                          />
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <Box mt={1}>
                          <Checkbox
                            disabled={edit !== null && !editing}
                            name="tax"
                            legend="Taxable ?"
                            label="oui"
                          />
                        </Box>
                      </Grid>
                      <Stack direction="row-reverse" spacing={1} mt={2}>
                        <Submit
                          disabled={(edit !== null && !editing) || !isValid}
                          variant="contained"
                          size="small"
                        >
                          {edit !== null ? "Modifier" : "Enregistrer"}
                        </Submit>
                        <Button
                          type="reset"
                          size="small"
                          disabled={edit !== null && !editing}
                          startIcon={<UndoIcon />}
                        >
                          Réinitialiser
                        </Button>
                        <Button
                          onClick={handleClose}
                          size="small"
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
  addFactures: (newFacts) => dispatch(addFactures(newFacts)),
  addInfosDossier: (newInfos) => dispatch(addInfosDossier(newInfos)),
  addSites: (newSites) => dispatch(addSites(newSites)),
});

export default connect(null, mapDispatchToProps)(FactureModalFormDos);
