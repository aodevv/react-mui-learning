import React from "react";

import SaveIcon from "@mui/icons-material/Save";

import { Button } from "@mui/material";
import { useFormikContext } from "formik";

const Submit = ({ children, ...otherProps }) => {
  const { submitForm } = useFormikContext();
  const handleSubmit = () => {
    submitForm();
  };

  const config = {
    ...otherProps,
    onClick: handleSubmit,
  };
  return (
    <Button {...config} startIcon={<SaveIcon />}>
      {children}
    </Button>
  );
};

export default Submit;
