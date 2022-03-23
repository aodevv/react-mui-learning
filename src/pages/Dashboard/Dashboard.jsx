import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDossiers } from "../../redux/DossierInfos/infosDossier.selectors";
import { selectFacturesMemo } from "../../redux/Factures/Factures.selectors";
import { selectSitesMemo } from "../../redux/Sites/Sites.selectors";
import { selectMachineriesMemo } from "../../redux/Machineries/machineries.selectors";
import { selectSalairesMemo } from "../../redux/Salaires/salaires.selectors";

import {
  Grid,
  Typography,
  Box,
  Paper,
  Divider,
  Modal,
  Fade,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import MyCard from "../../Components/MyCard/MyCard";

import FilesTable from "../../Components/Tables/FilesTable";

import FactureModalFormDos from "../../Components/Forms/FactureModalForm/FactureModalFormDos";
import SalaireModalFormDos from "../../Components/Forms/SalaireModalForm/SalaireModalFormDos";
import MachinerieModalFormDos from "../../Components/Forms/MachinerieModalForm/MachinerieModalFormDos";

import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import AddIcon from "@mui/icons-material/Add";

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
  p: "30px 10px",
};

const Dashboard = ({
  dossiers,
  sites,
  salaires,
  facutures,
  machineries,
  factures,
}) => {
  const [factureModal, setFactureModal] = useState(false);
  const openFacture = () => {
    setFactureModal(true);
  };
  const closeFacture = () => {
    setFactureModal(false);
  };
  const [salaireModal, setSalaireModal] = useState(false);
  const openSalaire = () => {
    setSalaireModal(true);
  };
  const closeSalaire = () => {
    setSalaireModal(false);
  };
  const [machineriesModal, setMachineriesModal] = useState(false);
  const openMachines = () => {
    setMachineriesModal(true);
  };
  const closeMachines = () => {
    setMachineriesModal(false);
  };
  const navigate = useNavigate();

  const isSmall = useMediaQuery("(max-width:1200px)");
  let actif = dossiers.filter((dos) => dos.status === "actif");
  // actif = actif.sort((a, b) =>
  //   a.datEv > b.datEv ? 1 : b.datEv > a.datEv ? -1 : 0
  // );
  // console.log(actif);

  let sitesOnly = [];
  let dosOnly = [];

  Object.keys(sites).forEach((item, index) => {
    sites[item].map((site) => sitesOnly.push(site.site));
  });

  dossiers.forEach((item) => {
    dosOnly.push(item.id);
  });

  const typePrejudices = {
    dab: "Dommage au biens",
    mpt: "Mesures preventives temporaires",
    mi: "Mesures d'interventions",
    bcg: "Bris du couvert de glace",
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          px: 4,
          "@media (max-width: 1200px)": {
            px: 1,
          },
        }}
      >
        <Grid container spacing={isSmall ? 1 : 4}>
          <Grid item xs={12} lg={8}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                mb: 2,
                "& > :not(style)": {
                  width: "100%",
                },
              }}
            >
              <Paper elevation={3}>
                <Box p={3} sx={{ textAlign: "center", height: "30%" }}>
                  <Typography mb={isSmall ? 3 : 8} variant="h2">
                    Municipalité X
                  </Typography>
                  <Grid container>
                    <Grid item xs={12} lg={4}>
                      <Box sx={isSmall ? null : { borderRight: 1 }}>
                        <Typography variant="h5" mb={isSmall ? 0 : 3}>
                          Nombre dossier en cours:
                        </Typography>
                        <Typography variant="h4">
                          <b>12</b>
                        </Typography>
                      </Box>
                      {isSmall ? <Divider /> : null}
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <Box sx={isSmall ? null : { borderRight: 1 }}>
                        <Typography
                          variant="h5"
                          mb={isSmall ? 0 : 3}
                          mt={isSmall ? 2 : 0}
                        >
                          Total réclamé:
                        </Typography>
                        <Typography
                          mb={isSmall ? 2 : 0}
                          sx={{ whiteSpace: "nowrap" }}
                          variant="h4"
                        >
                          <b>$ 123,255,214.20</b>
                        </Typography>
                        {isSmall ? <Divider /> : null}
                      </Box>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <Typography
                        variant={isSmall ? "h6" : "h5"}
                        mb={isSmall ? 0 : 3}
                        mt={isSmall ? 2 : 0}
                      >
                        Total vérsé:
                      </Typography>
                      <Typography sx={{ whiteSpace: "nowrap" }} variant="h4">
                        <b>$ 68,779,259.16</b>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid container item xs={12} lg={4} spacing={1}>
            <Grid item xs={12}>
              <Grid container display="flex">
                <Grid item xs={11}>
                  <MyCard
                    onClick={() => navigate("/dossier")}
                    bgColor="#FEBE103b"
                    textColor="#feb310"
                    br
                    title="Dossier"
                  >
                    <FolderOpenOutlinedIcon />
                  </MyCard>
                </Grid>

                <Grid item xs={1}>
                  <MyCard
                    onClick={() => navigate("/nouveau_dossier")}
                    bgColor="#FEBE103b"
                    textColor="#feb310"
                    bl
                    title=""
                  >
                    <AddIcon />
                  </MyCard>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container display="flex">
                <Grid item xs={10}>
                  <MyCard
                    onClick={() => navigate("/factures")}
                    bgColor="#00308F3b"
                    textColor="#00308F"
                    title="Factures"
                    br
                  >
                    <ReceiptOutlinedIcon />
                  </MyCard>
                </Grid>

                <Grid item xs={2}>
                  <MyCard
                    onClick={openFacture}
                    bgColor="#00308f3b"
                    textColor="#00308F"
                    bl
                    title=""
                  >
                    <AddIcon />
                  </MyCard>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container display="flex">
                <Grid item xs={10}>
                  <MyCard
                    onClick={() => navigate("/salaires")}
                    bgColor="#0187493b"
                    textColor="#018749"
                    br
                    title="Salaires"
                  >
                    <AttachMoneyIcon />
                  </MyCard>
                </Grid>

                <Grid item xs={2}>
                  <MyCard
                    onClick={openSalaire}
                    bgColor="#0187493b"
                    textColor="#018749"
                    bl
                    title=""
                  >
                    <AddIcon />
                  </MyCard>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container display="flex">
                <Grid item xs={10}>
                  <MyCard
                    onClick={() => navigate("/machineries")}
                    bgColor="#720e9e3b"
                    textColor="#720e9e"
                    br
                    color="success"
                    title="Machineries"
                  >
                    <PrecisionManufacturingOutlinedIcon />
                  </MyCard>
                </Grid>

                <Grid item xs={2}>
                  <MyCard
                    onClick={openMachines}
                    bgColor="#720e9e3b"
                    textColor="#720e9e"
                    bl
                    title=""
                  >
                    <AddIcon />
                  </MyCard>
                </Grid>
              </Grid>
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
        <Modal
          open={factureModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Fade in={factureModal}>
            <Box sx={style}>
              <FactureModalFormDos
                prejudices={typePrejudices}
                closeModal={closeFacture}
                sites={sites}
                numDos={dosOnly}
                dossiers={dossiers}
                factures={factures}
              />
            </Box>
          </Fade>
        </Modal>
        <Modal
          open={salaireModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Fade in={salaireModal}>
            <Box sx={style}>
              <SalaireModalFormDos
                prejudices={typePrejudices}
                closeModal={closeSalaire}
                sites={sites}
                numDos={dosOnly}
                dossiers={dossiers}
                salaires={salaires}
              />
            </Box>
          </Fade>
        </Modal>
        <Modal
          open={machineriesModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Fade in={machineriesModal}>
            <Box sx={style}>
              <MachinerieModalFormDos
                prejudices={typePrejudices}
                closeModal={closeMachines}
                sites={sites}
                numDos={dosOnly}
                dossiers={dossiers}
                machineries={machineries}
              />
            </Box>
          </Fade>
        </Modal>
      </Box>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  dossiers: selectDossiers,
  factures: selectFacturesMemo,
  sites: selectSitesMemo,
  machineries: selectMachineriesMemo,
  salaires: selectSalairesMemo,
});

export default connect(mapStateToProps)(Dashboard);
