import React from "react";

// FORMIK and YUP
import { Formik, Form } from "formik";
//import * as Yup from "yup";

import { connect } from "react-redux";
import { addMachinerie } from "../../../redux/Machineries/machineries.actions";

// MUI ICONS
import { Container, Grid, Typography, Box, Button, Stack } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";

import Textfield from "../../../Components/FormUI/Textfield";
import Select from "../../../Components/FormUI/Select";
import SelectDossier from "../../../Components/FormUI/SelectDossier";
import SelectPrejudice from "../../../Components/FormUI/SelectPrejudice";
import SelectSites from "../../../Components/FormUI/SelectSites";
import DatePicker from "../../../Components/FormUI/DateTime";
import Checkbox from "../../../Components/FormUI/Checkbox";
import Submit from "../../../Components/FormUI/Submit";

import Cout from "./Cout";

const MachinerieModalFormDos = ({
  sites,
  numDos,
  addMachinerie,
  machineries,
  prejudices,
  dossiers,
  closeModal,
}) => {
  const INITIAL_FORM_STATE = {
    numDos: "",
    code: "",
    desc: "",
    type: "",
    site_con: "",
    maintenance: 0,
    hrs_fonc: 0,
    hrs_stat: 0,
    taux_fonc: 0,
    cout: 0,
  };

  const handleSubmit = (values, { resetForm }) => {
    const dosInt = values.numDos;
    let newMachs = JSON.parse(JSON.stringify(machineries));
    const machDos = newMachs[dosInt];
    let id;
    const ids = machDos
      .map((fac) => fac.id)
      .sort(function (a, b) {
        return a - b;
      });
    id = ids.length ? ids[ids.length - 1] + 1 : 0;

    const siteToAdd = sites[dosInt].map((site) => site.site)[values.site_con];

    const newMach = {
      id: id,
      code: values.code,
      desc: values.desc,
      type: values.type,
      site_con: siteToAdd,
      maintenance: values.maintenance,
      hrs_fonc: values.hrs_fonc,
      hrs_stat: values.hrs_stat,
      taux_fonc: values.taux_fonc,
      cout: values.cout,
    };
    machDos.push(newMach);
    Object.keys(newMachs).forEach(function (key, index) {
      if (key === dosInt) {
        newMachs[key] = machDos;
      }
    });
    addMachinerie(newMachs);
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
                    <Typography variant="h5" mb={1}>
                      Ajout machinerie
                    </Typography>

                    <Grid item xs={12}>
                      <SelectDossier
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
                      {values.type === "dab" ? (
                        <Grid item xs={6}>
                          <SelectSites
                            defaultValue=""
                            name="site_con"
                            label="Site concerné"
                            sites={sites}
                            disabled={values.type !== "dab"}
                          />
                        </Grid>
                      ) : null}
                    </Grid>
                    <Grid item xs={12}>
                      <Textfield name="code" label="Code et appelation" />
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

const mapDispatchToProps = (dispatch) => ({
  addMachinerie: (newMach) => dispatch(addMachinerie(newMach)),
});

export default connect(null, mapDispatchToProps)(MachinerieModalFormDos);
