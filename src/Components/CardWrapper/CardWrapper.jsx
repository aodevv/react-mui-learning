import React from "react";

// MUI components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Box, IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
const CardWrapper = ({ title, setEditing, editing, existing, children }) => {
  const handleEdit = () => {
    setEditing(!editing);
  };
  return (
    <Grid>
      <Card>
        <CardHeader
          disableTypography={false}
          titleTypographyProps={{ fontWeight: "bold" }}
          title={
            <Grid item lg={10} xl={8}>
              <Box display="flex" justifyContent="space-between">
                {title}
                {existing ? (
                  <IconButton
                    aria-label="delete"
                    color={editing ? "default" : "primary"}
                    size="large"
                    onClick={handleEdit}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                ) : null}
              </Box>
            </Grid>
          }
        />
        <CardContent>{children}</CardContent>
      </Card>
    </Grid>
  );
};

export default CardWrapper;
