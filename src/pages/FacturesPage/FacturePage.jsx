import React from "react";
import { Outlet } from "react-router-dom";

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

const FacturePage = ({ factures }) => {
  let flatFactures = [];
  let facturesCopy = JSON.parse(JSON.stringify(factures));
  Object.keys(facturesCopy).forEach((item, index) =>
    facturesCopy[item].forEach((fac) => {
      fac.dos = parseInt(item);
      fac.id = `${item};${fac.id}`;
      flatFactures.push(fac);
    })
  );

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
            <Button variant="contained" size="small" startIcon={<AddIcon />}>
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
            <FacturesTable data={flatFactures} />
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
