import React, { useEffect } from "react";

import { Typography } from "@mui/material";

import { useFormikContext } from "formik";

// Utilities
import {
  ins1000Sep,
  formatNum,
} from "../../Components/Tables/TableColumnsUtils";
const FacturesTotal = () => {
  const {
    values: { factures, facTT },
    setFieldValue,
  } = useFormikContext();

  useEffect(() => {
    let total = 0;
    if (factures) {
      const facturesTotal = factures.reduce((acc, facture) => {
        if (!facture.tax) return acc + facture.montant_rec;
        else return acc;
      }, 0);
      total = total + facturesTotal;
    }

    setFieldValue("facTT", total);
  }, [setFieldValue, factures]);
  return (
    <>
      <Typography noWrap sx={{ color: "gray" }}>
        NT: <b>{`$ ${ins1000Sep(formatNum(facTT))}`}</b>
      </Typography>
    </>
  );
};

export default FacturesTotal;
