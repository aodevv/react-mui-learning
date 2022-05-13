import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectSitesList } from "../../../redux/Sites/Sites.selectors";
import { addSitesToList } from "../../../redux/Sites/Sites.actions";

// FORMIK and YUP
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import UndoIcon from "@mui/icons-material/Undo";
import CloseIcon from "@mui/icons-material/Close";

import Textfield from "../../../Components/FormUI/Textfield";
import Submit from "../../../Components/FormUI/Submit";

const NewSiteModalForm = ({ closeModal, role, sites, addSitesToList }) => {
  const oldSitesArr = Object.keys(sites).map((site) => site.toLowerCase());
  const INITIAL_FORM_STATE = {
    nom: "",
    adress: "",
    codePostal: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    nom: Yup.string()
      .required("Champ obligatoire")
      .test("unique", "Ce site existe déjà", (value) =>
        value
          ? !oldSitesArr.includes(
              value.toLowerCase().trim().replace(/\s\s+/g, " ")
            )
          : false
      ),
  });

  const handleSubmit = (values, { resetForm }) => {
    let newSites = sites;
    newSites[values.nom] = values.nom;
    addSitesToList(newSites);

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
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="h5" mb={1}>
                        Ajout site
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Textfield name="nom" label="Nom site" />
                      </Grid>
                      <Grid item xs={4}>
                        <Textfield name="adress" label="Adresse" />
                      </Grid>
                      <Grid item xs={4}>
                        <Textfield name="codePostal" label="Code postal" />
                      </Grid>
                    </Grid>
                    <Stack direction="row-reverse" spacing={1} mt={2}>
                      <Submit
                        disabled={role !== "admin" || !isValid}
                        variant="contained"
                        size="small"
                      >
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
  sites: selectSitesList,
});

const mapDispatchToProps = (dispatch) => ({
  addSitesToList: (newList) => dispatch(addSitesToList(newList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewSiteModalForm);
