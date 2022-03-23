import React, { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";

import { ins1000Sep, formatNum } from "../Tables/TableColumnsUtils";

import { Modal, Fade, Typography, Button, Box, Grid } from "@mui/material";
import MontantBox from "./MontantBox";

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

const DepositModal = ({ deposit, closeDeposit, dos, dossiers, MR, MA, MV }) => {
  const [aVerse, setAVerse] = useState(0);
  const [reste, setRest] = useState(MA - MV);
  const [mv, setMv] = useState(MV);

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
                    percent={20}
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
            <Box mt={2}>
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
            </Box>
            <Button onClick={closeDeposit}>Close</Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default DepositModal;
