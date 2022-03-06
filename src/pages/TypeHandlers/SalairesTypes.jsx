import React from "react";

import { useParams } from "react-router-dom";

import SalairesPage from "../SalairesPage/SalairesPage";

const SalairesTypes = () => {
  const params = useParams();
  const { type } = params;
  return <SalairesPage type={type} />;
};

export default SalairesTypes;
