import React, { useState, useEffect } from "react";

import { Grid, TextField } from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DossierFilters = ({ dossiers, setFilteredDossiers }) => {
  const [mrFilter, setMrFilter] = useState(0);
  const [descFilter, setDescFilter] = useState("");

  const filterMR = (e) => {
    setMrFilter(e.target.value);
  };

  const filterDesc = (e) => {
    setDescFilter(e.target.value);
  };

  useEffect(() => {
    const fil = dossiers
      .filter((dos) => dos.MR > mrFilter)
      .filter((dos) =>
        dos.Evenement.toLowerCase().includes(descFilter.toLowerCase())
      );
    setFilteredDossiers(fil);
  }, [descFilter, dossiers, mrFilter, setFilteredDossiers]);

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
                label="Description"
                variant="outlined"
                size="small"
                value={descFilter}
                onChange={filterDesc}
              />
            </Grid>
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
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default DossierFilters;
