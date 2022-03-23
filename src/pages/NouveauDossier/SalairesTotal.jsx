import React, { useEffect } from "react";

import { Typography } from "@mui/material";

import { useFormikContext } from "formik";

// Utilities
import {
  ins1000Sep,
  formatNum,
} from "../../Components/Tables/TableColumnsUtils";
const SalairesTotal = () => {
  const {
    values: { salaires, salTT },
    setFieldValue,
  } = useFormikContext();

  useEffect(() => {
    let total = 0;
    if (salaires) {
      const salairesTotal = salaires.reduce(
        (acc, salaire) => acc + salaire.montant_rec,
        0
      );
      total = total + salairesTotal;
    }

    setFieldValue("salTT", total);
  }, [setFieldValue, salaires]);
  return (
    <>
      <Typography>
        <b>{`$ ${ins1000Sep(formatNum(salTT))}`}</b>
      </Typography>
    </>
  );
};

export default SalairesTotal;
