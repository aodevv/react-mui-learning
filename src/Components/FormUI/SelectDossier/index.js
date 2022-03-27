import React, { useEffect, useState } from "react";

import { TextField, MenuItem } from "@mui/material";

import { useField, useFormikContext } from "formik";
import { id } from "date-fns/locale";

const SelectWrapper = ({
  name,
  dossiers,
  setValiDate,
  options,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [dosId, setdosId] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setFieldValue(name, value);
    setdosId(value);
  };
  const config = {
    ...field,
    ...otherProps,
    select: true,
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
    if (dosId !== "") {
      const rightDos = dossiers.find((dos) => dos.id === dosId);
      const dosDate = rightDos.datEv;
      if (setValiDate) {
        setValiDate(dosDate);
      }
    }
  }, [dosId, dossiers, setValiDate]);

  return (
    <TextField {...config}>
      {Object.keys(options).map((item, pos) => {
        return (
          <MenuItem key={pos} value={options[item]}>
            {options[item]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SelectWrapper;
