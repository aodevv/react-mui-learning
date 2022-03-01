import React from "react";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const Content = () => {
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
        </CardContent>
      </Card>
    </Container>
  );
};

export default Content;
