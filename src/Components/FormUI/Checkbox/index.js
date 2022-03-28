import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
} from "@mui/material";
import { useField, useFormikContext } from "formik";

const CheckBoxWrapper = ({ name, label, legend, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (e) => {
    const { checked } = e.target;
    setFieldValue(name, checked);
  };

  const configCheckbox = {
    ...field,
    ...otherProps,
    onChange: handleChange,
    size: "small",
  };
  const configFormControl = {};
  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }
  return (
    <FormControl {...configFormControl}>
      <FormLabel component="legend">{legend}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox {...configCheckbox} />}
          label={label}
        />
      </FormGroup>
    </FormControl>
  );
};

export default CheckBoxWrapper;
