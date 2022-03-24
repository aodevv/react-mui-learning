import React, { useEffect } from "react";

import { TextField } from "@mui/material";

import { useField, useFormikContext } from "formik";

const SelectWrapper = ({ name, payroll, ...otherProps }) => {
  const { values, setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (e) => {
    const { value } = e.target;
    setFieldValue(name, value);
  };
  const config = {
    ...field,
    ...otherProps,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
    margin: "dense",
    size: "small",
  };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  useEffect(() => {
    if (values.curSal !== "") {
      const curNom = payroll.find((pay) => pay.id == values.curSal);

      if (curNom) setFieldValue("nom", curNom.nom);
      else setFieldValue("nom", "");
    }
  }, [setFieldValue, values.curSal]);

  return (
    <>
      <TextField {...config} />
    </>
  );
};

export default SelectWrapper;
