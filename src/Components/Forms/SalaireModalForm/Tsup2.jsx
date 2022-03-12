import React, { useEffect } from "react";
import { useFormikContext } from "formik";

import Textfield from "../../../Components/FormUI/Textfield";

const Tsup2 = (props) => {
  const {
    values: { Treg },
    setFieldValue,
  } = useFormikContext();

  useEffect(() => {
    if (Treg > 0) setFieldValue("Tsup2", Math.round(Treg * 200) / 100);
  }, [Treg, setFieldValue]);
  return (
    <>
      <Textfield {...props} />
    </>
  );
};

export default Tsup2;
