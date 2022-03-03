import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";

const DatePickerWrapper = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);

  const config = {
    ...field,
    ...otherProps,
    type: "date",
    variant: "outlined",
    fullWidth: true,
    margin: "dense",
    size: "small",
    InputLabelProps: {
      shrink: true,
    },
  };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  return <TextField {...config} />;
};

export default DatePickerWrapper;
