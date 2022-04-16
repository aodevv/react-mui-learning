import React, { useState } from "react";

import { Grid, TextField, MenuItem, Box, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import UndoIcon from "@mui/icons-material/Undo";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const DossierFilters = ({ dossiers, setFilteredDossiers, numDos }) => {
  const [mrFilter, setMrFilter] = useState(0);
  const [numDoses, setNumDoses] = useState([]);
  const [maFilter, setMaFilter] = useState(0);
  const [mvFilter, setMvFilter] = useState(0);
  const [descFilter, setDescFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [operMR, setOperMR] = useState("sup");
  const [operMA, setOperMA] = useState("sup");
  const [operMV, setOperMV] = useState("sup");

  const filterDos = (e, val) => {
    setNumDoses(val);
  };

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

  const handleOperMR = (e) => {
    setOperMR(e.target.value);
  };
  const handleOperMA = (e) => {
    setOperMA(e.target.value);
  };
  const handleOperMV = (e) => {
    setOperMV(e.target.value);
  };

  const resetForm = () => {
    setMrFilter(0);
    setMaFilter(0);
    setMvFilter(0);
    setDescFilter("");
    setStartDate("");
    setEndDate("");
    setStatus("");
    setNumDoses([]);
    setFilteredDossiers(dossiers);
    setOperMV("sup");
    setOperMA("sup");
    setOperMV("sup");
  };

  const filterTable = () => {
    let fil = dossiers
      .filter((dos) =>
        numDoses.length > 0 ? numDoses.includes(dos.id.toString()) : true
      )
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

    switch (operMR) {
      case "sup":
        fil = fil.filter((dos) => dos.MR >= mrFilter);
        break;
      case "inf":
        fil = fil.filter((dos) => dos.MR < mrFilter);
        break;
      case "egal":
        fil = fil.filter((dos) => dos.MR == mrFilter);
        break;

      default:
        break;
    }
    switch (operMA) {
      case "sup":
        fil = fil.filter((dos) => dos.MA >= maFilter);
        break;
      case "inf":
        fil = fil.filter((dos) => dos.MA <= maFilter);
        break;
      case "egal":
        fil = fil.filter((dos) => dos.MA == maFilter);
        break;

      default:
        break;
    }
    switch (operMV) {
      case "sup":
        fil = fil.filter((dos) => dos.MV >= mvFilter);
        break;
      case "inf":
        fil = fil.filter((dos) => dos.MV <= mvFilter);
        break;
      case "egal":
        fil = fil.filter((dos) => dos.MV == mvFilter);
        break;

      default:
        break;
    }
    setFilteredDossiers(fil);
  };

  return (
    <>
      <Accordion sx={{ border: "1px solid #eee" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ backgroundColor: "#eeeb" }}
        >
          <Box display="flex" alignItems="center">
            <FilterAltIcon />
            <Typography ml={1} variant="h5" textAlign="center">
              Filtres
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                margin="dense"
                label="Evénement"
                variant="outlined"
                size="small"
                value={descFilter}
                onChange={filterDesc}
              />
            </Grid>
            <Grid item xs={6} lg={4}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={numDos}
                value={numDoses}
                getOptionLabel={(dos) => dos}
                defaultValue={[]}
                filterSelectedOptions
                onChange={filterDos}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    size="small"
                    label="Numéro dossier"
                    margin="dense"
                    placeholder="Rechercher dossier"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} lg={4}>
              <TextField
                margin="dense"
                select
                fullWidth
                label="Status"
                size="small"
                onChange={filterStatus}
                defaultValue=""
              >
                <MenuItem value="actif">Actif</MenuItem>
                <MenuItem value="fermé">Fermé</MenuItem>
                <MenuItem value="">--</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Typography variant="h6" mt={1}>
            Montants
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={9}>
                  <TextField
                    margin="dense"
                    fullWidth
                    label="Montant réclamé"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={mrFilter}
                    onChange={filterMR}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    margin="dense"
                    select
                    fullWidth
                    label="Opérateur"
                    size="small"
                    onChange={handleOperMR}
                    defaultValue="sup"
                  >
                    <MenuItem value="egal">=</MenuItem>
                    <MenuItem value="sup">&gt;</MenuItem>
                    <MenuItem value="inf">&lt;</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={9}>
                  <TextField
                    margin="dense"
                    fullWidth
                    label="Montant admissible"
                    variant="outlined"
                    size="small"
                    value={maFilter}
                    onChange={(e) => setMaFilter(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    margin="dense"
                    select
                    fullWidth
                    label="Opérateur"
                    size="small"
                    onChange={handleOperMA}
                    defaultValue="sup"
                  >
                    <MenuItem value="egal">=</MenuItem>
                    <MenuItem value="sup">&gt;</MenuItem>
                    <MenuItem value="inf">&lt;</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={9}>
                  <TextField
                    margin="dense"
                    fullWidth
                    label="Montant versé"
                    variant="outlined"
                    size="small"
                    value={mvFilter}
                    onChange={filterMV}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    margin="dense"
                    select
                    fullWidth
                    label="Opérateur"
                    size="small"
                    onChange={handleOperMV}
                    defaultValue="sup"
                  >
                    <MenuItem value="egal">=</MenuItem>
                    <MenuItem value="sup">&gt;</MenuItem>
                    <MenuItem value="inf">&lt;</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                margin="dense"
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
                margin="dense"
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
          <Grid container mt={2}>
            <Grid item xs={12}>
              <Grid container display="flex" justifyContent="flex-end">
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<SearchIcon />}
                    onClick={filterTable}
                  >
                    Chercher
                  </Button>
                  <Button
                    onClick={resetForm}
                    size="small"
                    startIcon={<UndoIcon />}
                  >
                    Réinitialiser
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default DossierFilters;
