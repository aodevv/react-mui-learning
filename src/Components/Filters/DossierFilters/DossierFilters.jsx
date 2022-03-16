import React, { useState, useEffect } from "react";

import { Grid, TextField, MenuItem } from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DossierFilters = ({ dossiers, setFilteredDossiers }) => {
  const [mrFilter, setMrFilter] = useState(0);
  const [mvFilter, setMvFilter] = useState(0);
  const [descFilter, setDescFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("all");

  const filterMR = (e) => {
    setMrFilter(e.target.value);
  };

  const filterMV = (e) => {
    setMvFilter(e.target.value);
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

  const filterStatus = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    const fil = dossiers
      .filter((dos) => dos.MR > mrFilter)
      .filter((dos) => dos.MV > mvFilter)
      .filter((dos) =>
        status === "" || status === "all" ? true : dos.status === status
      )
      .filter((dos) =>
        dos.Evenement.toLowerCase().includes(descFilter.toLowerCase())
      )
      .filter((dos) => {
        const dDos = new Date(dos.datEv);
        const debut = startDate ? new Date(startDate) : new Date("01/01/2010");
        const fin = endDate ? new Date(endDate) : new Date("01/01/2040");

        return dDos >= debut && dDos <= fin;
      });
    setFilteredDossiers(fil);
  }, [
    descFilter,
    dossiers,
    mrFilter,
    mvFilter,
    setFilteredDossiers,
    startDate,
    status,
    endDate,
  ]);

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5">Filtres</Typography>
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
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Montant versé"
                variant="outlined"
                size="small"
                value={mvFilter}
                onChange={filterMV}
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
                onChange={filterStatus}
                defaultValue=""
              >
                <MenuItem value="actif">Actif</MenuItem>
                <MenuItem value="fermé">Fermé</MenuItem>
                <MenuItem value="all">Les 2</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default DossierFilters;
