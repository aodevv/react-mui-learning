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
} from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FacturesFilters = ({ factures, setFilteredFactures, sites, numDos }) => {
  const [mrFilter, setMrFilter] = useState(0);
  const [descFilter, setDescFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [siteses, setSiteses] = useState([]);
  const [prejudice, setPrejudice] = useState("");
  const [numDoses, setNumDoses] = useState([]);
  const [tax, setTax] = useState(true);
  const [taxSw, setTaxSw] = useState(false);

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

  useEffect(() => {
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
  }, [
    setFilteredFactures,
    prejudice,
    numDoses,
    siteses,
    descFilter,
    mrFilter,
    tax,
    taxSw,
    startDate,
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
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Préjudice"
                size="small"
                onChange={filterPrejudice}
                defaultValue=""
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
          <Grid container mt={2}>
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
          <Grid container mt={2}>
            <Grid item xs={12}>
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
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container mt={1} spacing={2}>
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
          <Grid container mt={2}>
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
          </Grid>

          <Grid container spacing={2} mt={1}></Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default FacturesFilters;
