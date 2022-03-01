import React from "react";

// MUI components
import Container from "@mui/material/Container";
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
import FilesTable from "../../Components/FilesTable/FilesTable";

const FileManager = () => {
  return (
    <Container>
      <Card>
        <CardHeader
          disableTypography={false}
          titleTypographyProps={{ fontWeight: "bold" }}
          title={"Dashboard"}
        />
        <CardContent>
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
          <Box mt={2}>
            <FilesTable />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default FileManager;
