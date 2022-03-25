import React, { useState, useEffect } from "react";

import {
  Grid,
  TextField,
  MenuItem,
  Autocomplete,
  Box,
  Stack,
  Button,
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

const SalairesFilters = ({ salaires, setFilteredSalaires, numDos, sites }) => {
  const [mrFilter, setMrFilter] = useState(0);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hreg, setHreg] = useState({ min: 0, max: 100 });
  const [hsup, setHsup] = useState({ min: 0, max: 100 });
  const [hsup2, setHsup2] = useState({ min: 0, max: 100 });
  const [treg, setTreg] = useState({ min: 10, max: 100 });
  const [tsup, setTsup] = useState({ min: 10, max: 100 });
  const [tsup2, setTsup2] = useState({ min: 10, max: 100 });
  const [prejudice, setPrejudice] = useState("");
  const [numDoses, setNumDoses] = useState([]);
  const [tax, setTax] = useState(true);
  const [taxSw, setTaxSw] = useState(false);
  const [siteses, setSiteses] = useState([]);

  const filterMR = (e) => {
    setMrFilter(e.target.value);
  };

  const filterNom = (e) => {
    setNom(e.target.value);
  };
  const filterPrenom = (e) => {
    setPrenom(e.target.value);
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
  const filterSite = (e, val) => {
    setSiteses(val);
  };

  const filterDos = (e, val) => {
    setNumDoses(val);
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

  const resetForm = () => {
    setFilteredSalaires(salaires);
    setMrFilter(0);
    setNom("");
    setPrenom("");
    setStatus("");
    setStartDate("");
    setEndDate("");
    setHreg({ min: 0, max: 100 });
    setHsup({ min: 0, max: 100 });
    setHsup2({ min: 0, max: 100 });
    setTreg({ min: 10, max: 100 });
    setTsup({ min: 10, max: 100 });
    setTsup2({ min: 10, max: 100 });
    setPrejudice("");
    setNumDoses([]);
    setTax(true);
    setTaxSw(false);
    setSiteses([]);
  };
  const filterTable = () => {
    const fil = salaires
      .filter((sal) => sal.montant_rec > mrFilter)
      .filter((sal) => (prejudice ? sal.type === prejudice : true))
      .filter((sal) => (status ? sal.status === status : true))
      .filter((fac) =>
        siteses.length > 0 ? siteses.includes(fac.site_con) : true
      )
      .filter((sal) =>
        hreg.max - hreg.min < 100
          ? sal.Hreg >= hreg.min && sal.Hreg <= hreg.max
          : true
      )
      .filter((sal) =>
        hsup.max - hsup.min < 100
          ? sal.Hsup >= hsup.min && sal.Hsup <= hsup.max
          : true
      )
      .filter((sal) =>
        hsup2.max - hsup2.min < 100
          ? sal.Hsup2 >= hsup2.min && sal.Hsup2 <= hsup2.max
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
      .filter((sal) => sal.nom.toLowerCase().includes(nom.toLowerCase()))
      .filter((sal) => sal.prenom.toLowerCase().includes(prenom.toLowerCase()))
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
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Nom"
                variant="outlined"
                size="small"
                margin="dense"
                value={nom}
                onChange={filterNom}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Prénom"
                variant="outlined"
                size="small"
                margin="dense"
                value={prenom}
                onChange={filterPrenom}
              />
            </Grid>
            <Grid item xs={4}>
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
          <Grid container columnSpacing={3} rowSpacing={1}>
            <Grid item xs={12} md={6} lg={4}>
              <Grid container spacing={1}>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ whiteSpace: "nowrap" }} mr={1}>
                    Regulier
                  </Typography>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="min"
                      value={hreg.min}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setHreg({ ...hreg, min: e.target.value })
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
                      value={hreg.max}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setHreg({ ...hreg, max: e.target.value })
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
            <Grid item xs={12} md={6} lg={4}>
              <Grid container spacing={1}>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ whiteSpace: "nowrap" }} mr={1}>
                    Suplémentaire 1
                  </Typography>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="min"
                      value={hsup.min}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setHsup({ ...hsup, min: e.target.value })
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
                      value={hsup.max}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setHsup({ ...hsup, max: e.target.value })
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
            <Grid item xs={12} md={6} lg={4}>
              <Grid container spacing={1}>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ whiteSpace: "nowrap" }} mr={1}>
                    Suplémentaire 2
                  </Typography>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="min"
                      value={hsup2.min}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setHsup2({ ...hsup2, min: e.target.value })
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
                      value={hsup2.max}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setHsup2({ ...hsup2, max: e.target.value })
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

          {/* TAUXXXXXXXXXXXXX */}
          {/* TAUXXXXXXXXXXXXX */}
          {/* TAUXXXXXXXXXXXXX */}
          {/* TAUXXXXXXXXXXXXX */}
          {/* TAUXXXXXXXXXXXXX */}
          {/* TAUXXXXXXXXXXXXX */}
          <Typography variant="h6" mt={2}>
            Taux
          </Typography>
          <Grid container columnSpacing={3} rowSpacing={1}>
            <Grid item xs={12} md={6} lg={4}>
              <Grid container spacing={1}>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ whiteSpace: "nowrap" }} mr={1}>
                    Regulier
                  </Typography>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="min"
                      value={treg.min}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setTreg({ ...treg, min: e.target.value })
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
                      value={treg.max}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setTreg({ ...treg, max: e.target.value })
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
            <Grid item xs={12} md={6} lg={4}>
              <Grid container spacing={1}>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ whiteSpace: "nowrap" }} mr={1}>
                    Suplémentaire 1
                  </Typography>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="min"
                      value={tsup.min}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setTsup({ ...tsup, min: e.target.value })
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
                      value={tsup.max}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setTsup({ ...tsup, max: e.target.value })
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
            <Grid item xs={12} md={6} lg={4}>
              <Grid container spacing={1}>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ whiteSpace: "nowrap" }} mr={1}>
                    Suplémentaire 2
                  </Typography>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="min"
                      value={tsup2.min}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setTsup2({ ...tsup2, min: e.target.value })
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
                      value={tsup2.max}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setTsup2({ ...tsup2, max: e.target.value })
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

export default SalairesFilters;
