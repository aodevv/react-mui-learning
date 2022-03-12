import React from "react";

// ICONS
import { Container, Grid, Typography, Box, Button, Stack } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import CloseIcon from "@mui/icons-material/Close";

// FORMIK and YUP
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Custom componenets

import Textfield from "../../../Components/FormUI/Textfield";
import Select from "../../../Components/FormUI/Select";
//import DatePicker from "../../../Components/FormUI/DateTime";
//import Checkbox from "../../../Components/FormUI/Checkbox";
import Submit from "../../../Components/FormUI/Submit";

import Cout from "./Cout";

const MachinerieModalForm = ({ closeModal, globalValues, prejudices }) => {
  const allowed = [];
  if (globalValues.dab) allowed.push("dab");
  if (globalValues.mpt) allowed.push("mpt");
  if (globalValues.mi) allowed.push("mi");

  const filteredPrejudices = Object.keys(prejudices)
    .filter((key) => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = prejudices[key];
      return obj;
    }, {});
  const INITIAL_FORM_STATE = {
    id: "",
    code: "",
    desc: "",
    type: "",
    maintenance: 0,
    hrs_fonc: 0,
    hrs_stat: 0,
    taux_fonc: 0,
    cout: 0,
  };

  const FORM_VALIDATION = Yup.object().shape({
    type: Yup.string().required("Champ obligatoire"),
    code: Yup.string().required("Champ obligatoire"),
    desc: Yup.string().required("Champ obligatoire"),
    maintenance: Yup.number().min(0, "Valeur négative !"),
    hrs_fonc: Yup.number().min(0, "Valeur négative !"),
    hrs_stat: Yup.number().min(0, "Valeur négative !"),
    taux_fonc: Yup.number().min(0, "Valeur négative !"),
  });

  const handleSubmit = (values) => {
    let id;

    let newMachine = globalValues.machineries;
    const ids = newMachine
      .map((mach) => mach.id)
      .sort(function (a, b) {
        return a - b;
      });
    id = ids.length ? ids[ids.length - 1] + 1 : 0;
    values.id = id;
    newMachine = Object.assign([], newMachine);
    newMachine.push(values);
    globalValues.machineries = newMachine;
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
                    <Typography variant="h5" mb={1}>
                      Ajout machinerie
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Select
                          name="type"
                          label="Préjudice"
                          options={filteredPrejudices}
                          disabled={!Object.keys(filteredPrejudices).length > 0}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Textfield name="code" label="Code et appelation" />
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Textfield
                        name="desc"
                        multiline
                        rows={4}
                        label="Description"
                      />
                    </Grid>
                    <Typography mt={1}>Heures</Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Textfield
                          name="hrs_fonc"
                          label="Heures en fonction"
                          type="number"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Textfield
                          name="hrs_stat"
                          label="Heures stationnaire"
                          type="number"
                        />
                      </Grid>
                    </Grid>

                    <Typography mt={1}>Taux</Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Textfield
                          name="taux_fonc"
                          label="Taux de fonctionnement"
                          type="number"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Textfield
                          name="maintenance"
                          label="Taux de maintenance"
                          type="number"
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Box mt={2}>
                        <Typography variant="h5">
                          Côut total:{" "}
                          <Box sx={{ fontWeight: 600, display: "inline" }}>
                            {/* {`$ ${ins1000Sep(formatNum(values.cout))}`} */}
                            <Cout name="cout" />
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

export default MachinerieModalForm;
