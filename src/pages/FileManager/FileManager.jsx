import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDossiers } from "../../redux/DossierInfos/infosDossier.selectors";

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

const FileManager = ({ dossiers }) => {
  const [filteredDossiers, setFilteredDossiers] = useState(dossiers);

  return (
    <Grid>
      <Card>
        <CardHeader
          disableTypography={false}
          titleTypographyProps={{ fontWeight: "bold" }}
          title={"Liste des dossiers"}
        />
        <CardContent>
          <Grid item xs={8} mb={2}>
            <DossierFilters
              dossiers={dossiers}
              setFilteredDossiers={setFilteredDossiers}
            />
          </Grid>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" size="small" startIcon={<AddIcon />}>
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
            <FilesTable data={filteredDossiers} />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  dossiers: selectDossiers,
});

export default connect(mapStateToProps)(FileManager);
