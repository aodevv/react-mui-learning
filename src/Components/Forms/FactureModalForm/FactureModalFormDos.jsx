import React from "react";

// FORMIK and YUP
import { Formik, Form } from "formik";
//import * as Yup from "yup";

import { connect } from "react-redux";
import { addFactures } from "../../../redux/Factures/Factures.actions";

// MUI ICONS
import { Container, Grid, Typography, Box, Button, Stack } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import CloseIcon from "@mui/icons-material/Close";

import Textfield from "../../../Components/FormUI/Textfield";
import Select from "../../../Components/FormUI/SelectDossier";
import SelectPrejudice from "../../../Components/FormUI/SelectPrejudice";
import SelectSites from "../../../Components/FormUI/SelectSites";
import DatePicker from "../../../Components/FormUI/DateTime";
import Checkbox from "../../../Components/FormUI/Checkbox";
import Submit from "../../../Components/FormUI/Submit";

const FactureModalFormDos = ({
  prejudices,
  closeModal,
  date,
  sites,
  numDos,
  dossiers,
  addFactures,
  factures,
}) => {
  const INITIAL_FORM_STATE = {
    numDos: "",
    id: "",
    desc_fact: "",
    date_fact: "",
    type: "",
    montant_rec: "",
    site_con: "",
    tax: false,
  };

  const handleSubmit = (values, { resetForm }) => {
    const dosInt = parseInt(values.numDos);
    let newFacts = JSON.parse(JSON.stringify(factures));
    const factureDos = newFacts[dosInt];
    let id;
    const ids = factureDos
      .map((fac) => fac.id)
      .sort(function (a, b) {
        return a - b;
      });
    id = ids.length ? ids[ids.length - 1] + 1 : 0;
    values.id = id;

    const siteToAdd = sites[dosInt].map((site) => site.site)[values.site_con];
    const newFact = {
      id: values.id,
      desc_fact: values.desc_fact,
      date_fact: values.date_fact,
      type: values.type,
      montant_rec: values.montant_rec,
      site_con: siteToAdd,
      tax: values.tax,
    };
    factureDos.push(newFact);
    Object.keys(newFacts).forEach(function (key, index) {
      if (key === dosInt) {
        newFacts[key] = factureDos;
      }
    });
    console.log(newFacts);
    addFactures(newFacts);
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
            >
              {(formikProps) => {
                const { values } = formikProps;

                return (
                  <Form>
                    <Grid item>
                      <Typography variant="h5" mb={1}>
                        Ajout facture
                      </Typography>
                      <Grid item xs={12}>
                        <Select
                          name="numDos"
                          label="Numéro dossier"
                          options={numDos}
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
                            disabled={values.numDos === ""}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <SelectSites
                            defaultValue=""
                            name="site_con"
                            label="Site concerné"
                            sites={sites}
                            disabled={values.type !== "dab"}
                          />
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <Textfield
                          name="desc_fact"
                          multiline
                          rows={4}
                          label="Description"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DatePicker
                          name="date_fact"
                          label="Date"
                          disabled={values.numDos === ""}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Textfield
                          name="montant_rec"
                          label="Montant réclamé"
                          type="number"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box mt={1}>
                          <Checkbox name="tax" legend="Taxable ?" label="oui" />
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
                          onClick={closeModal}
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
});

export default connect(null, mapDispatchToProps)(FactureModalFormDos);
