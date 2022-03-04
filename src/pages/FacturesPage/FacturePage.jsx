import React from "react";
import { useParams, Outlet, useNavigate, useLocation } from "react-router-dom";

// REDUX
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectFacturesMemo } from "../../redux/Factures/Factures.selectors";

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

// Custom components
import FacturesTable from "../../Components/Tables/FacturesTable";

const FacturePage = ({ type, factures }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { dossierId } = params;

  let facturesPluk;
  if (dossierId) {
    facturesPluk = factures[type.toUpperCase()][dossierId];
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
            <FacturesTable data={facturesPluk} />
          </Box>
        </CardContent>
      </Card>
      <Outlet />
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  factures: selectFacturesMemo,
});

export default connect(mapStateToProps)(FacturePage);
