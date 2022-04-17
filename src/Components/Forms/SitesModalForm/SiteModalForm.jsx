import React, { useState } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectSitesMemo } from "../../../redux/Sites/Sites.selectors";
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
import Select from "../../FormUI/Select";

const SiteTempData = {
  "Site 1": "Site 1",
  "Site 2": "Site 2",
  "Site 3": "Site 3",
  "Site 4": "Site 4",
  "Site 5": "Site 5",
  "Site 6": "Site 6",
  "Site 7": "Site 7",
  "Site 16": "Site 16",
};

const SiteModalForm = ({
  closeModal,
  globalValues,
  existing,
  allSites,
  addSites,
  edit,
  setSiteToEdit,
  role,
}) => {
  console.log(globalValues);
  const [editing, setEditing] = useState(false);
  let INITIAL_FORM_STATE;
  const sites = globalValues.sites.map((site) => site.site);

  if (edit !== null) {
    const sitesArr = Object.keys(SiteTempData).map((key) => SiteTempData[key]);
    console.log(sitesArr);
    console.log(sites);
    console.log(edit);
    console.log(globalValues.sites[edit]);
    let siteName = sitesArr[edit];
    console.log(siteName);
    let siteId = sites.findIndex(
      (site, index) => site === globalValues.sites[edit].site
    );
    siteId = siteId !== -1 ? siteId : "";
    INITIAL_FORM_STATE = {
      id: edit,
      site: siteId,
      nature: globalValues.sites[edit].nature,
      part_end: globalValues.sites[edit].part_end,
      pourc_end: globalValues.sites[edit].pourc_end,
      type_ret: globalValues.sites[edit].type_ret,
      pourc_adm: globalValues.sites[edit].pourc_adm,
      montant_rec: globalValues.sites[edit].montant_rec,
      f_montant_rec: globalValues.sites[edit].f_montant_rec,
      s_montant_rec: globalValues.sites[edit].s_montant_rec,
      m_montant_rec: globalValues.sites[edit].m_montant_rec,
    };
  } else {
    INITIAL_FORM_STATE = {
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
    site: Yup.string().required("Champ obligatoire"),
    nature: Yup.string().required("Champ obligatoire"),
    part_end: Yup.string().required("Champ obligatoire"),
    pourc_end: Yup.number()
      .min(1, "!!!!!!!!")
      .max(100, "Ne peut pas dépasser 100%"),
    pourc_adm: Yup.number()
      .min(0, "Valeur négatif !")
      .max(100, "Ne peut pas dépasser 100%"),
  });

  const test = Object.keys(SiteTempData)
    .filter((key) => !sites.includes(key))
    .reduce((obj, key) => {
      obj[key] = SiteTempData[key];
      return obj;
    }, {});

  const filteredSites = Object.keys(SiteTempData).filter(
    (key) => !sites.includes(SiteTempData[key])
  );

  const filteredSitesEdit = Object.keys(SiteTempData).filter((key) =>
    sites.includes(SiteTempData[key])
  );

  const handleSubmit = (values) => {
    let id, site;

    let newSite = globalValues.sites;
    if (edit !== null) {
      id = parseInt(edit);
      site = filteredSitesEdit[parseInt(values.site)];
    } else {
      let SiteTempDataArr = [];
      Object.keys(SiteTempData).forEach((key) =>
        SiteTempDataArr.push(SiteTempData[key])
      );
      const newId = SiteTempDataArr.findIndex(
        (site) => site === filteredSites[parseInt(values.site)]
      );
      site = filteredSites[parseInt(values.site)];
      id = newId;
    }
    // const ids = newSite
    //   .map((site) => site.id)
    //   .sort(function (a, b) {
    //     return a - b;
    //   });

    values.id = id;
    let newVals = {
      id: id,
      site: site,
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
    newSite = Object.assign([], newSite);
    if (edit === null) {
      newSite.push({ ...newVals });
    } else {
      const otherSites = newSite.filter((fac) => fac.id !== edit);
      newSite = [...otherSites, { ...newVals }].sort((a, b) =>
        a.id >= b.id ? 1 : -1
      );
    }
    //newSite.push(newVals);
    if (existing) {
      //console.log("floo");
      let newSites = JSON.parse(JSON.stringify(allSites));
      const dosInt = globalValues.numero;
      Object.keys(newSites).forEach(function (key, index) {
        if (key === dosInt) {
          newSites[key] = newSite;
        }
      });
      addSites(newSites);
    }
    globalValues.sites = newSite;
    handleClose();
  };

  const handleClose = () => {
    setSiteToEdit(null);
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
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="h5" mb={1}>
                        {edit !== null ? "Modification" : "Ajout site"}
                      </Typography>
                      {edit !== null && role !== "admin" ? (
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

                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Select
                          name="site"
                          label="Site"
                          disabled={edit !== null}
                          options={
                            edit !== null ? filteredSitesEdit : filteredSites
                          }
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Textfield
                          name="nature"
                          label="Nature"
                          disabled={edit !== null && !editing}
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Textfield
                          name="part_end"
                          label="Partie endommagée"
                          disabled={edit !== null && !editing}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Textfield
                          name="pourc_end"
                          label="Pourcentage endommagé"
                          type="number"
                          disabled={edit !== null && !editing}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">%</InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Textfield
                        name="type_ret"
                        label="Type rétabli"
                        disabled={edit !== null && !editing}
                      />
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
                    <Grid container spacing={1} mb={1}>
                      <Grid item xs={6}>
                        <Textfield
                          name="pourc_adm"
                          label="Pourcentage admissible"
                          type="number"
                          disabled={edit !== null && !editing}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">%</InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Textfield
                          disabled
                          name="montant_rec"
                          label="Montant réclamé"
                          type="number"
                        />
                      </Grid>
                    </Grid>

                    <Stack direction="row-reverse" spacing={1} mt={2}>
                      <Submit
                        variant="contained"
                        size="small"
                        disabled={edit !== null && !editing}
                      >
                        Enregistrer
                      </Submit>
                      {edit === null ? (
                        <Button
                          type="reset"
                          size="small"
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

const mapStateToProps = createStructuredSelector({
  allSites: selectSitesMemo,
});

const mapDispatchToProps = (dispatch) => ({
  addSites: (newSites) => dispatch(addSites(newSites)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SiteModalForm);
