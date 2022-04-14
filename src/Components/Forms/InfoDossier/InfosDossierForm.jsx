import React, { useState } from "react";

// MUI ICONS
import { Grid, Button, Typography, Box } from "@mui/material";
import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";

// FORMIK and YUP

import CardWrapper from "../../../Components/CardWrapper/CardWrapper";
import Popover from "@mui/material/Popover";

import Textfield from "../../../Components/FormUI/Textfield";
import DatePicker from "../../../Components/FormUI/DateTime";
import Checkbox from "../../FormUI/Checkbox";

import TotalReclame from "../../../pages/NouveauDossier/TotalReclame";

//TOTALS
import SitesTotal from "../../../pages/NouveauDossier/SitesTotal";
import MPTTotal from "../../../pages/NouveauDossier/Cumulatives/MPTTotal";
import MITotal from "../../../pages/NouveauDossier/Cumulatives/MIITotal";
import BCGTotal from "../../../pages/NouveauDossier/Cumulatives/BCGTotal";

import DateTimePro from "../../FormUI/DateTimePro";

const ProgramsTempData = [
  "Programme 1",
  "Programme 2",
  "Programme 3",
  "Programme 4",
  "Programme 5",
  "Programme 6",
  "Programme 7",
];

const InfosDossierForm = ({
  values,
  setFieldValue,
  openSubmit,
  existing,
  isValid,
  finishedInfos,
  role,
}) => {
  const [editing, setEditing] = useState(existing);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <CardWrapper
        existing={existing}
        setEditing={setEditing}
        editing={editing}
        title="Infos dossier"
        role={role}
      >
        <Grid container>
          <Grid item xs={12}>
            <Grid item lg={10} xl={8}>
              <Grid container spacing={2} mb={1}>
                {/* <Grid item xs={4}>
                  <Textfield name="id" label="Identification dossier" />
                </Grid> */}
                <Grid item xs={4}>
                  <Textfield
                    disabled={editing || finishedInfos}
                    name="numero"
                    label="Numéro dossier"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    id="programe"
                    value={values.prgm}
                    onChange={(event, newValue) =>
                      setFieldValue("prgm", newValue)
                    }
                    freeSolo
                    options={ProgramsTempData}
                    disabled={editing || finishedInfos}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        margin="dense"
                        size="small"
                        label="Programme"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Textfield
                    disabled={editing || finishedInfos}
                    name="act_of"
                    label="Acte officiel"
                  />
                </Grid>
              </Grid>
              {/* <Grid container mb={1}>
                <Grid item xs={6}>
                  <DateTimePro name="test" label="Bob" />
                </Grid>
              </Grid> */}

              <Grid container spacing={2} mb={1}>
                <Grid item xs={6}>
                  <DatePicker
                    disabled={editing || finishedInfos}
                    name="date_ev"
                    label="Date événement"
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    disabled={
                      (values.date_ev ? false : true) ||
                      editing ||
                      finishedInfos
                    }
                    name="date_ouv"
                    label="Date d'ouverture"
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Textfield
                  disabled={editing || finishedInfos}
                  name="desc_ev"
                  multiline
                  rows={4}
                  label="Description"
                />
              </Grid>
              <Typography mt={1}>Préjudices: </Typography>
              <Grid container pl={2} spacing={2}>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center">
                    <Box sx={{ width: 80 }}>
                      <Checkbox
                        disabled={editing || finishedInfos}
                        name="dab"
                        label="DAB"
                      />
                    </Box>
                    {values.dab ? <SitesTotal /> : null}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center">
                    <Box sx={{ width: 80 }}>
                      <Checkbox
                        disabled={editing || finishedInfos}
                        name="mpt"
                        label="MPT"
                      />
                    </Box>
                    {values.mpt ? <MPTTotal /> : null}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center">
                    <Box sx={{ width: 80 }}>
                      <Checkbox
                        disabled={editing || finishedInfos}
                        name="mi"
                        label="MI"
                      />
                    </Box>
                    {values.mi ? <MITotal /> : null}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center">
                    <Box sx={{ width: 80 }}>
                      <Checkbox
                        disabled={editing || finishedInfos}
                        name="bcg"
                        label="BCG"
                      />
                    </Box>
                    {values.bcg ? <BCGTotal /> : null}
                  </Box>
                </Grid>
              </Grid>
              <Grid
                container
                mt={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <TotalReclame />
                <Grid item xs={6}>
                  <Grid container display="flex" direction="row-reverse">
                    {existing ? (
                      <Box>
                        <Button
                          variant="contained"
                          color="error"
                          disabled={editing}
                          onMouseEnter={handlePopoverOpen}
                          onMouseLeave={handlePopoverClose}
                        >
                          Terminer
                        </Button>
                        <Popover
                          id="mouse-over-popover"
                          sx={{
                            pointerEvents: "none",
                          }}
                          open={open}
                          anchorEl={anchorEl}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          onClose={handlePopoverClose}
                          disableRestoreFocus
                        >
                          <Typography sx={{ p: 1 }}>Comming soon 😁</Typography>
                        </Popover>
                      </Box>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={openSubmit}
                        disabled={
                          finishedInfos ||
                          !isValid ||
                          (!values.dab &&
                            !values.mpt &&
                            !values.mi &&
                            !values.bcg)
                        }
                      >
                        Terminer
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardWrapper>
    </>
  );
};

export default InfosDossierForm;
