import React from "react";

// MUI components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Box, IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
const CardWrapper = ({
  title,
  setEditing,
  editing,
  existing,
  children,
  role,
}) => {
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
            <Grid item lg={10} xl={8} sx={{ mx: "auto" }}>
              <Box display="flex" justifyContent="space-between">
                {title}
                {existing && role !== "admin" ? (
                  <IconButton
                    aria-label="delete"
                    color={editing ? "default" : "primary"}
                    size="large"
                    disabled={true}
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
