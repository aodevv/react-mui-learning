import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDossiers } from "../../redux/DossierInfos/infosDossier.selectors";

// MUI components
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// MUI icons
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PaidIcon from "@mui/icons-material/Paid";

// Local components
import FinanceTable from "../../Components/Tables/FinanceTable";

const Finance = ({ dossiers }) => {
  const [filteredDossiers, setFilteredDossiers] = useState(dossiers);
  const [modal, setModal] = useState(false);
  let dosOnly = [];

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
