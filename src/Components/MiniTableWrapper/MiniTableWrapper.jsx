import React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Box, Button } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

const MiniTableWrapper = ({ children, title, btnClick, disable, role }) => {
  return (
    <Card>
      <CardHeader title={title} sx={{ padding: "10px 0 0px 10px" }} />
      <CardContent>
        <Box mb={2}>
          <Button
            onClick={btnClick}
            variant="contained"
            disabled={disable || role === "admin"}
            size="small"
            startIcon={<AddIcon />}
          >
            Ajouter
          </Button>
        </Box>

        {children}
      </CardContent>
    </Card>
  );
};

export default MiniTableWrapper;
