import React from "react";

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
import Select from "../../../Components/FormUI/Select";
import DatePicker from "../../../Components/FormUI/DateTime";
import Checkbox from "../../../Components/FormUI/Checkbox";
import Submit from "../../../Components/FormUI/Submit";

import SalaireTotal from "./SalaireTotal";

import Tsup from "./Tsup";
import Tsup2 from "./Tsup2";

const SalaireModalForm = ({ closeModal, globalValues, prejudices, date }) => {
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

  const INITIAL_FORM_STATE = {
    id: null,
    type: "",
    name: "",
    status: "",
    date_per: "",
    montant_rec: 0,
    Hreg: 0,
    Hsup: 0,
    Hsup2: 0,
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

  const FORM_VALIDATION = Yup.object().shape({
    type: Yup.string().required("Champ obligatoire"),
    name: Yup.string().required("Champ obligatoire"),
    status: Yup.string().required("Champ obligatoire"),
    Hreg: Yup.number().when("status", {
      is: "occ",
      then: Yup.number().min(1, "Champ obligatoire"),
    }),
    Treg: Yup.number().when("status", {
      is: "occ",
      then: Yup.number().min(1, "Champ obligatoire"),
    }),
    taux_vac: Yup.number()
      .max(100, "Ne doit pas dépasser 100%")
      .required("Champ obligatoire"),
    date_per: Yup.date()
      .typeError("INVALID_DATE")
      .min("2012-01-01", `La date doit être après 2012-01-01`)
      .max(date, `La date doit être égale ou postérieure à aujourd'hui`)
      .required("Champ obligatoire"),
    Hsup: Yup.number().min(0, "Valeur négative !"),
    Hsup2: Yup.number().min(0, "Valeur négative !"),
    Tsup: Yup.number().min(0, "Valeur négative !"),
    Tsup2: Yup.number().min(0, "Valeur négative !"),
    montant_rec: Yup.number()
      .min(1, "Aucun montant n'est réclamé")
      .required("Champ obligatoire"),
  });

  const data = {
    occ: "Occasionel",
    reg: "Régulier",
  };
  const handleSubmit = (values) => {
    let id;

    let newSalaires = globalValues.salaires;
    const ids = newSalaires
      .map((sal) => sal.id)
      .sort(function (a, b) {
        return a - b;
      });
    id = ids.length ? ids[ids.length - 1] + 1 : 0;
    values.id = id;
    newSalaires = Object.assign([], newSalaires);
    newSalaires.push(values);
    globalValues.salaires = newSalaires;
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
                const { values, handleReset } = formikProps;
                return (
                  <Form>
                    <Grid item>
                      <Typography variant="h5" mb={1}>
                        Ajout salaire
                      </Typography>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Textfield name="name" label="Nom et prénom" />
                        </Grid>
                        <Grid item xs={6}>
                          <Select name="status" label="Status" options={data} />
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Select
                          name="type"
                          label="Préjudice"
                          options={filteredPrejudices}
                          disabled={!Object.keys(filteredPrejudices).length > 0}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DatePicker name="date_per" label="Date" />
                      </Grid>
                      <Typography mt={1}>Heures</Typography>
                      <Grid container spacing={1}>
                        <Grid item xs={4}>
                          <Textfield
                            name="Hreg"
                            label="Heures régulières"
                            type="number"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Textfield
                            name="Hsup"
                            label="Heures sup"
                            type="number"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Textfield
                            name="Hsup2"
                            label="Heures sup 2"
                            type="number"
                          />
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
                      <Grid item xs={12}>
                        <Box mt={2}>
                          <Typography variant="h5">
                            Salaire réclamé:{" "}
                            <Box sx={{ fontWeight: 600, display: "inline" }}>
                              {/* {`$ ${ins1000Sep(formatNum(values.cout))}`} */}
                              <SalaireTotal name="montant_rec" />
                            </Box>
                          </Typography>
                        </Box>
                      </Grid>
                      <Stack direction="row" spacing={1} mt={2}>
                        <Submit variant="contained" size="small">
                          Ajouter
                        </Submit>
                        <Button
                          onClick={handleReset}
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

export default SalaireModalForm;
