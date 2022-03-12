import React, { useEffect } from "react";
import { useFormikContext } from "formik";

import Textfield from "../../../Components/FormUI/Textfield";

const Tsup = (props) => {
  const {
    values: { Treg },
    setFieldValue,
  } = useFormikContext();

  useEffect(() => {
    if (Treg > 0) setFieldValue("Tsup", Math.round(Treg * 150) / 100);
  }, [Treg, setFieldValue]);
  return (
    <>
      <Textfield {...props} />
    </>
  );
};

export default Tsup;
