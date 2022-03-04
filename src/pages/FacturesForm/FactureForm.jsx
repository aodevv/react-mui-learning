import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

// REDUX
import {
  addFactureDAB,
  addFactureMPT,
  addFactureMI,
} from "../../redux/Factures/Factures.actions";
import { selectFactures } from "../../redux/Factures/Factures.selectors";
import { createStructuredSelector } from "reselect";

import { connect } from "react-redux";

// MUI ICONS
import { Container, Grid, Typography, Box, Button, Stack } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import CloseIcon from "@mui/icons-material/Close";

// FORMIK and YUP
import { Formik, Form } from "formik";
import * as Yup from "yup";

import CardWrapper from "../../Components/CardWrapper/CardWrapper";

import Textfield from "../../Components/FormUI/Textfield";
import Select from "../../Components/FormUI/Select";
import DatePicker from "../../Components/FormUI/DateTime";
import Checkbox from "../../Components/FormUI/Checkbox";
import Submit from "../../Components/FormUI/Submit";

import data from "./data.json";

const FactureForm = ({
  factures,
  addFactureDAB,
  addFactureMI,
  addFactureMPT,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const params = useParams();
  const { dossierId, type } = params;
  const INITIAL_FORM_STATE = {
    id: "",
    desc_fact: "",
    date_fact: "",
    montant_rec: "",
    site_con: "",
    tax: false,
  };
  let usedIds = [];

  factures[type.toUpperCase()][dossierId].forEach((facture) => {
    usedIds.push(facture.id);
  });

  const FORM_VALIDATION = Yup.object().shape({
    id: Yup.string()
      .required("Champ obligatoire")
      .test(
        "duplicate",
        "Facture existe déja",
        (value) => !usedIds.includes(value)
      ),
    desc_fact: Yup.string(),
    date_fact: Yup.date("Date invalide").required("Champ obligatoire"),
    montant_rec: Yup.number("Montant invalide").required("Champ obligatoire"),
    site_con: Yup.string().required("Champ obligatoire"),
    tax: Yup.boolean().oneOf([true], "Ok").required("Must be accepted"),
  });

  const exitForm = () => {
    navigate(pathname.split("/").slice(0, -1).join("/"));
  };

  const handleSubmit = (values) => {
    console.log(values);
    let newFacts;
    let facturesType = factures[type.toUpperCase()];

    newFacts = [...facturesType[dossierId], values];
    console.log(newFacts);
    Object.keys(facturesType).map(function (key, index) {
      if (key === dossierId) {
        facturesType[key] = newFacts;
      }
    });
    switch (type) {
      case "dab":
        addFactureDAB(facturesType);
        break;
      case "mpt":
        addFactureMPT(facturesType);
        break;
      case "mi":
        addFactureMI(facturesType);
        break;
      default:
        break;
    }
    exitForm();
  };
  return (
    <div>
      <CardWrapper title="Factures form">
        <Grid container>
          <Grid item xs={12}>
            <Container maxWidth="l">
              <Formik
                initialValues={{ ...INITIAL_FORM_STATE }}
                validationSchema={FORM_VALIDATION}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Grid item lg={10} xl={8}>
                    <Typography>Formulaire</Typography>
                    <Grid item xs={12}>
                      <Textfield name="id" label="ID" />
                    </Grid>

                    <Grid item xs={12}>
                      <Textfield
                        name="desc_fact"
                        multiline
                        rows={4}
                        label="Description"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <DatePicker name="date_fact" label="Date" />
                    </Grid>

                    <Grid item xs={12}>
                      <Select
                        name="site_con"
                        label="Site concerné"
                        options={data}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Textfield
                        name="montant_rec"
                        label="Montant réclamé"
                        type="number"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box mt={1}>
                        <Checkbox name="tax" legend="Taxable ?" label="oui" />
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
              </Formik>
            </Container>
          </Grid>
        </Grid>
      </CardWrapper>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  factures: selectFactures,
});

const mapDispatchToProps = (dispatch) => ({
  addFactureDAB: (newFacts) => dispatch(addFactureDAB(newFacts)),
  addFactureMPT: (newFacts) => dispatch(addFactureMPT(newFacts)),
  addFactureMI: (newFacts) => dispatch(addFactureMI(newFacts)),
});
export default connect(mapStateToProps, mapDispatchToProps)(FactureForm);
