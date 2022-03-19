import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

// REDUX
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectSalairesMemo } from "../../redux/Salaires/salaires.selectors";
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

import SalairesTable from "../../Components/Tables/Salaires/SalairesTable";
import SalairesFilters from "../../Components/Filters/SalairesFilters/SalairesFilters";

import SalaireModalFormDos from "../../Components/Forms/SalaireModalForm/SalaireModalFormDos";

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

const SalairesPage = ({ salaires, dossiers, sites }) => {
  const [salaireModal, setSalaireModal] = useState(false);
  const openSalaire = () => {
    setSalaireModal(true);
  };
  const closeSalaire = () => {
    setSalaireModal(false);
  };
  let flatSalaires = [];
  Object.keys(salaires).forEach((item) =>
    salaires[item].forEach((sal) => {
      flatSalaires.push({
        ...sal,
        dos: parseInt(item),
        id: `${item};${sal.id}`,
      });
    })
  );

  const [filteredSalaires, setFilteredSalaires] = useState(flatSalaires);

  let dosOnly = [];

  Object.keys(salaires).forEach((item) => {
    dosOnly.push(item);
  });

  const typePrejudices = {
    dab: "Dommage au biens",
    mpt: "Mesures preventives temporaires",
    mi: "Mesures d'interventions",
    bcg: "Bris du couvert de glace",
  };

  useEffect(() => {
    flatSalaires = [];
    Object.keys(salaires).forEach((item) =>
      salaires[item].forEach((sal) => {
        flatSalaires.push({
          ...sal,
          dos: parseInt(item),
          id: `${item};${sal.id}`,
        });
      })
    );
    setFilteredSalaires(flatSalaires);
  }, [salaires]);

  return (
    <Grid>
      <Card>
        <CardHeader
          disableTypography={false}
          titleTypographyProps={{ fontWeight: "bold" }}
          title={"Liste des salaires"}
        />
        <CardContent>
          <Grid item xs={12} md={8} mb={2}>
            <SalairesFilters
              salaires={flatSalaires}
              setFilteredSalaires={setFilteredSalaires}
              numDos={dosOnly}
            />
          </Grid>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={openSalaire}
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
            <SalairesTable data={filteredSalaires} />
          </Box>
        </CardContent>
      </Card>
      <Modal
        open={salaireModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={salaireModal}>
          <Box sx={style}>
            <SalaireModalFormDos
              prejudices={typePrejudices}
              closeModal={closeSalaire}
              sites={sites}
              numDos={dosOnly}
              dossiers={dossiers}
              salaires={salaires}
            />
          </Box>
        </Fade>
      </Modal>
      <Outlet />
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  dossiers: selectDossiers,
  salaires: selectSalairesMemo,
  sites: selectSitesMemo,
});

export default connect(mapStateToProps)(SalairesPage);
