import React, { useEffect } from "react";

import { Typography } from "@mui/material";

import { useFormikContext } from "formik";

// Utilities
import {
  ins1000Sep,
  formatNum,
} from "../../Components/Tables/TableColumnsUtils";
const MachineriesTotal = () => {
  const {
    values: { machineries, machTT },
    setFieldValue,
  } = useFormikContext();

  useEffect(() => {
    let total = 0;
    if (machineries) {
      const machineriesTotal = machineries.reduce(
        (acc, mach) => acc + mach.cout,
        0
      );
      total = total + machineriesTotal;
    }

    setFieldValue("machTT", total);
  }, [setFieldValue, machineries]);
  return (
    <>
      <Typography>
        <b>{`$ ${ins1000Sep(formatNum(machTT))}`}</b>
      </Typography>
    </>
  );
};

export default MachineriesTotal;
