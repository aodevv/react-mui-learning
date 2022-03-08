import React, { useEffect } from "react";

// MUI ICONS
import { Container, Grid, Typography, Button } from "@mui/material";

// FORMIK and YUP
import { Formik, Form } from "formik";
import * as Yup from "yup";

import CardWrapper from "../../../Components/CardWrapper/CardWrapper";

import Textfield from "../../../Components/FormUI/Textfield";
import DatePicker from "../../../Components/FormUI/DateTime";
import Submit from "../../../Components/FormUI/Submit";

const InfosDossierForm = ({ globalValues, currSubmit, setCurrSubmit }) => {
  const INITIAL_FORM_STATE = {
    ...globalValues.infosDossier,
  };

  const handleSubmit = (values) => {
    console.log(values);
    globalValues.infosDossier = values;
  };

  useEffect(() => {
    console.log(document.getElementById("testButton"));
    if (currSubmit === 1) {
      console.log("fired");
      document.getElementById("testButton").click();
      setCurrSubmit(null);
    }
  }, [currSubmit, setCurrSubmit]);

  return (
    <>
      <CardWrapper title="Infos dossier">
        <Grid container>
          <Grid item xs={12}>
            <Container maxWidth="l">
              <Formik
                initialValues={{ ...INITIAL_FORM_STATE }}
                onSubmit={handleSubmit}
              >
                {(formikProps) => {
                  const { values, handleReset, submitForm } = formikProps;
                  return (
                    <Form>
                      <Grid item lg={10} xl={8}>
                        <Typography>Formulaire</Typography>
                        <Grid container spacing={2} mb={1}>
                          <Grid item xs={4}>
                            <Textfield
                              name="id"
                              label="Identification dossier"
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Textfield name="prgm" label="Programme" />
                          </Grid>
                          <Grid item xs={4}>
                            <Textfield name="act_of" label="Acte officiel" />
                          </Grid>
                        </Grid>

                        <Grid container spacing={2} mb={1}>
                          <Grid item xs={6}>
                            <DatePicker name="date_ev" label="Date événement" />
                          </Grid>
                          <Grid item xs={6}>
                            <DatePicker
                              name="date_ouv"
                              label="Date d'ouverture"
                            />
                          </Grid>
                        </Grid>

                        <Grid item xs={12}>
                          <Textfield
                            name="desc_doss"
                            multiline
                            rows={4}
                            label="Description"
                          />
                        </Grid>
                      </Grid>
                      <div id="testButton">
                        <Button type="submit">Next</Button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </Container>
          </Grid>
        </Grid>
      </CardWrapper>
    </>
  );
};

export default InfosDossierForm;
