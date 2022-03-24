import React, { useEffect } from "react";

import { TextField, MenuItem } from "@mui/material";

import { useField, useFormikContext } from "formik";

const SelectWrapper = ({ name, payroll, label, options, ...otherProps }) => {
  const { values, setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (e) => {
    const { value } = e.target;
    setFieldValue(name, value);
  };
  const config = {
    ...field,

    select: true,
    label: label,
    variant: "outlined",
    fullWidth: true,
    defaultValue: "",
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
      const curSal = payroll.find((pay) => pay.id == values.curSal);

      if (curSal) setFieldValue("status", curSal.status);
      else setFieldValue("status", "");
    }
  }, [setFieldValue, values.curSal]);

  return (
    <TextField {...config}>
      {Object.keys(options).map((item, pos) => {
        return (
          <MenuItem key={pos} value={item}>
            {options[item]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SelectWrapper;
