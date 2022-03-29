import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

// REDUX
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectMachineriesMemo } from "../../redux/Machineries/machineries.selectors";
import { selectDossiers } from "../../redux/DossierInfos/infosDossier.selectors";
import { selectSitesMemo } from "../../redux/Sites/Sites.selectors";

// MUI components
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Modal, Fade } from "@mui/material";

// MUI icons
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import MachineriesTable from "../../Components/Tables/Machineries/MachineriesTable";
import MachineriesFilters from "../../Components/Filters/MachineriesFilters/MachineriesFilters";

import MachinerieModalFormDos from "../../Components/Forms/MachinerieModalForm/MachinerieModalFormDos";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  borderRadius: 2,
  p: "30px 10px",
};

const MachineriePage = ({ machinerie, dossiers, sites }) => {
  const [machineriesModal, setMachineriesModal] = useState(false);
  const [machToEdit, setMachToEdit] = useState(null);

  const openMachines = () => {
    setMachineriesModal(true);
  };
  const closeMachines = () => {
    setMachineriesModal(false);
  };

  let flatMachines = [];
  Object.keys(machinerie).forEach((item) =>
    machinerie[item].forEach((mach) => {
      flatMachines.push({
        ...mach,
        dos: item,
        id: `${item};${mach.id}`,
      });
    })
  );

  const [filteredMachineries, setFilteredMachineries] = useState(flatMachines);

  let dosOnly = [];

  // Object.keys(machinerie).forEach((item) => {
  //   dosOnly.push(item);
  // });

  // dossiers.forEach((dos) => {
  //   if (dos.status === "actif") dosOnly.push(dos.id);
  // });

  dossiers.forEach((dos) => {
    dosOnly.push(dos.id);
  });

  let sitesOnly = [];

  Object.keys(sites).forEach((item, index) => {
    sites[item].map((site) => sitesOnly.push(site.site));
  });

  const remove_duplicates = (arr) => {
    var obj = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
      obj[arr[i]] = true;
    }
    for (var key in obj) {
      ret_arr.push(key);
    }
    return ret_arr;
  };

  const typePrejudices = {
    dab: "Dommage au biens",
    mpt: "Mesures preventives temporaires",
    mi: "Mesures d'interventions",
    bcg: "Bris du couvert de glace",
  };

  useEffect(() => {
    flatMachines = [];
    Object.keys(machinerie).forEach((item, index) =>
      machinerie[item].forEach((mach) => {
        flatMachines.push({
          ...mach,
          dos: item,
          id: `${item};${mach.id}`,
        });
      })
    );
    setFilteredMachineries(flatMachines);
  }, [machinerie]);

  useEffect(() => {
    if (machToEdit !== null) {
      openMachines();
    }
  }, [machToEdit]);

  return (
    <Grid>
      <Card>
        <CardHeader
          disableTypography={false}
          titleTypographyProps={{ fontWeight: "bold" }}
          title={"Liste machineries"}
        />
        <CardContent>
          <Grid item xs={12} mb={2}>
            <MachineriesFilters
              machineries={flatMachines}
              setFilteredMachineries={setFilteredMachineries}
              numDos={dosOnly}
              sites={remove_duplicates(sitesOnly)}
            />
          </Grid>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={openMachines}
            >
              Ajouter
            </Button>
            <Button
              variant="contained"
              disabled
              size="small"
              startIcon={<DeleteIcon />}
            >
              Supprimer
            </Button>
          </Stack>
          <Box mt={2} sx={{ height: "calc(100% - 64px)" }}>
            <MachineriesTable
              setMachToEdit={setMachToEdit}
              data={filteredMachineries}
            />
          </Box>
        </CardContent>
      </Card>
      <Modal
        open={machineriesModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={machineriesModal}>
          <Box sx={style}>
            <MachinerieModalFormDos
              prejudices={typePrejudices}
              closeModal={closeMachines}
              sites={sites}
              numDos={dosOnly}
              dossiers={dossiers}
              machineries={machinerie}
              setMachToEdit={setMachToEdit}
              edit={machToEdit}
            />
          </Box>
        </Fade>
      </Modal>
      <Outlet />
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  machinerie: selectMachineriesMemo,
  dossiers: selectDossiers,
  sites: selectSitesMemo,
});

export default connect(mapStateToProps)(MachineriePage);
