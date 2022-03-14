import React, { useState } from "react";
import { Outlet } from "react-router-dom";

// REDUX
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectFacturesMemo } from "../../redux/Factures/Factures.selectors";
import { selectSitesMemo } from "../../redux/Sites/Sites.selectors";

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

import FacturesFilters from "../../Components/Filters/FacturesFilters/FacturesFilters";

const FacturePage = ({ factures, sites }) => {
  let flatFactures = [];
  let facturesCopy = JSON.parse(JSON.stringify(factures));
  Object.keys(facturesCopy).forEach((item, index) =>
    facturesCopy[item].forEach((fac) => {
      fac.dos = parseInt(item);
      fac.id = `${item};${fac.id}`;
      flatFactures.push(fac);
    })
  );
  const [filteredFactures, setFilteredFactures] = useState(flatFactures);

  let sitesOnly = [];
  let dosOnly = [];

  Object.keys(sites).forEach((item, index) => {
    sites[item].map((site) => sitesOnly.push(site.site));
  });

  Object.keys(factures).forEach((item) => {
    if (factures[item].length > 0) dosOnly.push(item);
  });

  const remove_duplicates = (arr) => {
    var obj = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
      obj[arr[i]] = true;
    }
    for (var key in obj) {
      ret_arr.push(key);
    }
    return ret_arr;
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
          <Grid item xs={12} md={8} mb={2}>
            <FacturesFilters
              factures={flatFactures}
              setFilteredFactures={setFilteredFactures}
              sites={remove_duplicates(sitesOnly)}
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
            <FacturesTable data={filteredFactures} />
          </Box>
        </CardContent>
      </Card>
      <Outlet />
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  factures: selectFacturesMemo,
  sites: selectSitesMemo,
});

export default connect(mapStateToProps)(FacturePage);
