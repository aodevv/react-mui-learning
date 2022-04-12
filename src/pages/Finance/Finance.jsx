import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ins1000Sep,
  formatNum,
} from "../../Components/Tables/TableColumnsUtils";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDossiers } from "../../redux/DossierInfos/infosDossier.selectors";
import useMediaQuery from "@mui/material/useMediaQuery";

// MUI components
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

// MUI icons
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PaidIcon from "@mui/icons-material/Paid";

// Local components
import FinanceTable from "../../Components/Tables/FinanceTable";

const Finance = ({ dossiers }) => {
  const [filteredDossiers, setFilteredDossiers] = useState(dossiers);
  const isSmall = useMediaQuery("(max-width:1200px)");
  const [modal, setModal] = useState(false);
  let dosOnly = [];
  const totalRec = dossiers.reduce((acc, dos) => acc + dos.MR, 0);
  const totalVer = dossiers.reduce((acc, dos) => acc + dos.MV, 0);
  const totalAdm = dossiers.reduce((acc, dos) => acc + dos.MA, 0);

  const percMA = (totalAdm / totalRec) * 100;
  const percVER = (totalVer / totalAdm) * 100;

  dossiers.forEach((item) => {
    dosOnly.push(item.id.toString());
  });
  const openDosModal = () => {
    setModal(true);
  };
  const closeDosModal = () => {
    setModal(false);
  };
  return (
    <Grid>
      <Card>
        <CardHeader
          disableTypography={false}
          titleTypographyProps={{ fontWeight: "bold" }}
          title={"Finance"}
        />
        <CardContent>
          <Box mb={4} sx={{ textAlign: "center", height: "30%" }}>
            <Grid container>
              <Grid item xs={12} lg={4}>
                <Box sx={isSmall ? null : { borderRight: 1 }}>
                  <Typography variant="h5" mb={isSmall ? 0 : 3}>
                    Total réclamé
                  </Typography>
                  <Typography
                    mb={isSmall ? 2 : 0}
                    sx={{ whiteSpace: "nowrap" }}
                    variant="h4"
                  >
                    <b>$ {ins1000Sep(formatNum(totalRec))}</b>
                  </Typography>
                </Box>
                {isSmall ? <Divider /> : null}
              </Grid>
              <Grid item xs={12} lg={4}>
                <Box
                  sx={
                    isSmall
                      ? {
                          background: `linear-gradient(270deg, rgba(255,255,255,0) ${
                            100 - percMA
                          }%, rgba(0,0,255,0.2) ${100 - percMA}%);`,
                        }
                      : {
                          borderRight: 1,
                          background: `linear-gradient(270deg, rgba(255,255,255,0) ${
                            100 - percMA
                          }%, rgba(0,0,255,0.2) ${100 - percMA}%);`,
                        }
                  }
                >
                  <Typography
                    variant="h5"
                    mb={isSmall ? 0 : 3}
                    mt={isSmall ? 0 : 0}
                    pt={isSmall ? 2 : 0}
                  >
                    Total admissible:
                  </Typography>
                  <Typography
                    mb={isSmall ? 2 : 0}
                    sx={{ whiteSpace: "nowrap" }}
                    variant="h4"
                  >
                    <b>$ {ins1000Sep(formatNum(totalAdm))}</b>
                  </Typography>
                  {isSmall ? <Divider /> : null}
                </Box>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Box
                  sx={{
                    background: `linear-gradient(270deg, rgba(255,255,255,0) ${
                      100 - percVER
                    }%, rgba(0,255,0,0.2) ${100 - percVER}%);`,
                  }}
                >
                  <Typography
                    variant={isSmall ? "h6" : "h5"}
                    mb={isSmall ? 0 : 3}
                    mt={isSmall ? 0 : 0}
                    pt={isSmall ? 2 : 0}
                  >
                    Total vérsé:
                  </Typography>
                  <Typography sx={{ whiteSpace: "nowrap" }} variant="h4">
                    <b>$ {ins1000Sep(formatNum(totalVer))}</b>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="small"
              disabled
              onClick={openDosModal}
              startIcon={<PaidIcon />}
            >
              Selection dossier
            </Button>
            <Button
              variant="contained"
              disabled
              size="small"
              startIcon={<DeleteIcon />}
            >
              Supprimer
            </Button>
          </Stack>
          <Box mt={2} sx={{ height: "calc(100% - 64px)" }}>
            <FinanceTable
              data={filteredDossiers}
              setFilteredDossiers={setFilteredDossiers}
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  dossiers: selectDossiers,
});

export default connect(mapStateToProps)(Finance);
