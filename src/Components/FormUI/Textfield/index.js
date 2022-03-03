import React from "react";
import { TextField } from "@mui/material";

import { useField } from "formik";

const TextFieldWrapper = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);
  const config = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
    margin: "dense",
    size: "small",
  };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  return <TextField {...config} />;
};

export default TextFieldWrapper;
