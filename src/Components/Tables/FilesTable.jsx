import React from "react";

import { filesTableColumns } from "./TableColumns";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const FilesTable = ({ data }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        "& .super-app-theme--cell": {
          backgroundColor: "rgba(224, 183, 60, 0.55)",
          color: "#1a3e72",
          fontWeight: "600",
        },
        "& .super-app.actif": {
          backgroundColor: "rgba(157, 255, 118, 0.49)",
          color: "#1a3e72",
          fontWeight: "600",
          textTransform: "uppercase",
        },
        "& .super-app.ferme": {
          backgroundColor: "#d47483",
          color: "#1a3e72",
          fontWeight: "600",
          textTransform: "uppercase",
        },
      }}
    >
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          autoHeight
          rows={data}
          columns={filesTableColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection={false}
        />
      </div>
    </Box>
  );
};

export default FilesTable;
