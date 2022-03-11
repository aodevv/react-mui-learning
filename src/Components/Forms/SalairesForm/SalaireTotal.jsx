import React, { useEffect } from "react";
import { useField, useFormikContext } from "formik";

// Utilities
import {
  ins1000Sep,
  formatNum,
} from "../../Components/Tables/TableColumnsUtils";

const SalaireTotal = (props) => {
  const {
    values: {
      status,
      Hreg,
      Hsup,
      Treg,
      Tsup,
      taux_vac,
      ae,
      rrq,
      rqap,
      fss,
      csst,
      montant_rec,
      date_per,
    },
    touched,
    setFieldValue,
  } = useFormikContext();
  const [field, meta] = useField(props);

  useEffect(() => {
    const RRQS = {
      2022: 0.0525,
      2021: 0.0511,
      2020: 0.049,
      2019: 0.0475,
      2018: 0.0456,
      2017: 0.0432,
    };
    const RQAPS = {
      2022: 0.00782,
      2021: 0.00772,
      2020: 0.00741,
      2019: 0.0072,
      2018: 0.007,
      2017: 0.00655,
    };
    const FSSS = {
      2022: 0.0426,
      2021: 0.041,
      2020: 0.037,
      2019: 0.032,
      2018: 0.03,
      2017: 0.03,
    };
    let base, total;
    total = 0;
    if (status) {
      if (status === "occ") {
        base = Hreg * Treg + Hsup * Tsup;
      } else if (status === "reg") {
        base = Hsup * Tsup;
      }

      const date = date_per.split("-")[0];
      base = taux_vac >= 0 ? base + base * (taux_vac / 100) : total;
      total = base;

      if (date && RRQS[date]) {
        total = rrq ? total + base * RRQS[date] : total;
      }

      total = ae ? total + base * 0.0206 : total;

      if (date && RQAPS[date]) {
        total = rqap ? total + base * RQAPS[date] : total;
      }

      if (FSSS[date]) {
        total = fss ? total + base * FSSS[date] : total;
      }
      total = csst ? total + base * 0.23 : total;

      setFieldValue(props.name, total);
    } else {
      setFieldValue(props.name, 0);
    }
  }, [
    setFieldValue,
    Hreg,
    props.name,
    Treg,
    status,
    date_per,
    taux_vac,
    Hsup,
    Tsup,
    rrq,
    ae,
    csst,
    rqap,
    fss,
  ]);

  return <>{`$ ${ins1000Sep(formatNum(montant_rec))}`}</>;
};

export default SalaireTotal;
