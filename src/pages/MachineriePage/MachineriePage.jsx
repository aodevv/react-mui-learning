import React, { useState } from "react";
import { Outlet } from "react-router-dom";

// REDUX
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectMachineriesMemo } from "../../redux/Machineries/machineries.selectors";

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

import MachineriesTable from "../../Components/Tables/Machineries/MachineriesTable";
import MachineriesFilters from "../../Components/Filters/MachineriesFilters/MachineriesFilters";

const MachineriePage = ({ machinerie }) => {
  let flatMachines = [];
  let machinerieCopy = JSON.parse(JSON.stringify(machinerie));
  Object.keys(machinerieCopy).forEach((item) =>
    machinerieCopy[item].forEach((mach) => {
      mach.dos = parseInt(item);
      mach.id = `${item};${mach.id}`;
      flatMachines.push(mach);
    })
  );

  const [filteredMachineries, setFilteredMachineries] = useState(flatMachines);

  let dosOnly = [];

  Object.keys(machinerie).forEach((item) => {
    if (machinerie[item].length > 0) dosOnly.push(item);
  });
  return (
    <Grid>
      <Card>
        <CardHeader
          disableTypography={false}
          titleTypographyProps={{ fontWeight: "bold" }}
          title={"Liste machineries"}
        />
        <CardContent>
          <Grid item xs={12} md={8} mb={2}>
            <MachineriesFilters
              machineries={flatMachines}
              setFilteredMachineries={setFilteredMachineries}
              numDos={dosOnly}
            />
          </Grid>
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
            <MachineriesTable data={filteredMachineries} />
          </Box>
        </CardContent>
      </Card>
      <Outlet />
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  machinerie: selectMachineriesMemo,
});

export default connect(mapStateToProps)(MachineriePage);
