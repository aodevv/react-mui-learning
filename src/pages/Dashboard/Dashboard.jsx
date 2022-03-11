import React from "react";
import { Container, Grid, Card, Typography } from "@mui/material";

import MyCard from "../../Components/MyCard/MyCard";

const Dashboard = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <MyCard title="Factures" xs={4} />
        <MyCard title="Salaires" xs={4} />
        <MyCard title="Machineries" xs={4} />
      </Grid>
    </Container>
  );
};

export default Dashboard;
