import React, { useEffect, useState } from "react";

import { TextField, MenuItem } from "@mui/material";

import { useField, useFormikContext } from "formik";

const SelectWrapper = ({ name, options, dossiers, ...otherProps }) => {
  const [filteredPrejudices, setFilteredPrejudices] = useState(options);
  const { values, setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (e) => {
    const { value } = e.target;
    setFieldValue(name, value);
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
    if (values.numDos !== "") {
      const dos = dossiers.filter(
        (dos) => dos.id === parseInt(values.numDos)
      )[0];
      setFieldValue("type", "");

      const allowed = [];
      if (dos.dab) allowed.push("dab");
      if (dos.mpt) allowed.push("mpt");
      if (dos.mi) allowed.push("mi");
      if (dos.bcg) allowed.push("bcg");

      const filtered = Object.keys(options)
        .filter((key) => allowed.includes(key))
        .reduce((obj, key) => {
          obj[key] = options[key];
          return obj;
        }, {});
      setFilteredPrejudices(filtered);
    }
  }, [values.numDos]);
  return (
    <TextField {...config}>
      {Object.keys(filteredPrejudices).map((item, pos) => {
        return (
          <MenuItem key={pos} value={item}>
            {filteredPrejudices[item]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SelectWrapper;
