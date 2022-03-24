import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectFacturesMemo } from "../../../redux/Factures/Factures.selectors";
import { addFactures } from "../../../redux/Factures/Factures.actions";

// FORMIK and YUP
import { Formik, Form } from "formik";
import * as Yup from "yup";

// MUI ICONS
import { Container, Grid, Typography, Box, Button, Stack } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import CloseIcon from "@mui/icons-material/Close";

import Textfield from "../../../Components/FormUI/Textfield";
import Select from "../../../Components/FormUI/Select";
import DatePicker from "../../../Components/FormUI/DateTime";
import Checkbox from "../../../Components/FormUI/Checkbox";
import Submit from "../../../Components/FormUI/Submit";

const FactureModalForm = ({
  globalValues,
  prejudices,
  closeModal,
  date,
  existing,
  factures,
  addFactures,
}) => {
  const INITIAL_FORM_STATE = {
    id: "",
    desc_fact: "",
    date_fact: "",
    type: "",
    montant_rec: 0,
    ajust: 0,
    site_con: "",
    tax: false,
  };
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
        `La date ne peut pas précéder la date de l'événement`
      )
      .max(date, `La date doit être égale ou postérieure à aujourd'hui`)
      .required("Champ obligatoire"),
    desc_fact: Yup.string().required("Champ obligatoire"),
    montant_rec: Yup.number()
      .min(0, "Valeur négatif !")
      .required("Champ obligatoire"),
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

  const sites = globalValues.sites.map((site) => site.site);

  const handleSubmit = (values) => {
    let id;
    let newFactures = globalValues.factures;
    const ids = newFactures
      .map((fac) => fac.id)
      .sort(function (a, b) {
        return a - b;
      });
    if (values.type === "dab") {
      globalValues.sites[values.site_con].montant_rec =
        globalValues.sites[values.site_con].montant_rec + values.montant_rec;
      globalValues.sites[values.site_con].f_montant_rec =
        globalValues.sites[values.site_con].f_montant_rec + values.montant_rec;
    }
    id = ids.length ? ids[ids.length - 1] + 1 : 0;
    values.id = id;
    //values.site_con = sites[values.site_con];
    newFactures = Object.assign([], newFactures);
    newFactures.push({ ...values, site_con: sites[values.site_con] });
    if (existing) {
      let newFacts = JSON.parse(JSON.stringify(factures));
      const dosInt = globalValues.numero;
      Object.keys(newFacts).forEach(function (key, index) {
        if (parseInt(key) === dosInt) {
          newFacts[key] = newFactures;
        }
      });
      addFactures(newFacts);
    }
    globalValues.factures = newFactures;

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
                        Ajout facture
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Select
                            name="type"
                            label="Préjudice"
                            options={filteredPrejudices}
                            disabled={
                              !Object.keys(filteredPrejudices).length > 0
                            }
                          />
                        </Grid>
                        {values.type === "dab" ? (
                          <Grid item xs={6}>
                            <Select
                              name="site_con"
                              label="Site concerné"
                              options={sites}
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
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DatePicker name="date_fact" label="Date" />
                      </Grid>

                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Textfield
                            name="montant_rec"
                            label="Montant réclamé"
                            type="number"
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

const mapStateToProps = createStructuredSelector({
  factures: selectFacturesMemo,
});

const mapDispatchToProps = (dispatch) => ({
  addFactures: (newFacts) => dispatch(addFactures(newFacts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FactureModalForm);
