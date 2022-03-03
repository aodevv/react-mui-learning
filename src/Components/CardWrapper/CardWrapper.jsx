import React from "react";

// MUI components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

const CardWrapper = ({ title, children }) => {
  return (
    <Grid>
      <Card>
        <CardHeader
          disableTypography={false}
          titleTypographyProps={{ fontWeight: "bold" }}
          title={title}
        />
        <CardContent>{children}</CardContent>
      </Card>
    </Grid>
  );
};

export default CardWrapper;
