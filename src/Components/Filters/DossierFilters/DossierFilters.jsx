import React, { useState } from "react";

import { Grid, TextField } from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DossierFilters = ({ dossiers, setFilteredDossiers }) => {
  const [mrFilter, setMrFilter] = useState(0);
  const filterMR = (e) => {
    setMrFilter(e.target.value);
    const fil = dossiers.filter((dos) => dos.MR > e.target.value);
    setFilteredDossiers(fil);
  };
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Filtres</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                label="Montant"
                variant="outlined"
                size="small"
                type="number"
                value={mrFilter}
                onChange={filterMR}
              />
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default DossierFilters;
