import React, { useEffect } from "react";

import { Typography } from "@mui/material";

import { useFormikContext } from "formik";

// Utilities
import {
  ins1000Sep,
  formatNum,
} from "../../Components/Tables/TableColumnsUtils";
const SitesTotal = () => {
  const {
    values: { sites, factures, salaires, machineries, siteTT },
    setFieldValue,
  } = useFormikContext();

  useEffect(() => {
    let total = 0;
    if (sites) {
      const sitesTotal = sites.reduce((acc, site) => acc + site.montant_rec, 0);
      total = total + sitesTotal;
    }

    setFieldValue("siteTT", total);
  }, [setFieldValue, sites, factures, salaires, machineries]);
  return (
    <>
      <Typography>
        <b>{`$ ${ins1000Sep(formatNum(siteTT))}`}</b>
      </Typography>
    </>
  );
};

export default SitesTotal;
