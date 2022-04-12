import React, { useState } from "react";
import { connect } from "react-redux";
import { addSites } from "../../../redux/Sites/Sites.actions";

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
//import Select from "../../../Components/FormUI/Select";
//import DatePicker from "../../../Components/FormUI/DateTime";
//import Checkbox from "../../../Components/FormUI/Checkbox";
import Submit from "../../../Components/FormUI/Submit";
import Select from "../../FormUI/SelectFilterSites";
import SelectDossier from "../../FormUI/SelectDossier";

const SiteTempData = {
  "": "Selectioner",
  "Site 1": "Site 1",
  "Site 2": "Site 2",
  "Site 3": "Site 3",
  "Site 4": "Site 4",
  "Site 5": "Site 5",
  "Site 6": "Site 6",
  "Site 7": "Site 7",
  "Site 16": "Site 16",
};

const SitesModalFormDos = ({
  sites,
  numDos,
  addSites,
  closeModal,
  dossiers,
  edit,
  setSiteToEdit,
}) => {
  const [editing, setEditing] = useState(false);

  let INITIAL_FORM_STATE;

  if (edit !== null) {
    var [dosSiteEdit, idSiteEdit] = edit.split(";");
    idSiteEdit = parseInt(idSiteEdit);
    const siteVals = sites[dosSiteEdit].find((st) => st.id === idSiteEdit);

    INITIAL_FORM_STATE = {
      numDos: dosSiteEdit,
      id: idSiteEdit,
      site: siteVals.site,
      nature: siteVals.nature,
      part_end: siteVals.part_end,
      pourc_end: siteVals.pourc_end,
      type_ret: siteVals.type_ret,
      pourc_adm: siteVals.pourc_adm,
      montant_rec: siteVals.montant_rec,
      f_montant_rec: siteVals.f_montant_rec,
      s_montant_rec: siteVals.s_montant_rec,
      m_montant_rec: siteVals.m_montant_rec,
    };
  } else {
    INITIAL_FORM_STATE = {
      numDos: "",
      id: "",
      site: "",
      nature: "",
      part_end: "",
      pourc_end: 0,
      type_ret: "",
      pourc_adm: 0,
      montant_rec: 0,
      f_montant_rec: 0,
      s_montant_rec: 0,
      m_montant_rec: 0,
    };
  }

  const FORM_VALIDATION = Yup.object().shape({
    numDos: Yup.string().required("Champ obligatoire"),
    site: Yup.string().required("Champ obligatoire"),
    nature: Yup.string().required("Champ obligatoire"),
    type_ret: Yup.string().required("Champ obligatoire"),
    part_end: Yup.string().required("Champ obligatoire"),
    pourc_adm: Yup.number()
      .min(0, "Valeur négative !")
      .max(100, "Ne peux pas depasser 100%")
      .required("Champ obligatoire"),
    pourc_end: Yup.number()
      .min(0, "Valeur négative !")
      .max(100, "Ne peux pas depasser 100%")
      .required("Champ obligatoire"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const dosInt = values.numDos;
    let newSites = JSON.parse(JSON.stringify(sites));
    let siteDos = newSites[dosInt];
    let id;
    const ids = siteDos
      .map((fac) => fac.id)
      .sort(function (a, b) {
        return a - b;
      });
    id = ids.length ? ids[ids.length - 1] + 1 : 0;
    let siteId;

    if (edit !== null) {
      siteId = idSiteEdit;
    } else {
      siteId = id;
    }

    const newSite = {
      id: siteId,
      site: values.site,
      nature: values.nature,
      part_end: values.part_end,
      pourc_end: values.pourc_end,
      type_ret: values.type_ret,
      pourc_adm: values.pourc_adm,
      montant_rec: values.montant_rec,
      f_montant_rec: values.f_montant_rec,
      s_montant_rec: values.s_montant_rec,
      m_montant_rec: values.m_montant_rec,
    };
    if (edit === null) {
      siteDos.push({ ...newSite });
    } else {
      const otherFacs = siteDos.filter((fac) => fac.id !== idSiteEdit);
      siteDos = [...otherFacs, { ...newSite }].sort((a, b) =>
        a.id >= b.id ? 1 : -1
      );
    }
    //siteDos.push(newSite);
    Object.keys(newSites).forEach(function (key, index) {
      if (key === dosInt) {
        newSites[key] = siteDos;
      }
    });

    addSites(newSites);
    resetForm();
    handleClose();
  };

  const handleClose = () => {
    if (edit !== null) {
      setSiteToEdit(null);
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
              onSubmit={handleSubmit}
              validationSchema={FORM_VALIDATION}
            >
              {(formikProps) => {
                const { values, isValid } = formikProps;

                return (
                  <Form>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="h5" mb={1}>
                        {edit !== null ? "Modification" : "Ajout site"}
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
                      <SelectDossier
                        dossiers={dossiers}
                        name="numDos"
                        label="Numéro dossier"
                        options={numDos}
                        disabled={edit !== null}
                      />
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Select
                          defaultValue=""
                          name="site"
                          label="Site"
                          edit={edit}
                          sites={sites}
                          allSites={SiteTempData}
                          siteIfEdit={values.site}
                          disabled={edit !== null}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Textfield
                          name="nature"
                          disabled={edit !== null && !editing}
                          label="Nature"
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Textfield
                          name="part_end"
                          disabled={edit !== null && !editing}
                          label="Partie endommagée"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Textfield
                          name="type_ret"
                          disabled={edit !== null && !editing}
                          label="Type rétabli"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Textfield
                          name="pourc_end"
                          label="Pourcentage endommagé"
                          disabled={edit !== null && !editing}
                          type="number"
                          min={0}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">%</InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Textfield
                          name="pourc_adm"
                          disabled={edit !== null && !editing}
                          label="Pourcentage admissible"
                          type="number"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">%</InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>

                    {/* <Grid item xs={6} mt={1}>
                      <Box>
                        <Checkbox
                          name="adm"
                          legend="Admissible ?"
                          label="oui"
                        />
                      </Box>
                    </Grid> */}

                    <Stack direction="row-reverse" spacing={1} mt={2}>
                      <Submit
                        disabled={!isValid || (edit !== null && !editing)}
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
  addSites: (newSites) => dispatch(addSites(newSites)),
});

export default connect(null, mapDispatchToProps)(SitesModalFormDos);
