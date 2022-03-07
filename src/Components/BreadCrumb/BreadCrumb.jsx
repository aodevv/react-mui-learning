import React from "react";

import { useNavigate, useLocation } from "react-router-dom";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

const BreadCrumb = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pathArray = pathname.split("/");
  const lastPath = pathArray[pathArray.length - 1];

  const capitalize = (str) => {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <Box mb={2}>
      <Breadcrumbs aria-label="breadcrumb">
        {pathArray.slice(0, pathArray.length - 1).map((path, index) => {
          const currPath = pathArray.slice(0, index).join("/");
          const currLink = pathArray[index];
          return (
            <span style={{ cursor: "pointer" }} key={index}>
              <Link
                underline="hover"
                color="inherit"
                onClick={() => {
                  navigate(`${currPath}/${currLink}`);
                }}
              >
                {capitalize(currLink)}
              </Link>
            </span>
          );
        })}

        <Typography color="text.primary">{capitalize(lastPath)}</Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default BreadCrumb;
