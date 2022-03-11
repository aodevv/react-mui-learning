import React from "react";
import { Grid, Card, Typography } from "@mui/material";

const MyCard = ({ title, xs }) => {
  return (
    <Grid item xs={xs}>
      <Card
        sx={{
          width: 100,
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10%",
          transition: "all linear 100ms",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0px 0px 25px 2px rgba(0,0,0,0.22)",
          },
        }}
      >
        <Typography>{title}</Typography>
      </Card>
    </Grid>
  );
};

export default MyCard;
