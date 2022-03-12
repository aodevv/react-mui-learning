import React, { useEffect } from "react";

// MUI ICONS
import { Container, Grid, Typography, Button } from "@mui/material";

// FORMIK and YUP
import { Formik, Form } from "formik";
import * as Yup from "yup";

import CardWrapper from "../../../Components/CardWrapper/CardWrapper";

import Textfield from "../../../Components/FormUI/Textfield";
import DatePicker from "../../../Components/FormUI/DateTime";
import Checkbox from "../../FormUI/Checkbox";
import Submit from "../../../Components/FormUI/Submit";

const InfosDossierForm = ({ values }) => {
  return (
    <>
      <CardWrapper title="Infos dossier">
        <Grid container>
          <Grid item xs={12}>
            <Grid item lg={10} xl={8}>
              <Grid container spacing={2} mb={1}>
                <Grid item xs={4}>
                  <Textfield name="id" label="Identification dossier" />
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
                    disabled={values.date_ev ? false : true}
                    name="date_ouv"
                    label="Date d'ouverture"
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Textfield
                  name="desc_ev"
                  multiline
                  rows={4}
                  label="Description"
                />
              </Grid>
              <Grid container mt={1} pl={2} spacing={2}>
                <Grid item xs={2} l={1}>
                  <Checkbox name="dab" label="DAB" />
                </Grid>
                <Grid item xs={2} l={1}>
                  <Checkbox name="mpt" label="MPT" />
                </Grid>
                <Grid item xs={2} l={1}>
                  <Checkbox name="mi" label="MI" />
                </Grid>
                <Grid item xs={2} l={1}>
                  <Checkbox name="bcg" label="BCG" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardWrapper>
    </>
  );
};

export default InfosDossierForm;
