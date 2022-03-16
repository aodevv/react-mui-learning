import React from "react";
import { Grid, Card, Typography } from "@mui/material";

const MyCard = ({ title, children, bgColor, textColor, onClick }) => {
  return (
    <>
      <Card
        onClick={onClick}
        sx={{
          width: "100%",
          height: 100,
          display: "flex",
          color: `${textColor}`,
          backgroundColor: `${bgColor}`,
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          transition: "all linear 100ms",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0px 0px 25px 2px rgba(0,0,0,0.22)",
          },
        }}
      >
        {children}
        <Typography variant="h5" color="success" ml={1}>
          {title}
        </Typography>
      </Card>
    </>
  );
};

export default MyCard;
