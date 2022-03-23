import React from "react";

import Box from "@mui/material/Box";

const MontantBox = ({
  percent,
  borderRight,
  borderTopRight,
  borderTopLeft,
  children,
  bgColor,
}) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          borderRight: `${borderRight ? "1px solid #808080aa" : ""}`,
          borderBottom: "1px solid #808080aa",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: `linear-gradient(270deg, rgba(255,255,255,0) ${percent}%,  ${
            bgColor ? bgColor : "rgba(255,0,0,0.2)"
          } ${percent}%)`,
          overflow: "hidden",
          borderTopRightRadius: `${borderTopRight ? "8px" : ""}`,
          borderTopLeftRadius: `${borderTopLeft ? "8px" : ""}`,
          padding: "10px 0",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default MontantBox;
