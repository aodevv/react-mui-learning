import React, { useState, useEffect } from "react";

import { Grid, TextField, MenuItem } from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FacturesFilters = ({ factures, setFilteredFactures, sites }) => {
  const [mrFilter, setMrFilter] = useState(0);
  const [descFilter, setDescFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [site, setSite] = useState("");

  const filterMR = (e) => {
    setMrFilter(e.target.value);
  };

  const filterDesc = (e) => {
    setDescFilter(e.target.value);
  };
  const filterDebut = (e) => {
    setStartDate(e.target.value);
  };

  const filterEnd = (e) => {
    setEndDate(e.target.value);
  };

  const filterSite = (e) => {
    setSite(e.target.value);
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                size="small"
                value={descFilter}
                onChange={filterDesc}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Montant réclamé"
                variant="outlined"
                size="small"
                type="number"
                value={mrFilter}
                onChange={filterMR}
              />
            </Grid>
          </Grid>
          <Grid container mt={2} spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Date debut"
                value={startDate}
                size="small"
                type="date"
                InputLabelProps={{ shrink: true }}
                onChange={filterDebut}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Date fin"
                value={endDate}
                size="small"
                type="date"
                InputLabelProps={{ shrink: true }}
                onChange={filterEnd}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Status"
                size="small"
                onChange={filterSite}
                defaultValue=""
              >
                {sites.map((item, pos) => {
                  return (
                    <MenuItem key={pos} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default FacturesFilters;
