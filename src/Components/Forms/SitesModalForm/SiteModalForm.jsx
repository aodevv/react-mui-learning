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
//import Select from "../../../Components/FormUI/Select";
//import DatePicker from "../../../Components/FormUI/DateTime";
import Checkbox from "../../../Components/FormUI/Checkbox";
import Submit from "../../../Components/FormUI/Submit";

const SiteModalForm = ({ closeModal, globalValues }) => {
  const INITIAL_FORM_STATE = {
    id: "",
    site: "",
    nature: "",
    part_end: "",
    pourc_end: 0,
    type_ret: "",
    adm: false,
    pourc_adm: 0,
    montant_rec: 0,
  };

  const handleSubmit = (values) => {
    let id;

    let newSite = globalValues.sites;
    const ids = newSite
      .map((site) => site.id)
      .sort(function (a, b) {
        return a - b;
      });
    id = ids.length ? ids[ids.length - 1] + 1 : 0;
    values.id = id;
    newSite = Object.assign([], newSite);
    newSite.push(values);
    globalValues.sites = newSite;
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
                      Ajout site
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Textfield name="site" label="Site" />
                      </Grid>

                      <Grid item xs={6}>
                        <Textfield name="nature" label="Nature" />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Textfield name="part_end" label="Partie endommagée" />
                      </Grid>

                      <Grid item xs={6}>
                        <Textfield
                          name="pourc_end"
                          label="Pourcentage endommagé"
                          type="number"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">%</InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Textfield name="type_ret" label="Type rétabli" />
                    </Grid>
                    <Grid item xs={6} mt={1}>
                      <Box>
                        <Checkbox
                          name="adm"
                          legend="Admissible ?"
                          label="oui"
                        />
                      </Box>
                    </Grid>
                    <Grid container spacing={1} mb={1}>
                      <Grid item xs={6}>
                        <Textfield
                          disabled={!values.adm}
                          name="pourc_adm"
                          label="Pourcentage admissible"
                          type="number"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">%</InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Textfield
                          disabled={!values.adm}
                          name="montant_rec"
                          label="Montant réclamé"
                          type="number"
                        />
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

export default SiteModalForm;
