import React, { useState } from "react";

// MUI componenets
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//MUI icons
import UndoIcon from "@mui/icons-material/Undo";
import SearchIcon from "@mui/icons-material/Search";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import InputAdornment from "@mui/material/InputAdornment";

const SitesFilters = ({ sites, setFilteredSites, numDos }) => {
  const [numDoses, setNumDoses] = useState([]);
  const [site, setSite] = useState("");
  const [nature, setNature] = useState("");
  const [partEnd, setPartEnd] = useState("");
  const [pourcEnd, setPourcEnd] = useState({ min: 0, max: 100 });
  const [pourcAdm, setPourcAdm] = useState({ min: 0, max: 100 });
  const [mt, setMt] = useState(0);
  const [fmt, setFMt] = useState(0);
  const [smt, setSMt] = useState(0);
  const [mmt, setMMt] = useState(0);

  const filterDos = (e, val) => {
    setNumDoses(val);
  };
  const filterSite = (e) => {
    setSite(e.target.value);
  };

  const filterMt = (e) => {
    setMt(e.target.value);
  };

  const filterSMt = (e) => {
    setSMt(e.target.value);
  };
  const filterMMt = (e) => {
    setMMt(e.target.value);
  };
  const filterFMt = (e) => {
    setFMt(e.target.value);
  };
  const filterNature = (e) => {
    setNature(e.target.value);
  };
  const filterPartEnd = (e) => {
    setPartEnd(e.target.value);
  };

  const filterTable = () => {
    const fil = sites
      .filter((site) =>
        numDoses.length > 0 ? numDoses.includes(site.id.split(";")[0]) : true
      )
      .filter((site) => (mt > 0 ? site.montant_rec > mt : true))
      .filter((site) => (fmt > 0 ? site.f_montant_rec > mt : true))
      .filter((site) => (smt > 0 ? site.s_montant_rec > mt : true))
      .filter((site) => (mmt > 0 ? site.m_montant_rec > mt : true))
      .filter((site) =>
        nature !== ""
          ? site.nature.toLowerCase().includes(nature.toLowerCase())
          : true
      )
      .filter((sita) =>
        site !== ""
          ? sita.site.toLowerCase().includes(site.toLowerCase())
          : true
      )
      .filter((site) =>
        partEnd !== ""
          ? site.part_end.toLowerCase().includes(partEnd.toLowerCase())
          : true
      )
      .filter((mach) =>
        pourcEnd.max - pourcEnd.min < 100
          ? mach.pourc_end >= pourcEnd.min && mach.pourc_end <= pourcEnd.max
          : true
      )
      .filter((mach) =>
        pourcAdm.max - pourcAdm.min < 100
          ? mach.pourc_adm >= pourcAdm.min && mach.pourc_adm <= pourcAdm.max
          : true
      );

    setFilteredSites(fil);
  };
  const resetForm = () => {
    setNumDoses([]);
    setSite("");
    setNature("");
    setPartEnd("");
    setPourcEnd({ min: 0, max: 100 });
    setPourcAdm({ min: 0, max: 100 });
    setMt(0);
    setFMt(0);
    setSMt(0);
    setMMt(0);
    setFilteredSites(sites);
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
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Site"
                variant="outlined"
                size="small"
                margin="dense"
                value={site}
                onChange={filterSite}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Nature"
                variant="outlined"
                size="small"
                margin="dense"
                value={nature}
                onChange={filterNature}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Partie endomagée"
                variant="outlined"
                size="small"
                margin="dense"
                value={partEnd}
                onChange={filterPartEnd}
              />
            </Grid>
          </Grid>
          <Typography variant="h6" mt={2}>
            Montant
          </Typography>
          <Grid container columnSpacing={3} rowSpacing={1}>
            <Grid item xs={6} md={4}>
              <TextField
                fullWidth
                label="Sites"
                variant="outlined"
                size="small"
                type="number"
                margin="dense"
                value={mt}
                onChange={filterMt}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                fullWidth
                label="Factures"
                variant="outlined"
                size="small"
                type="number"
                margin="dense"
                value={fmt}
                onChange={filterFMt}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                fullWidth
                label="Salaires"
                variant="outlined"
                size="small"
                type="number"
                margin="dense"
                value={smt}
                onChange={filterSMt}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                fullWidth
                label="Machineries"
                variant="outlined"
                size="small"
                type="number"
                margin="dense"
                value={mmt}
                onChange={filterMMt}
              />
            </Grid>
          </Grid>
          <Typography variant="h6" mt={2} mb={1}>
            Pourcentages
          </Typography>
          <Grid container columnSpacing={3} rowSpacing={1}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={1}>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ whiteSpace: "nowrap" }} mr={1}>
                    Endomagé
                  </Typography>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="min"
                      value={pourcEnd.min}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setPourcEnd({ ...pourcEnd, min: e.target.value })
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
                      value={pourcEnd.max}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setPourcEnd({ ...pourcEnd, max: e.target.value })
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
                    Admissible
                  </Typography>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="min"
                      value={pourcAdm.min}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setPourcAdm({ ...pourcAdm, min: e.target.value })
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
                      value={pourcAdm.max}
                      size="small"
                      margin="dense"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        setPourcAdm({ ...pourcAdm, max: e.target.value })
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

export default SitesFilters;
