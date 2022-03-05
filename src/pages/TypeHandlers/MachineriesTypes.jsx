import React from "react";

import { useParams } from "react-router-dom";

import MachineriePage from "../MachineriePage/MachineriePage";

const MachineriesTypes = () => {
  const params = useParams();
  const { type } = params;
  return <MachineriePage type={type} />;
};

export default MachineriesTypes;
