import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

// REDUX
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectFacturesMemo } from "../../redux/Factures/Factures.selectors";
import { selectSitesMemo } from "../../redux/Sites/Sites.selectors";
import { selectDossiers } from "../../redux/DossierInfos/infosDossier.selectors";

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

// Custom components
import FacturesTable from "../../Components/Tables/FacturesTable";

import FacturesFilters from "../../Components/Filters/FacturesFilters/FacturesFilters";

import FactureModalFormDos from "../../Components/Forms/FactureModalForm/FactureModalFormDos";

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

const FacturePage = ({ factures, sites, dossiers }) => {
  const [factureModal, setFactureModal] = useState(false);
  const [facToEdit, setFacToEdit] = useState(null);
  const openFacture = () => {
    setFactureModal(true);
  };
  const closeFacture = () => {
    setFactureModal(false);
  };

  let flatFactures = [];
  //let facturesCopy = JSON.parse(JSON.stringify(factures));
  Object.keys(factures).forEach((item, index) =>
    factures[item].forEach((fac) => {
      flatFactures.push({
        ...fac,
        id: `${item};${fac.id}`,
        dos: parseInt(item),
      });
    })
  );
  const [filteredFactures, setFilteredFactures] = useState(flatFactures);

  let sitesOnly = [];
  let dosOnly = [];

  Object.keys(sites).forEach((item, index) => {
    sites[item].map((site) => sitesOnly.push(site.site));
  });

  // Object.keys(factures).forEach((item) => {
  //   dosOnly.push(item);
  // });

  dossiers.forEach((dos) => {
    if (dos.status === "actif") dosOnly.push(dos.id);
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
    flatFactures = [];
    Object.keys(factures).forEach((item, index) =>
      factures[item].forEach((fac) => {
        flatFactures.push({
          ...fac,
          id: `${item};${fac.id}`,
          dos: item,
        });
      })
    );
    setFilteredFactures(flatFactures);
  }, [factures]);

  useEffect(() => {
    if (facToEdit !== null) {
      openFacture();
    }
  }, [facToEdit]);

  return (
    <Grid>
      <Card>
        <CardHeader
          disableTypography={false}
          titleTypographyProps={{ fontWeight: "bold" }}
          title={"Liste des factures"}
        />
        <CardContent>
          <Grid item xs={12} mb={2}>
            <FacturesFilters
              factures={flatFactures}
              setFilteredFactures={setFilteredFactures}
              sites={remove_duplicates(sitesOnly)}
              numDos={dosOnly}
            />
          </Grid>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={openFacture}
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
            <FacturesTable
              setFacToEdit={setFacToEdit}
              data={filteredFactures}
            />
          </Box>
        </CardContent>
      </Card>
      <Modal
        open={factureModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={factureModal}>
          <Box sx={style}>
            <FactureModalFormDos
              prejudices={typePrejudices}
              closeModal={closeFacture}
              sites={sites}
              numDos={dosOnly}
              dossiers={dossiers}
              factures={factures}
              setFacToEdit={setFacToEdit}
              edit={facToEdit}
            />
          </Box>
        </Fade>
      </Modal>
      <Outlet />
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  factures: selectFacturesMemo,
  sites: selectSitesMemo,
  dossiers: selectDossiers,
});

export default connect(mapStateToProps)(FacturePage);
