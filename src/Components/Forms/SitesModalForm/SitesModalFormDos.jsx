import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
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

const SitesModalFormDos = ({ sites, numDos, addSites, closeModal }) => {
  const INITIAL_FORM_STATE = {
    numDos: "",
    id: "",
    site: "",
    nature: "",
    part_end: "",
    pourc_end: 0,
    type_ret: "",
    pourc_adm: 0,
  };
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
    const siteDos = newSites[dosInt];
    let id;
    const ids = siteDos
      .map((fac) => fac.id)
      .sort(function (a, b) {
        return a - b;
      });
    id = ids.length ? ids[ids.length - 1] + 1 : 0;

    const newSite = {
      id: id,
      site: values.site,
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
    siteDos.push(newSite);
    Object.keys(newSites).forEach(function (key, index) {
      if (key === dosInt) {
        newSites[key] = siteDos;
      }
    });

    addSites(newSites);
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
              onSubmit={handleSubmit}
              validationSchema={FORM_VALIDATION}
            >
              {(formikProps) => {
                const { values, isValid } = formikProps;

                return (
                  <Form>
                    <Typography variant="h5" mb={1}>
                      Ajout site
                    </Typography>
                    <Grid item xs={12}>
                      <SelectDossier
                        name="numDos"
                        label="Numéro dossier"
                        options={numDos}
                      />
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Select
                          defaultValue=""
                          name="site"
                          label="Site"
                          sites={sites}
                          allSites={SiteTempData}
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
                        <Textfield name="type_ret" label="Type rétabli" />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Textfield
                          name="pourc_end"
                          label="Pourcentage endommagé"
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

                    <Stack direction="row" spacing={1} mt={2}>
                      <Submit
                        disabled={!isValid}
                        variant="contained"
                        size="small"
                      >
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
