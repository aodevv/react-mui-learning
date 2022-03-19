import React, { useEffect } from "react";

import { Grid, Typography, Box } from "@mui/material";

import { useFormikContext } from "formik";

// Utilities
import {
  ins1000Sep,
  formatNum,
} from "../../Components/Tables/TableColumnsUtils";

const TotalReclame = () => {
  const {
    values: { factures, salaires, sites, machineries, MR },
    setFieldValue,
  } = useFormikContext();

  useEffect(() => {
    let total = 0;
    if (factures) {
      const facturesTotal = factures.reduce(
        (acc, facture) => acc + facture.montant_rec,
        0
      );
      total = total + facturesTotal;
    }

    if (salaires) {
      const salairesTotal = salaires.reduce(
        (acc, salaire) => acc + salaire.montant_rec,
        0
      );
      total = total + salairesTotal;
    }
    if (machineries) {
      const machineriesTotal = machineries.reduce(
        (acc, machine) => acc + machine.cout,
        0
      );
      total = total + machineriesTotal;
    }
    setFieldValue("MR", total);
  }, [setFieldValue, factures, salaires, sites, machineries]);

  return (
    <Grid item xs={6}>
      <Box mt={2}>
        <Typography variant="h5">
          Total réclamé:{" "}
          <Box sx={{ fontWeight: 600, display: "inline" }}>
            {`$ ${ins1000Sep(formatNum(MR))}`}
          </Box>
        </Typography>
      </Box>
    </Grid>
  );
};

export default TotalReclame;
