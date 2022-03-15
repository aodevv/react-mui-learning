import React, { useState, useEffect } from "react";

import {
  Grid,
  TextField,
  MenuItem,
  Autocomplete,
  Box,
  Slider,
  Stack,
} from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: 100,
    label: "100",
  },
];

const marksT = [
  {
    value: 10,
    label: "10$",
  },
  {
    value: 30,
    label: "30$",
  },
  {
    value: 60,
    label: "60$",
  },
  {
    value: 100,
    label: "100$",
  },
];

const SalairesFilters = ({ salaires, setFilteredSalaires, numDos }) => {
  const [mrFilter, setMrFilter] = useState(0);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hreg, setHreg] = useState([0, 100]);
  const [hsup, setHsup] = useState([0, 100]);
  const [hsup2, setHsup2] = useState([0, 100]);
  const [treg, setTreg] = useState([10, 100]);
  const [tsup, setTsup] = useState([10, 100]);
  const [tsup2, setTsup2] = useState([10, 100]);
  const [prejudice, setPrejudice] = useState("");
  const [numDoses, setNumDoses] = useState([]);
  const [tax, setTax] = useState(true);
  const [taxSw, setTaxSw] = useState(false);
  const filterMR = (e) => {
    setMrFilter(e.target.value);
  };

  const filterName = (e) => {
    setName(e.target.value);
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

  const filterDos = (e, val) => {
    setNumDoses(val);
  };
  const filterHreg = (e, val) => {
    setHreg(val);
  };
  const filterHsup = (e, val) => {
    setHsup(val);
  };
  const filterHsup2 = (e, val) => {
    setHsup2(val);
  };

  const filterTreg = (e, val) => {
    setTreg(val);
  };
  const filterTsup = (e, val) => {
    setTsup(val);
  };
  const filterTsup2 = (e, val) => {
    setTsup2(val);
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

  useEffect(() => {
    const fil = salaires
      .filter((sal) => sal.montant_rec > mrFilter)
      .filter((sal) => (prejudice ? sal.type === prejudice : true))
      .filter((sal) => (status ? sal.status === status : true))
      .filter((sal) =>
        hreg[1] - hreg[0] < 100
          ? sal.Hreg >= hreg[0] && sal.Hreg <= hreg[1]
          : true
      )
      .filter((sal) =>
        hsup[1] - hsup[0] < 100
          ? sal.Hsup >= hsup[0] && sal.Hsup <= hsup[1]
          : true
      )
      .filter((sal) =>
        hsup2[1] - hsup2[0] < 100
          ? sal.Hsup2 >= hsup2[0] && sal.Hsup2 <= hsup2[1]
          : true
      )
      .filter((sal) =>
        treg[1] - treg[0] < 90
          ? sal.Treg >= treg[0] && sal.Treg <= treg[1]
          : true
      )
      .filter((sal) =>
        tsup[1] - tsup[0] < 90
          ? sal.Tsup >= tsup[0] && sal.Tsup <= tsup[1]
          : true
      )
      .filter((sal) =>
        tsup2[1] - tsup2[0] < 90
          ? sal.Tsup2 >= tsup2[0] && sal.Tsup2 <= tsup2[1]
          : true
      )
      .filter((sal) => sal.name.toLowerCase().includes(name.toLowerCase()))
      .filter((fac) =>
        numDoses.length > 0 ? numDoses.includes(fac.id.split(";")[0]) : true
      )
      .filter((sal) => {
        const dSal = new Date(sal.date_per);
        const debut = startDate ? new Date(startDate) : new Date("01/01/2010");
        const fin = endDate ? new Date(endDate) : new Date("01/01/2040");

        return dSal >= debut && dSal <= fin;
      });
    setFilteredSalaires(fil);
  }, [
    setFilteredSalaires,
    prejudice,
    numDoses,
    name,
    mrFilter,
    startDate,
    endDate,
    status,
    hreg,
    hsup,
    hsup2,
    treg,
    tsup,
    tsup2,
  ]);

  const prejudices = {
    dab: "Dommage au biens",
    mpt: "Mesures preventives temporarires",
    mi: "Mesures d'interventions",
    bcg: "Bris du couvert de glace",
  };

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
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Nom et prénom"
                variant="outlined"
                size="small"
                margin="dense"
                value={name}
                onChange={filterName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Status"
                size="small"
                margin="dense"
                onChange={filterStatus}
                defaultValue=""
              >
                <MenuItem value="">
                  <em>Tout</em>
                </MenuItem>

                <MenuItem value="occ">Occasionnel</MenuItem>
                <MenuItem value="reg">Régulier</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                select
                fullWidth
                label="Préjudice"
                size="small"
                margin="dense"
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
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Montant réclamé"
                variant="outlined"
                size="small"
                type="number"
                margin="dense"
                value={mrFilter}
                onChange={filterMR}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Date debut"
                value={startDate}
                size="small"
                margin="dense"
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
                margin="dense"
                type="date"
                InputLabelProps={{ shrink: true }}
                onChange={filterEnd}
              />
            </Grid>
          </Grid>
          <Typography variant="h6">Heures</Typography>
          <Grid container>
            <Grid item xs={12}>
              <Box sx={{ width: "100%", pr: 2 }}>
                <Stack spacing={2} direction="row" alignItems="center">
                  <Typography>Régulier</Typography>
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={hreg}
                    onChange={filterHreg}
                    valueLabelDisplay="auto"
                    marks={marks}
                    step={10}
                  />
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={3} mt={1}>
            <Grid item xs={6}>
              <Box sx={{ width: "100%", pr: 2 }}>
                <Stack
                  spacing={2}
                  direction="row"
                  sx={{ mb: 1 }}
                  alignItems="center"
                >
                  <Typography>Sup1</Typography>
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={hsup}
                    onChange={filterHsup}
                    valueLabelDisplay="auto"
                    marks={marks}
                    step={10}
                  />
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ width: "100%", pr: 2 }}>
                <Stack
                  spacing={2}
                  direction="row"
                  sx={{ mb: 1 }}
                  alignItems="center"
                >
                  <Typography>Sup2</Typography>
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={hsup2}
                    onChange={filterHsup2}
                    valueLabelDisplay="auto"
                    marks={marks}
                    step={10}
                  />
                </Stack>
              </Box>
            </Grid>
          </Grid>
          {/* TAUXXXXXXXXXXXXX */}
          {/* TAUXXXXXXXXXXXXX */}
          {/* TAUXXXXXXXXXXXXX */}
          {/* TAUXXXXXXXXXXXXX */}
          {/* TAUXXXXXXXXXXXXX */}
          {/* TAUXXXXXXXXXXXXX */}
          <Typography variant="h6" mt={2}>
            Taux
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <Box sx={{ width: "100%", pr: 2 }}>
                <Stack spacing={2} direction="row" alignItems="center">
                  <Typography>Régulier</Typography>
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={treg}
                    onChange={filterTreg}
                    valueLabelDisplay="auto"
                    marks={marksT}
                    color="success"
                    step={10}
                    min={10}
                  />
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={3} mt={1}>
            <Grid item xs={6}>
              <Box sx={{ width: "100%", pr: 2 }}>
                <Stack
                  spacing={2}
                  direction="row"
                  sx={{ mb: 1 }}
                  alignItems="center"
                >
                  <Typography>Sup1</Typography>
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={tsup}
                    onChange={filterTsup}
                    valueLabelDisplay="auto"
                    marks={marksT}
                    color="success"
                    step={10}
                    min={10}
                  />
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ width: "100%", pr: 2 }}>
                <Stack
                  spacing={2}
                  direction="row"
                  sx={{ mb: 1 }}
                  alignItems="center"
                >
                  <Typography>Sup2</Typography>
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={tsup2}
                    onChange={filterTsup2}
                    valueLabelDisplay="auto"
                    marks={marksT}
                    color="success"
                    step={10}
                    min={10}
                  />
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default SalairesFilters;
