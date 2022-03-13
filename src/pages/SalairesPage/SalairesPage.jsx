import React from "react";
import { Outlet } from "react-router-dom";

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

const SalairesPage = ({ salaires }) => {
  let flatSalaires = [];
  let salairesCopy = JSON.parse(JSON.stringify(salaires));
  Object.keys(salairesCopy).forEach((item) =>
    salairesCopy[item].forEach((sal) => {
      sal.dos = parseInt(item);
      sal.id = `${item};${sal.id}`;
      flatSalaires.push(sal);
    })
  );

  return (
    <Grid>
      <Card>
        <CardHeader
          disableTypography={false}
          titleTypographyProps={{ fontWeight: "bold" }}
          title={"Liste des salariés"}
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
            <SalairesTable data={flatSalaires} />
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
