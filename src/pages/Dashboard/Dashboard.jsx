import React from "react";

import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDossiers } from "../../redux/DossierInfos/infosDossier.selectors";

import { Grid, Typography, Box, Paper, Divider } from "@mui/material";

import MyCard from "../../Components/MyCard/MyCard";

import FilesTable from "../../Components/Tables/FilesTable";

import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";

const Dashboard = ({ dossiers }) => {
  const navigate = useNavigate();
  let actif = dossiers.filter((dos) => dos.status === "actif");
  // actif = actif.sort((a, b) =>
  //   a.datEv > b.datEv ? 1 : b.datEv > a.datEv ? -1 : 0
  // );
  // console.log(actif);

  return (
    <>
      <Box sx={{ flexGrow: 1, px: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  width: "100%",
                  height: 320,
                },
              }}
            >
              <Paper elevation={3}>
                <Box p={3} sx={{ textAlign: "center", height: "30%" }}>
                  <Typography mb={8} variant="h2">
                    Municipalité X
                  </Typography>
                  <Grid container>
                    <Grid item xs={4}>
                      <Box sx={{ borderRight: "1px solid grey" }}>
                        <Typography variant="h5" mb={3}>
                          Nombre dossier en cours:
                        </Typography>
                        <Typography variant="h4">
                          <b>12</b>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ borderRight: "1px solid grey" }}>
                        <Typography variant="h5" mb={3}>
                          Total réclamé:
                        </Typography>
                        <Typography variant="h4">
                          <b>$ 123,255,214.20</b>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h5" mb={3}>
                        Total vérsé:
                      </Typography>
                      <Typography variant="h4">
                        <b>$ 68,779,259.16</b>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid container item xs={4} spacing={1}>
            <Grid item xs={12}>
              <MyCard
                onClick={() => navigate("/dossier")}
                bgColor="#FEBE103b"
                textColor="#feb310"
                title="Dossier"
              >
                <FolderOpenOutlinedIcon />
              </MyCard>
            </Grid>
            <Grid item xs={6}>
              <MyCard
                onClick={() => navigate("/factures")}
                bgColor="#00308F3b"
                textColor="#00308F"
                title="Factures"
              >
                <ReceiptOutlinedIcon />
              </MyCard>
            </Grid>
            <Grid item xs={6}>
              <MyCard
                onClick={() => navigate("/salaires")}
                bgColor="#0187493b"
                textColor="#018749"
                title="Salaires"
              >
                <AttachMoneyIcon />
              </MyCard>
            </Grid>
            <Grid item xs={6}>
              <MyCard
                onClick={() => navigate("/machineries")}
                bgColor="#720e9e3b"
                textColor="#720e9e"
                color="success"
                title="Machineries"
              >
                <PrecisionManufacturingOutlinedIcon />
              </MyCard>
            </Grid>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Paper elevation={3}>
            <Box mt={2} p={2} sx={{ height: "calc(100% - 64px)" }}>
              <Typography variant="h5" mb={2}>
                <b>Dossiers en cours</b>
              </Typography>
              <FilesTable data={actif} />
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  dossiers: selectDossiers,
});

export default connect(mapStateToProps)(Dashboard);
