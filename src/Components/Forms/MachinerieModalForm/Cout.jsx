import React, { useEffect } from "react";

import { useField, useFormikContext } from "formik";

// Utilities
import {
  ins1000Sep,
  formatNum,
} from "../../../Components/Tables/TableColumnsUtils";

const Cout = (props) => {
  const {
    values: { hrs_fonc, hrs_stat, maintenance, taux_fonc, cout },
    touched,
    setFieldValue,
  } = useFormikContext();

  useEffect(() => {
    if (hrs_fonc && (taux_fonc || maintenance)) {
      const total =
        Math.round(hrs_fonc * (taux_fonc + maintenance) * 100) / 100;
      setFieldValue(props.name, total);
    }
  }, [setFieldValue, hrs_fonc, props.name, taux_fonc, maintenance]);

  return (
    <>
      {cout >= 0
        ? `$ ${ins1000Sep(formatNum(cout))}`
        : `$ ${ins1000Sep(formatNum(cout))} !`}
    </>
  );
};

export default Cout;
