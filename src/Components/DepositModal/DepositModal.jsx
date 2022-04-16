import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { addInfosDossier } from "../../redux/DossierInfos/infosDossier.actions";

// FORMIK and YUP
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";

import TextField from "@mui/material/TextField";

import { ins1000Sep, formatNum } from "../Tables/TableColumnsUtils";

import { Modal, Fade, Typography, Button, Box, Grid } from "@mui/material";
import MontantBox from "./MontantBox";
import CloseIcon from "@mui/icons-material/Close";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  borderRadius: 2,
  //p: "30px 10px",
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
};

const DepositModal = ({
  deposit,
  closeDeposit,
  dosToEdit,
  dossiers,
  addInfosDossier,
  setFilteredDossiers,
  fullDosPage,
}) => {
  const [aVerse, setAVerse] = useState(0);
  const [MA, setMA] = useState(0);
  const [MR, setMR] = useState(0);
  const [MV, setMV] = useState(0);
  const [reste, setRest] = useState(0);
  const [mv, setMv] = useState(0);
  const [isVerser, setIsVerser] = useState(true);

  const depositMoney = () => {
    const dosCopy = JSON.parse(JSON.stringify(dossiers));
    const dosId = dosToEdit.id;
    dosToEdit.MV = mv;

    const otherDoses = dosCopy.filter((dossier) => dossier.id !== dosId);
    const newDoses = [...otherDoses, dosToEdit].sort((a, b) =>
      a.id >= b.id ? 1 : -1
    );
    addInfosDossier(newDoses);
    setAVerse(0);

    if (fullDosPage) {
      setFilteredDossiers(newDoses);
    }

    setIsVerser(true);
    closeDeposit();
  };

  const toggleDepositAction = () => {
    setIsVerser(!isVerser);
  };

  const INITIAL_FORM_STATE = {
    aVerse: 0,
  };
  const FORM_VALIDATION = Yup.object().shape({
    aVerse: Yup.number()
      .test("first", "Montant admissible dépassé !", (value) =>
        isVerser ? value <= MA - MV : value <= MV
      )
      .min(1, "Valeur inferieur ou égale à 0 !"),
  });

  const handleClose = () => {
    closeDeposit();
    setIsVerser(true);
  };

  useEffect(() => {
    setMA(dosToEdit.MA);
    setMR(dosToEdit.MR);
    setMV(dosToEdit.MV);
    setMv(dosToEdit.MV);
    setRest(dosToEdit.MA - dosToEdit.MV);
  }, [dosToEdit]);

  return (
    <>
      <Modal
        open={deposit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={deposit}>
          <Box sx={style}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Grid container>
                <Grid item xs={6}>
                  <MontantBox
                    percent={100}
                    borderTopLeft={true}
                    borderRight={true}
                  >
                    <Typography fontSize={20} noWrap>
                      Total réclamé
                    </Typography>
                    <Typography variant="h5">
                      <b>{`$ ${ins1000Sep(formatNum(MR))}`}</b>
                    </Typography>
                  </MontantBox>
                </Grid>
                <Grid item xs={6}>
                  <MontantBox
                    percent={100 - (MA / MR) * 100}
                    borderTopRight={true}
                    bgColor="rgba(0,0,255,0.2)"
                  >
                    <Typography fontSize={20} noWrap>
                      Montant admissible
                    </Typography>
                    <Typography variant="h5">
                      <b>{`$ ${ins1000Sep(formatNum(MA))}`}</b>
                    </Typography>
                  </MontantBox>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <MontantBox
                    percent={100 - (mv / MA) * 100}
                    borderRight={true}
                    bgColor="rgba(0,255,0,0.2)"
                  >
                    <Typography fontSize={20} noWrap>
                      Montant vérsé
                    </Typography>
                    <Typography variant="h5">
                      <b>{`$ ${ins1000Sep(formatNum(mv))}`}</b>
                    </Typography>
                  </MontantBox>
                </Grid>
                <Grid item xs={6}>
                  <MontantBox percent={100 - (reste / MA) * 100}>
                    <Typography fontSize={20}>Balance</Typography>
                    <Typography variant="h5">
                      <b>{`$ ${ins1000Sep(formatNum(reste))}`}</b>
                    </Typography>
                  </MontantBox>
                </Grid>
              </Grid>
            </Box>
            <Formik
              initialValues={{ ...INITIAL_FORM_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={depositMoney}
              validateOnMount
            >
              {(formikProps) => {
                const { values, submitForm, isValid, setFieldValue } =
                  formikProps;

                return (
                  <Form>
                    <Box mt={2} mb={2}>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item xs={8} ml={13}>
                          <TextFieldWrapper
                            name="aVerse"
                            label={isVerser ? "Montant à vérsé" : "Ajustement"}
                            type="number"
                            setRest={setRest}
                            setMv={setMv}
                            MA={MA}
                            MV={MV}
                            isVerser={isVerser}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <IconButton
                            onClick={toggleDepositAction}
                            aria-label="toggle"
                            size="large"
                          >
                            {isVerser ? <AddIcon /> : <RemoveIcon />}
                          </IconButton>
                        </Grid>
                      </Grid>

                      <Box mt={1}></Box>
                      <Grid
                        item
                        xs={8}
                        margin="auto"
                        display="flex"
                        flexDirection="row-reverse"
                      >
                        <Button
                          onClick={handleClose}
                          size="small"
                          startIcon={<CloseIcon />}
                          color="error"
                        >
                          Annuler
                        </Button>
                        <Button
                          startIcon={<AttachMoneyIcon />}
                          variant="contained"
                          size="small"
                          color="success"
                          disabled={MV === MA || !isValid}
                          onClick={submitForm}
                        >
                          {isVerser ? "Vérser" : "Ajustementer"}
                        </Button>
                      </Grid>
                    </Box>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

const TextFieldWrapper = ({
  name,
  setRest,
  setMv,
  MA,
  MV,
  isVerser,
  ...otherProps
}) => {
  const [field, meta] = useField(name);
  const { values } = useFormikContext();
  const { aVerse } = values;
  const config = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
    margin: "dense",
    size: "small",
  };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  useEffect(() => {
    if (isVerser) {
      if (aVerse >= 0 && aVerse <= MA - MV) {
        if (MV + aVerse > MA) {
          setMv(MA);
          setRest(0);
        } else {
          setRest(MA - MV - aVerse);
          setMv(MV + aVerse);
        }
      }
    } else {
      if (aVerse >= 0 && aVerse <= MV) {
        if (aVerse > MV) {
          setMv(MA);
          setRest(0);
        } else {
          setRest(MA - MV + aVerse);
          setMv(MV - aVerse);
        }
      }
    }
  }, [aVerse, isVerser]);

  return <TextField {...config} />;
};

const mapDispatchToProps = (dispatch) => ({
  addInfosDossier: (newInfos) => dispatch(addInfosDossier(newInfos)),
});

export default connect(null, mapDispatchToProps)(DepositModal);
