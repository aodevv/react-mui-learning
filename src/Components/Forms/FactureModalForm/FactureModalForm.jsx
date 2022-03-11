import React from "react";

// FORMIK and YUP
import { Formik, Form } from "formik";
import * as Yup from "yup";

// MUI ICONS
import { Container, Grid, Typography, Box, Button, Stack } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import CloseIcon from "@mui/icons-material/Close";

import CardWrapper from "../../../Components/CardWrapper/CardWrapper";

import Textfield from "../../../Components/FormUI/Textfield";
import Select from "../../../Components/FormUI/Select";
import DatePicker from "../../../Components/FormUI/DateTime";
import Checkbox from "../../../Components/FormUI/Checkbox";
import Submit from "../../../Components/FormUI/Submit";

import data from "./data.json";

const FactureModalForm = ({ globalValues, prejudices }) => {
  const INITIAL_FORM_STATE = {
    id: "",
    desc_fact: "",
    date_fact: "",
    montant_rec: "",
    site_con: "",
    tax: false,
  };

  const handleSubmit = (values) => {
    let newFactures = globalValues.factures;
    newFactures = Object.assign([], newFactures);
    console.log(newFactures, values);
    newFactures.push(values);
    globalValues.factures = newFactures;
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
              <Form>
                <Grid item>
                  <Typography variant="h5" mb={1}>
                    Ajout facture
                  </Typography>
                  <Grid item xs={12}>
                    <Textfield name="id" label="ID" />
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

                  <Grid item xs={12}>
                    <Select
                      name="site_con"
                      label="Site concerné"
                      options={data}
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
                    <Button type="reset" size="small" startIcon={<UndoIcon />}>
                      Réinitialiser
                    </Button>
                    <Button size="small" startIcon={<CloseIcon />}>
                      Annuler
                    </Button>
                  </Stack>
                </Grid>
              </Form>
            </Formik>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default FactureModalForm;
