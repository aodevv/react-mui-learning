import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// ICONS
import { Container, Grid, Typography, Box, Button, Stack } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import CloseIcon from "@mui/icons-material/Close";

// FORMIK and YUP
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Custom componenets
import CardWrapper from "../../Components/CardWrapper/CardWrapper";

import Textfield from "../../Components/FormUI/Textfield";
import Select from "../../Components/FormUI/Select";
import DatePicker from "../../Components/FormUI/DateTime";
import Checkbox from "../../Components/FormUI/Checkbox";
import Submit from "../../Components/FormUI/Submit";

import SalaireTotal from "../SalairesForm/SalaireTotal";

const SalairesForm = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const INITIAL_FORM_STATE = {
    id: null,
    name: "",
    status: "",
    date_per: "",
    montant_rec: 0,
    Hreg: 0,
    Hsup: 0,
    Treg: 0,
    Tsup: 0,
    taux_vac: 0,
    ae: false,
    rrq: false,
    rqap: false,
    fss: false,
    csst: false,
  };

  const exitForm = () => {
    navigate(pathname.split("/").slice(0, -1).join("/"));
  };

  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string().required("Chanmp obligatoire"),
    taux_vac: Yup.number()
      .max(100, "Ne doit pas dépasser 100%")
      .required("Requis"),
  });
  const handleSubmit = (values) => {
    console.log(values);
  };
  const data = {
    occ: "Occasionel",
    reg: "Régulier",
  };
  return (
    <>
      <CardWrapper title="Salaires form">
        <Grid container>
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
                    <Grid item lg={10} xl={8}>
                      <Typography mb={1}>Formulaire</Typography>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Textfield name="name" label="Nom" />
                        </Grid>
                        <Grid item xs={6}>
                          <Select name="status" label="Status" options={data} />
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <DatePicker name="date_per" label="Date" />
                      </Grid>
                      <Typography mt={1}>Heures</Typography>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Textfield
                            name="Hreg"
                            label="Heures régulières"
                            type="number"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Textfield
                            name="Hsup"
                            label="Heures sup"
                            type="number"
                          />
                        </Grid>
                      </Grid>
                      <Typography mt={1}>Taux</Typography>
                      <Grid container spacing={1}>
                        <Grid item xs={4}>
                          <Textfield
                            name="Treg"
                            label="Taux régulier"
                            type="number"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Textfield
                            name="Tsup"
                            label="Taux sup"
                            type="number"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Textfield
                            name="taux_vac"
                            label="Taux vacances"
                            type="number"
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
                      <Grid item xs={12}>
                        <Box mt={2}>
                          <Typography variant="h4">
                            Salaire réclamé:{" "}
                            <Box sx={{ fontWeight: 600, display: "inline" }}>
                              {/* {`$ ${ins1000Sep(formatNum(values.cout))}`} */}
                              <SalaireTotal />
                            </Box>
                          </Typography>
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
                          size="small"
                          onClick={exitForm}
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
      </CardWrapper>
    </>
  );
};

export default SalairesForm;
