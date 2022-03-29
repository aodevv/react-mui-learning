import React, { useEffect, useState } from "react";

import { TextField, MenuItem } from "@mui/material";

import { useField, useFormikContext } from "formik";

const SelectWrapper = ({
  name,
  sites,
  edit,
  siteIfEdit,
  allSites,
  ...otherProps
}) => {
  const [sitesList, setSitesList] = useState([]);
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
      const dosInt = values.numDos;

      const sitesDos = sites[dosInt].map((site) => site.site);

      const filteredSites = Object.keys(allSites)
        .filter((key) => !sitesDos.includes(key))
        .reduce((obj, key) => {
          obj[key] = allSites[key];
          return obj;
        }, {});

      //let siteId = allSites.findIndex((site, index) => site === siteIfEdit);

      if (edit !== null) {
        setSitesList(allSites);
        setFieldValue("site", siteIfEdit);
      } else {
        setSitesList(filteredSites);
        setFieldValue("site", "");
      }
    }
  }, [setFieldValue, sites, values.numDos, values.type, allSites]);

  return (
    <TextField {...config}>
      {Object.keys(sitesList).map((item, pos) => {
        return (
          <MenuItem key={pos} value={item}>
            {sitesList[item]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SelectWrapper;
