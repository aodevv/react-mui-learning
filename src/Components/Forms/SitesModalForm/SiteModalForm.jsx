import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectSitesMemo } from "../../../redux/Sites/Sites.selectors";
import { addSites } from "../../../redux/Sites/Sites.actions";

// ICONS
import { Container, Grid, Typography, Box, Button, Stack } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";

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
};

const SiteModalForm = ({
  closeModal,
  globalValues,
  existing,
  allSites,
  addSites,
}) => {
  const INITIAL_FORM_STATE = {
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

  const sites = globalValues.sites.map((site) => site.site);

  const test = Object.keys(SiteTempData)
    .filter((key) => !sites.includes(key))
    .reduce((obj, key) => {
      obj[key] = SiteTempData[key];
      return obj;
    }, {});

  const filteredSites = Object.keys(SiteTempData).filter(
    (key) => !sites.includes(SiteTempData[key])
  );

  const handleSubmit = (values) => {
    let id;
    console.log(filteredSites);
    console.log(values);

    let newSite = globalValues.sites;
    // const ids = newSite
    //   .map((site) => site.id)
    //   .sort(function (a, b) {
    //     return a - b;
    //   });
    id = values.site;
    values.id = id;
    let newVals = {
      id: id,
      site: filteredSites[parseInt(values.site)],
      nature: values.nature,
      part_end: values.part_end,
      pourc_end: values.pourc_end,
      type_ret: values.type_ret,
      pourc_adm: values.pourc_adm,
      montant_rec: 0,
      f_montant_rec: 0,
      s_montant_rec: 0,
      m_montant_rec: 0,
    };
    newSite = Object.assign([], newSite);
    newSite.push(newVals);
    if (existing) {
      console.log("floo");
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
                    <Typography variant="h5" mb={1}>
                      Ajout site
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Select
                          name="site"
                          label="Site"
                          options={filteredSites}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Textfield name="nature" label="Nature" />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Textfield name="part_end" label="Partie endommagée" />
                      </Grid>

                      <Grid item xs={6}>
                        <Textfield
                          name="pourc_end"
                          label="Pourcentage endommagé"
                          type="number"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">%</InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Textfield name="type_ret" label="Type rétabli" />
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
                      <Submit variant="contained" size="small">
                        Enregistrer
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
