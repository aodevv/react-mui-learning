import React, { useState, useEffect } from "react";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectDossiers } from "../../redux/DossierInfos/infosDossier.selectors";
import { selectSitesMemo } from "../../redux/Sites/Sites.selectors";
import { selectUsername, selectAuth } from "../../redux/Auth/Auth.selectors";

// MUI components
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

// MUI icons
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import SitesTable from "../../Components/Tables/Sites/SitesTable";

import SitesModalFormDos from "../../Components/Forms/SitesModalForm/SitesModalFormDos";
import SitesFilters from "../../Components/Filters/SitesFilters/SitesFilters";

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

const SitesPage = ({ dossiers, sites, username }) => {
  const [sitesModal, setSitesModal] = useState(false);
  const [siteToEdit, setSiteToEdit] = useState(null);
  const openSites = () => {
    setSitesModal(true);
  };
  const closeSites = () => {
    setSitesModal(false);
  };
  let flatSites = [];
  Object.keys(sites).forEach((item) =>
    sites[item].forEach((site) => {
      flatSites.push({
        ...site,
        dos: item,
        id: `${item};${site.id}`,
      });
    })
  );

  const [filteredSites, setFilteredSites] = useState(flatSites);
  let dosOnly = [];

  //   Object.keys(sites).forEach((item) => {
  //     dosOnly.push(item);
  //   });
  dossiers.forEach((dos) => {
    dosOnly.push(dos.id);
  });

  useEffect(() => {
    flatSites = [];
    Object.keys(sites).forEach((item, index) =>
      sites[item].forEach((site) => {
        flatSites.push({
          ...site,
          dos: item,
          id: `${item};${site.id}`,
        });
      })
    );
    setFilteredSites(flatSites);
  }, [sites]);

  useEffect(() => {
    if (siteToEdit !== null) {
      openSites();
    }
  }, [siteToEdit]);

  return (
    <Grid>
      <Card>
        <CardHeader
          disableTypography={false}
          titleTypographyProps={{ fontWeight: "bold" }}
          title={"Liste des sites"}
        />
        <CardContent>
          <Grid item xs={12} mb={2}>
            <SitesFilters
              setFilteredSites={setFilteredSites}
              numDos={dosOnly}
              sites={flatSites}
            />
          </Grid>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={openSites}
              disabled={username === "admin"}
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
            <SitesTable setSiteToEdit={setSiteToEdit} data={filteredSites} />
          </Box>
        </CardContent>
      </Card>
      <Modal
        open={sitesModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={sitesModal}>
          <Box sx={style}>
            <SitesModalFormDos
              dossiers={dossiers}
              closeModal={closeSites}
              sites={sites}
              numDos={dosOnly}
              setSiteToEdit={setSiteToEdit}
              edit={siteToEdit}
              role={username}
            />
          </Box>
        </Fade>
      </Modal>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  dossiers: selectDossiers,
  sites: selectSitesMemo,
  username: selectUsername,
  isLoggedIn: selectAuth,
});

export default connect(mapStateToProps)(SitesPage);
