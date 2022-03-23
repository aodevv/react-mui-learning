import React, { useEffect } from "react";

import { Typography } from "@mui/material";

import { useFormikContext } from "formik";

// Utilities
import {
  ins1000Sep,
  formatNum,
} from "../../../Components/Tables/TableColumnsUtils";
const MPTTotal = () => {
  const {
    values: { factures, salaires, machineries, mptTT },
    setFieldValue,
  } = useFormikContext();

  useEffect(() => {
    let total = 0;
    if (factures) {
      const facturesTotal = factures.reduce((acc, facture) => {
        if (facture.type === "mpt") return acc + facture.montant_rec;
        else return acc + 0;
      }, 0);
      total = total + facturesTotal;
    }
    if (salaires) {
      const salairesTotal = salaires.reduce((acc, salaire) => {
        if (salaire.type === "mpt") return acc + salaire.montant_rec;
        else return acc + 0;
      }, 0);
      total = total + salairesTotal;
    }

    if (machineries) {
      const machineriesTotal = machineries.reduce((acc, machine) => {
        if (machine.type === "mpt") return acc + machine.cout;
        else return acc + 0;
      }, 0);
      total = total + machineriesTotal;
    }

    setFieldValue("mptTT", total);
  }, [setFieldValue, factures, salaires, machineries]);
  return (
    <>
      <Typography>
        <b>{`$ ${ins1000Sep(formatNum(mptTT))}`}</b>
      </Typography>
    </>
  );
};

export default MPTTotal;
