import React, { useState } from "react";

import {
  Grid,
  TextField,
  MenuItem,
  Autocomplete,
  Box,
  Button,
  Stack,
} from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import UndoIcon from "@mui/icons-material/Undo";
import SearchIcon from "@mui/icons-material/Search";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import InputAdornment from "@mui/material/InputAdornment";

const MachineriesFilters = ({
  machineries,
  setFilteredMachineries,
  numDos,
  sites,
}) => {
  const [cout, setCout] = useState(0);
  const [desc, setDesc] = useState("");
  const [hFonc, setHFonc] = useState({ min: 0, max: 100 });
  const [hStat, setHStat] = useState({ min: 0, max: 100 });
  const [tFonc, setTFonc] = useState({ min: 0, max: 100 });
  const [main, setMain] = useState({ min: 0, max: 100 });
  const [prejudice, setPrejudice] = useState("");
  const [numDoses, setNumDoses] = useState([]);
  const [siteses, setSiteses] = useState([]);

  const filterDos = (e, val) => {
    setNumDoses(val);
  };
  const filterSite = (e, val) => {
    setSiteses(val);
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

  const filterTable = () => {
    const fil = machineries
      .filter((mach) =>
        numDoses.length > 0 ? numDoses.includes(mach.id.split(";")[0]) : true
      )
      .filter((mach) => (cout > 0 ? mach.cout > cout : true))
      .filter((mach) => (prejudice ? mach.type === prejudice : true))
      .filter((fac) =>
        siteses.length > 0 ? siteses.includes(fac.site_con) : true
      )
      .filter((mach) =>
        desc !== ""
          ? mach.desc.toLowerCase().includes(desc.toLowerCase())
          : true
      )
      .filter((mach) =>
        hFonc.max - hFonc.min < 100
          ? mach.hrs_fonc >= hFonc.min && mach.hrs_fonc <= hFonc.max
          : true
      )
      .filter((mach) =>
        hStat.max - hStat.min < 100
          ? mach.hrs_stat >= hStat.min && mach.hrs_stat <= hStat.max
          : true
      )
      .filter((mach) =>
        tFonc.max - tFonc.min < 100
          ? mach.taux_fonc >= tFonc.min && mach.taux_fonc <= tFonc.max
          : true
      )
      .filter((mach) =>
        main.max - main.min < 100
          ? mach.maintenance >= main.min && mach.maintenance <= main.max
          : true
      );

    setFilteredMachineries(fil);
  };
  const resetForm = () => {
    setCout(0);
    setDesc("");
    setHFonc({ min: 0, max: 100 });
    setHStat({ min: 0, max: 100 });
    setTFonc({ min: 0, max: 100 });
    setMain({ min: 0, max: 100 });
    setPrejudice("");
    setNumDoses([]);
    setSiteses([]);
    setFilteredMachineries(machineries);
  };

  const prejudices = {
    dab: "Dommage au biens",
    mpt: "Mesures preventives temporarires",
    mi: "Mesures d'interventions",
    bcg: "Bris du couvert de glace",
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
            <Grid item xs={6} lg={4}>
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
          <Grid container columnSpacing={3} rowSpacing={1}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={1}>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ whiteSpace: "nowrap" }} mr={1}>
                    En fonction
                  </Typography>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="min"
                      value={hFonc.min}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setHFonc({ ...hFonc, min: e.target.value })
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <AccessTimeIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="max"
                      value={hFonc.max}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setHFonc({ ...hFonc, max: e.target.value })
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <AccessTimeIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={1}>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ whiteSpace: "nowrap" }} mr={1}>
                    Stationnaire
                  </Typography>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="min"
                      value={hStat.min}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setHStat({ ...hStat, min: e.target.value })
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <AccessTimeIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="max"
                      value={hStat.max}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setHStat({ ...hStat, max: e.target.value })
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <AccessTimeIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Box>
              </Grid>
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
          <Grid container columnSpacing={3} rowSpacing={1}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={1}>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ whiteSpace: "nowrap" }} mr={1}>
                    En fonction
                  </Typography>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="min"
                      value={tFonc.min}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setTFonc({ ...tFonc, min: e.target.value })
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <AttachMoneyIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="max"
                      value={tFonc.max}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setTFonc({ ...tFonc, max: e.target.value })
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <AttachMoneyIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={1}>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ whiteSpace: "nowrap" }} mr={1}>
                    Maintenance
                  </Typography>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="min"
                      value={main.min}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setMain({ ...main, min: e.target.value })
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <AttachMoneyIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="max"
                      value={main.max}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setMain({ ...main, max: e.target.value })
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <AttachMoneyIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Box>
              </Grid>
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

export default MachineriesFilters;
