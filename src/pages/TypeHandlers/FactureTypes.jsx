import React from "react";
import { useParams } from "react-router-dom";

import FacturePage from "../FacturesPage/FacturePage";

const FactureTypes = () => {
  const params = useParams();
  const { type } = params;
  return <FacturePage type={type} />;
};

export default FactureTypes;
