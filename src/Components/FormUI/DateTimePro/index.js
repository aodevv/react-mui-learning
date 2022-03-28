import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";

import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

const DatePickerPro = ({ name, label, ...otherProps }) => {
  const [dateVal, setDateVal] = useState("");
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (e) => {
    setDateVal(e);
    setFieldValue(name, e);
  };

  const config = {
    ...field,
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

  return (
    <DesktopDatePicker
      label={label}
      value={dateVal}
      onChange={handleChange}
      renderInput={(params) => <TextField {...config} {...params} />}
    />
  );
};

export default DatePickerPro;
