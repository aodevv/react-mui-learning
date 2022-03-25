import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { addInfosDossier } from "../../redux/DossierInfos/infosDossier.actions";

import TextField from "@mui/material/TextField";

import { ins1000Sep, formatNum } from "../Tables/TableColumnsUtils";

import { Modal, Fade, Typography, Button, Box, Grid } from "@mui/material";
import MontantBox from "./MontantBox";
import CloseIcon from "@mui/icons-material/Close";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

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

  const calculations = (event) => {
    const verse = parseFloat(event.target.value);
    if (verse >= 0 && verse <= MA - MV) {
      setAVerse(verse);
      if (MV + verse > MA) {
        setMv(MA);
        setRest(0);
      } else {
        setRest(MA - MV - verse);
        setMv(MV + verse);
      }
    }
  };

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

    closeDeposit();
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
                    <Typography fontSize={20}>Reste</Typography>
                    <Typography variant="h5">
                      <b>{`$ ${ins1000Sep(formatNum(reste))}`}</b>
                    </Typography>
                  </MontantBox>
                </Grid>
              </Grid>
            </Box>
            <Box mt={2} mb={2}>
              <Grid item xs={8} margin="auto">
                <TextField
                  fullWidth
                  label="Montant à vérsé"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={aVerse}
                  onChange={calculations}
                  margin="dense"
                />
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
                  onClick={closeDeposit}
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
                  disabled={MV === MA}
                  onClick={depositMoney}
                >
                  Vérser
                </Button>
              </Grid>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addInfosDossier: (newInfos) => dispatch(addInfosDossier(newInfos)),
});

export default connect(null, mapDispatchToProps)(DepositModal);
