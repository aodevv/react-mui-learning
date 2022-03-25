import React, { useState, useEffect } from "react";

import {
  Grid,
  TextField,
  MenuItem,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  Switch,
  Box,
  Stack,
  Button,
} from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import MobileDatePicker from "@mui/lab/MobileDatePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import UndoIcon from "@mui/icons-material/Undo";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import InputAdornment from "@mui/material/InputAdornment";

const FacturesFilters = ({ factures, setFilteredFactures, sites, numDos }) => {
  const [mrFilter, setMrFilter] = useState(0);
  const [descFilter, setDescFilter] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [siteses, setSiteses] = useState([]);
  const [prejudice, setPrejudice] = useState("");
  const [numDoses, setNumDoses] = useState([]);
  const [tax, setTax] = useState(true);
  const [taxSw, setTaxSw] = useState(false);
  const [value, setValue] = useState(new Date());

  const filterMR = (e) => {
    setMrFilter(e.target.value);
  };

  const filterDesc = (e) => {
    setDescFilter(e.target.value);
  };
  const filterDebut = (e) => {
    setStartDate(e);
  };

  const filterEnd = (e) => {
    setEndDate(e);
  };

  const filterSite = (e, val) => {
    setSiteses(val);
  };

  const filterDos = (e, val) => {
    setNumDoses(val);
  };

  const filterTax = (e) => {
    setTax(e.target.checked);
  };

  const toggleTax = () => {
    setTaxSw(!taxSw);
  };

  const filterPrejudice = (e) => {
    console.log(e.target.value);
    setPrejudice(
      Object.keys(prejudices).find((key) => prejudices[key] === e.target.value)
    );
  };

  const prejudices = {
    dab: "Dommage au biens",
    mpt: "Mesures preventives temporarires",
    mi: "Mesures d'interventions",
    bcg: "Bris du couvert de glace",
  };

  const resetForm = () => {
    setDescFilter("");
    setMrFilter(0);
    setStartDate(null);
    setEndDate(null);
    setSiteses([]);
    setNumDoses([]);
    setPrejudice("");
    setTax(true);
    setTaxSw(false);
    setFilteredFactures(factures);
  };

  const filterTable = () => {
    console.log(factures);
    const fil = factures
      .filter((fac) => fac.montant_rec > mrFilter)
      .filter((fac) => (taxSw ? fac.tax === tax : true))
      .filter((fac) => (prejudice ? fac.type === prejudice : true))
      .filter((fac) =>
        fac.desc_fact.toLowerCase().includes(descFilter.toLowerCase())
      )
      .filter((fac) =>
        numDoses.length > 0 ? numDoses.includes(fac.id.split(";")[0]) : true
      )
      .filter((fac) =>
        siteses.length > 0 ? siteses.includes(fac.site_con) : true
      )
      .filter((fac) => {
        const dFac = new Date(fac.date_fact);
        const debut = startDate ? new Date(startDate) : new Date("01/01/2010");
        const fin = endDate ? new Date(endDate) : new Date("01/01/2040");

        return dFac >= debut && dFac <= fin;
      });
    setFilteredFactures(fil);
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
            <Grid item xs={12} md={4}>
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
                    placeholder="Rechercher dossier"
                    margin="dense"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                select
                fullWidth
                label="Préjudice"
                size="small"
                onChange={filterPrejudice}
                defaultValue=""
                margin="dense"
              >
                <MenuItem value="">
                  <em>Tout</em>
                </MenuItem>
                {Object.keys(prejudices).map((item) => {
                  return (
                    <MenuItem key={item} value={prejudices[item]}>
                      {prejudices[item]}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item xs={6} md={4}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={sites}
                value={siteses}
                onChange={filterSite}
                getOptionLabel={(site) => site}
                defaultValue={[]}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    size="small"
                    label="Sites"
                    placeholder="Rechercher site"
                    margin="dense"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Montant réclamé"
                variant="outlined"
                size="small"
                type="number"
                value={mrFilter}
                onChange={filterMR}
                margin="dense"
              />
            </Grid>
            <Grid item xs={4}>
              {/* <TextField
                margin="dense"
                fullWidth
                label="Date debut"
                value={startDate}
                size="small"
                type="date"
                InputLabelProps={{ shrink: true }}
                onChange={filterDebut}
              /> */}
              <MobileDatePicker
                label="Date début"
                value={startDate}
                minDate={new Date("2017-01-01")}
                onChange={filterDebut}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="dense"
                    size="small"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarTodayIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              {/* <TextField
                margin="dense"
                fullWidth
                label="Date fin"
                value={endDate}
                size="small"
                type="date"
                InputLabelProps={{ shrink: true }}
                onChange={filterEnd}
              /> */}
              <DesktopDatePicker
                label="Date fin"
                value={endDate}
                onChange={filterEnd}
                renderInput={(params) => (
                  <TextField
                    margin="dense"
                    size="small"
                    fullWidth
                    {...params}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                size="small"
                value={descFilter}
                onChange={filterDesc}
                margin="dense"
              />
            </Grid>
          </Grid>

          <Grid container mt={1} spacing={2}></Grid>
          <Grid
            container
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex">
              <Box mr={2}>
                <Switch checked={taxSw} onChange={toggleTax} />
              </Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={tax}
                    onChange={filterTax}
                    disabled={!taxSw}
                  />
                }
                label="Taxable ?"
              />
            </Box>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                size="small"
                startIcon={<SearchIcon />}
                onClick={filterTable}
              >
                Chercher
              </Button>
              <Button onClick={resetForm} size="small" startIcon={<UndoIcon />}>
                Réinitialiser
              </Button>
            </Stack>
          </Grid>
          <Grid container></Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default FacturesFilters;
