import React from "react";

// FORMIK and YUP
import { Formik, Form } from "formik";
//import * as Yup from "yup";

import { connect } from "react-redux";
import { addPayroll } from "../../../redux/Salaires/salaires.actions";

// MUI ICONS
import { Container, Grid, Typography, Box, Button, Stack } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";

import Textfield from "../../../Components/FormUI/Textfield";
import Select from "../../../Components/FormUI/Select";
import Checkbox from "../../../Components/FormUI/Checkbox";
import Submit from "../../../Components/FormUI/Submit";

import Tsup from "../SalaireModalForm/Tsup";
import Tsup2 from "../SalaireModalForm/Tsup2";

const SalaireModalFormDos = ({ closeModal, payroll, addPayroll }) => {
  const INITIAL_FORM_STATE = {
    nom: "",
    prenom: "",
    status: "",
    Treg: 0,
    Tsup: 0,
    Tsup2: 0,
    taux_vac: 0,
    ae: false,
    rrq: false,
    rqap: false,
    fss: false,
    csst: false,
  };

  const data = {
    occ: "Occasionel",
    reg: "Régulier",
  };

  const handleSubmit = (values, { resetForm }) => {
    let newPays = JSON.parse(JSON.stringify(payroll));
    let id;
    const ids = payroll
      .map((pay) => pay.id)
      .sort(function (a, b) {
        return a - b;
      });
    id = ids.length ? ids[ids.length - 1] + 1 : 0;

    const newPay = {
      id: id,
      nom: values.nom,
      prenom: values.prenom,
      status: values.status,
      Treg: values.Treg,
      Tsup: values.Tsup,
      Tsup2: values.Tsup2,
      taux_vac: values.taux_vac,
      ae: values.ae,
      rrq: values.rrq,
      rqap: values.rqap,
      fss: values.fss,
      csst: values.csst,
    };
    newPays.push(newPay);

    addPayroll(newPays);
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
                        Ajout salarié
                      </Typography>
                      <Grid container spacing={1}>
                        <Grid item xs={4}>
                          <Textfield name="nom" label="Nom" />
                        </Grid>
                        <Grid item xs={4}>
                          <Textfield name="prenom" label="Prénom" />
                        </Grid>
                        <Grid item xs={4}>
                          <Select name="status" label="Status" options={data} />
                        </Grid>
                      </Grid>
                      <Typography mt={1}>Taux</Typography>
                      <Grid container spacing={1}>
                        <Grid item xs={3}>
                          <Textfield
                            name="Treg"
                            label="Taux régulier"
                            type="number"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Tsup name="Tsup" label="Taux sup" type="number" />
                        </Grid>
                        <Grid item xs={3}>
                          <Tsup2
                            name="Tsup2"
                            label="Taux sup 2"
                            type="number"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Textfield
                            name="taux_vac"
                            label="Taux vacances"
                            type="number"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container mt={1} pl={2} spacing={2}>
                        <Grid item xs={2} l={1}>
                          <Checkbox name="ae" label="AE" />
                        </Grid>
                        <Grid item mr={2} xs={2} l={1}>
                          <Checkbox name="rrq" label="RRQ" />
                        </Grid>
                        <Grid item mr={2} xs={2} l={1}>
                          <Checkbox name="rqap" label="RQAP" />
                        </Grid>
                        <Grid item xs={2} l={1}>
                          <Checkbox name="fss" label="FSS" />
                        </Grid>
                        <Grid item xs={2} l={1}>
                          <Checkbox name="csst" label="CSST" />
                        </Grid>
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
                          size="small"
                          onClick={closeModal}
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
  addPayroll: (newSals) => dispatch(addPayroll(newSals)),
});

export default connect(null, mapDispatchToProps)(SalaireModalFormDos);
