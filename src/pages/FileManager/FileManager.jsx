import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDossiers } from "../../redux/DossierInfos/infosDossier.selectors";
import { selectUsername } from "../../redux/Auth/Auth.selectors";

// MUI components
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// MUI icons
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

// Local components
import FilesTable from "../../Components/Tables/FilesTable";
import DossierFilters from "../../Components/Filters/DossierFilters/DossierFilters";

const FileManager = ({ dossiers, username }) => {
  const navigate = useNavigate();
  const [filteredDossiers, setFilteredDossiers] = useState(dossiers);

  let dosOnly = [];

  dossiers.forEach((item) => {
    dosOnly.push(item.id.toString());
  });

  const openDosForm = () => {
    navigate("/nouveau_dossier");
  };

  return (
    <Grid>
      <Card>
        <CardHeader
          disableTypography={false}
          titleTypographyProps={{ fontWeight: "bold" }}
          title={"Liste des dossiers"}
        />
        <CardContent>
          <Grid item xs={12} mb={2}>
            <DossierFilters
              dossiers={dossiers}
              setFilteredDossiers={setFilteredDossiers}
              numDos={dosOnly}
            />
          </Grid>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="small"
              onClick={openDosForm}
              startIcon={<AddIcon />}
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
            <FilesTable
              pageSize={10}
              data={filteredDossiers}
              setFilteredDossiers={setFilteredDossiers}
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  dossiers: selectDossiers,
  username: selectUsername,
});

export default connect(mapStateToProps)(FileManager);
