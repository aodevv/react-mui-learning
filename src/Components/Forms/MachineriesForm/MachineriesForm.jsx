import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

// REDUX
import {
  addMachineriesDAB,
  addMachineriesMPT,
  addMachineriesMI,
} from "../../redux/Machineries/machineries.actions";
import { selectMachineries } from "../../redux/Machineries/machineries.selectors";
import { createStructuredSelector } from "reselect";

import { connect } from "react-redux";

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

import Cout from "./Cout";

const MachineriesForm = ({
  machineries,
  addMachineriesDAB,
  addMachineriesMI,
  addMachineriesMPT,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const params = useParams();
  const { dossierId, type } = params;
  const INITIAL_FORM_STATE = {
    id: "",
    desc: "",
    maintenance: 0,
    site_conc: "",
    hrs_fonc: 0,
    hrs_stat: 0,
    taux_fonc: 0,
    cout: 0,
  };

  const FORM_VALIDATION = Yup.object().shape({
    id: Yup.string().required("Chanmp obligatoire"),
    maintenance: Yup.number(),
    hrs_fonc: Yup.number()
      .min(1, "Minimum 1 heure")
      .required("Chanmp obligatoire"),
    taux_fonc: Yup.number()
      .min(1, "Minimum 1$/heure")
      .required("Champ obligatoire"),
  });

  const exitForm = () => {
    navigate(pathname.split("/").slice(0, -1).join("/"));
  };

  const handleSubmit = (values) => {
    let newMachine;
    let machineriesType = machineries[type.toUpperCase()];

    newMachine = [...machineriesType[dossierId], values];
    console.log(newMachine);
    Object.keys(machineriesType).map(function (key, index) {
      if (key === dossierId) {
        machineriesType[key] = newMachine;
      }
    });
    switch (type) {
      case "dab":
        addMachineriesDAB(machineriesType);
        break;
      case "mpt":
        addMachineriesMPT(machineriesType);
        break;
      case "mi":
        addMachineriesMI(machineriesType);
        break;
      default:
        break;
    }
    exitForm();
  };
  return (
    <>
      <CardWrapper title="Machineries form">
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
                      <Grid item lg={10} xl={8}>
                        <Typography mb={1}>Formulaire</Typography>

                        <Grid item xs={12}>
                          <Textfield name="id" label="Code et appelation" />
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
                            <Typography variant="h4">
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
        </Grid>
      </CardWrapper>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  machineries: selectMachineries,
});

const mapDispatchToProps = (dispatch) => ({
  addMachineriesDAB: (newFacts) => dispatch(addMachineriesDAB(newFacts)),
  addMachineriesMPT: (newFacts) => dispatch(addMachineriesMPT(newFacts)),
  addMachineriesMI: (newFacts) => dispatch(addMachineriesMI(newFacts)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MachineriesForm);
