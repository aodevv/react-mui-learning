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
    value: 0,
    label: "0$",
  },
  {
    value: 20,
    label: "20$",
  },
  {
    value: 50,
    label: "50$",
  },
  {
    value: 100,
    label: "100$",
  },
];

const MachineriesFilters = ({
  machineries,
  setFilteredMachineries,
  numDos,
}) => {
  const [cout, setCout] = useState(0);
  const [desc, setDesc] = useState("");
  const [hFonc, setHFonc] = useState([0, 100]);
  const [hStat, setHStat] = useState([0, 100]);
  const [tFonc, setTFonc] = useState([0, 100]);
  const [main, setMain] = useState([0, 100]);
  const [prejudice, setPrejudice] = useState("");
  const [numDoses, setNumDoses] = useState([]);

  const filterDos = (e, val) => {
    setNumDoses(val);
  };

  const filterPrejudice = (e) => {
    setPrejudice(
      Object.keys(prejudices).find((key) => prejudices[key] === e.target.value)
    );
  };

  const filterCout = (e) => {
    setCout(e.target.value);
  };
  const filterDesc = (e) => {
    setDesc(e.target.value);
  };

  const filterHFonc = (e, val) => {
    setHFonc(val);
  };

  const filterHStat = (e, val) => {
    setHStat(val);
  };
  const filterTFonc = (e, val) => {
    setTFonc(val);
  };
  const filterMain = (e, val) => {
    setMain(val);
  };

  useEffect(() => {
    const fil = machineries
      .filter((mach) =>
        numDoses.length > 0 ? numDoses.includes(mach.id.split(";")[0]) : true
      )
      .filter((mach) => (cout > 0 ? mach.cout > cout : true))
      .filter((mach) => (prejudice ? mach.type === prejudice : true))
      .filter((mach) =>
        desc !== ""
          ? mach.desc.toLowerCase().includes(desc.toLowerCase())
          : true
      )
      .filter((mach) =>
        hFonc[1] - hFonc[0] < 100
          ? mach.hrs_fonc >= hFonc[0] && mach.hrs_fonc <= hFonc[1]
          : true
      )
      .filter((mach) =>
        hStat[1] - hStat[0] < 100
          ? mach.hrs_stat >= hStat[0] && mach.hrs_stat <= hStat[1]
          : true
      )
      .filter((mach) =>
        tFonc[1] - tFonc[0] < 100
          ? mach.taux_fonc >= tFonc[0] && mach.taux_fonc <= tFonc[1]
          : true
      )
      .filter((mach) =>
        main[1] - main[0] < 100
          ? mach.maintenance >= main[0] && mach.maintenance <= main[1]
          : true
      );

    setFilteredMachineries(fil);
  }, [
    setFilteredMachineries,
    numDoses,
    cout,
    desc,
    hFonc,
    hStat,
    tFonc,
    main,
    prejudice,
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
          <Grid container spacing={2}>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                size="small"
                margin="dense"
                value={desc}
                onChange={filterDesc}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Coût"
                type="number"
                size="small"
                margin="dense"
                value={cout}
                onChange={filterCout}
              />
            </Grid>
          </Grid>
          <Typography variant="h6" mt={2}>
            Heures
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box sx={{ width: "100%", pr: 2 }}>
                <Stack
                  spacing={2}
                  direction="row"
                  sx={{ mb: 1 }}
                  alignItems="center"
                >
                  <Typography>Fonc</Typography>
                  <Slider
                    size="small"
                    getAriaLabel={() => "Temperature range"}
                    value={hFonc}
                    onChange={filterHFonc}
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
                  <Typography>Stat</Typography>
                  <Slider
                    size="small"
                    getAriaLabel={() => "Temperature range"}
                    value={hStat}
                    onChange={filterHStat}
                    valueLabelDisplay="auto"
                    marks={marks}
                    step={10}
                  />
                </Stack>
              </Box>
            </Grid>
          </Grid>
          {/* TAUXXXXXXXX */}
          {/* TAUXXXXXXXX */}
          {/* TAUXXXXXXXX */}
          {/* TAUXXXXXXXX */}
          {/* TAUXXXXXXXX */}
          {/* TAUXXXXXXXX */}
          {/* TAUXXXXXXXX */}
          <Typography variant="h6" mt={2}>
            Taux
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box sx={{ width: "100%", pr: 2 }}>
                <Stack
                  spacing={2}
                  direction="row"
                  sx={{ mb: 1 }}
                  alignItems="center"
                >
                  <Typography>Fonc</Typography>
                  <Slider
                    size="small"
                    getAriaLabel={() => "Temperature range"}
                    value={tFonc}
                    onChange={filterTFonc}
                    valueLabelDisplay="auto"
                    marks={marksT}
                    color="success"
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
                  <Typography>Maintenance</Typography>
                  <Slider
                    size="small"
                    getAriaLabel={() => "Temperature range"}
                    value={main}
                    onChange={filterMain}
                    valueLabelDisplay="auto"
                    marks={marksT}
                    color="success"
                    step={10}
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

export default MachineriesFilters;
