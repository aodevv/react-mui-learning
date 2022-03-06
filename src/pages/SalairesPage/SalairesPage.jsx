import React from "react";
import { useParams, Outlet, useNavigate, useLocation } from "react-router-dom";

// REDUX
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectSalairesMemo } from "../../redux/Salaires/salaires.selectors";

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

import SalairesTable from "../../Components/Tables/Salaires/SalairesTable";

const SalairesPage = ({ salaires, type }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { dossierId } = params;

  let salairePluk;
  if (dossierId) {
    salairePluk = salaires[type.toUpperCase()][dossierId];
  }

  const toggleForm = () => {
    navigate(`${pathname}/new`);
  };

  const types = {
    dab: "Dommages au biens",
    mpt: "Mesures préventifs temporaires",
    mi: "Mesures d'interventions",
  };

  return (
    <Grid>
      <Card>
        <CardHeader
          disableTypography={false}
          titleTypographyProps={{ fontWeight: "bold" }}
          title={"Liste des factures"}
        />
        <CardContent>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="small"
              onClick={toggleForm}
              startIcon={<AddIcon />}
            >
              Ajouter
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
            <SalairesTable data={salairePluk} />
          </Box>
        </CardContent>
      </Card>
      <Outlet />
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  salaires: selectSalairesMemo,
});

export default connect(mapStateToProps)(SalairesPage);
