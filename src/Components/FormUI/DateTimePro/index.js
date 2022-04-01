import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";

import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { parseISO } from "date-fns";

const DatePickerPro = ({ name, label, ...otherProps }) => {
  const [dateVal, setDateVal] = useState("");
  const {
    setFieldValue,
    setFieldError,
    errors,
    setErrors,
    setFieldTouched,
    values,
  } = useFormikContext();
  const [field, meta] = useField(name);
  const { date_ev } = values;

  const handleChange = (e) => {
    setDateVal(e);
    setFieldValue(name, e);
  };

  const currentError = errors[name];

  const config = {
    ...otherProps,
    fullWidth: true,
    name: field.name,
    margin: "dense",
    size: "small",
  };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  const handleError = (reason, value) => {
    switch (reason) {
      case "maxDate":
        setFieldError("test", `Date should not be after bob`);
        break;

      default:
        setFieldError("test", undefined);
    }
  };
  const max = new Date("01/05/2022");

  return (
    <DesktopDatePicker
      clearable
      label={label}
      value={field.value}
      onChange={(newValue) => setFieldValue(field.name, newValue, true)}
      maxDate={parseISO("2022-05-01")}
      minDate={parseISO(date_ev)}
      inputFormat="dd/MM/yyyy"
      renderInput={(params) => (
        <TextField
          name={field.name}
          {...config}
          {...params}
          onBlur={() => setFieldTouched(field.name, true, true)}
        />
      )}
    />
  );
};

export default DatePickerPro;
