import React from "react";

import { Container, Grid, Typography, Box, Button, Stack } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";
import CloseIcon from "@mui/icons-material/Close";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import CardWrapper from "../../Components/CardWrapper/CardWrapper";

import Textfield from "../../Components/FormUI/Textfield";
import Select from "../../Components/FormUI/Select";
import DatePicker from "../../Components/FormUI/DateTime";
import Checkbox from "../../Components/FormUI/Checkbox";
import Submit from "../../Components/FormUI/Submit";

import data from "./data.json";

const INITIAL_FORM_STATE = {
  id: "",
  desc: "",
  date: "",
  mRec: "",
  siteConc: "",
  check: false,
};

const FORM_VALIDATION = Yup.object().shape({
  id: Yup.string().required("Champ obligatoire"),
  desc: Yup.string(),
  date: Yup.date("Date invalide").required("Champ obligatoire"),
  mRec: Yup.number("Montant invalide").required("Champ obligatoire"),
  siteConc: Yup.string().required("Champ obligatoire"),
  check: Yup.boolean().oneOf([true], "Ok").required("Must be accepted"),
});

const FactureForm = () => {
  return (
    <div>
      <CardWrapper title="Factures form">
        <Grid container>
          <Grid item xs={12}>
            <Container maxWidth="l">
              <Formik
                initialValues={{ ...INITIAL_FORM_STATE }}
                validationSchema={FORM_VALIDATION}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                <Form>
                  <Grid item lg={10} xl={8}>
                    <Typography>Formulaire</Typography>
                    <Grid item xs={12}>
                      <Textfield name="id" label="ID" />
                    </Grid>

                    <Grid item xs={12}>
                      <Textfield
                        name="desc"
                        multiline
                        rows={4}
                        label="Description"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <DatePicker name="date" label="Date" />
                    </Grid>

                    <Grid item xs={12}>
                      <Select
                        name="siteConc"
                        label="Site concerné"
                        options={data}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Textfield
                        name="mRec"
                        label="Montant réclamé"
                        type="number"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box mt={1}>
                        <Checkbox name="check" legend="Taxable ?" label="oui" />
                      </Box>
                    </Grid>
                    <Stack direction="row" spacing={1} mt={2}>
                      <Submit variant="contained" size="small">
                        Ajouter
                      </Submit>
                      <Button size="small" startIcon={<UndoIcon />}>
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
      </CardWrapper>
    </div>
  );
};

export default FactureForm;
