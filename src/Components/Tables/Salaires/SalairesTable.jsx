import React from "react";

import { salairesColumns } from "../TableColumns";
import { salairesTempData } from "../tempdata";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const SalairesTable = ({ data, setSalToEdit }) => {
  const editSal = ({ id }) => {
    setSalToEdit(id);
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        "& .super-app.actif": {
          backgroundColor: "rgba(157, 255, 118, 0.49)",
          color: "#1a3e72",
          fontWeight: "600",
          textTransform: "uppercase",
        },
        "& .super-app.occ": {
          backgroundColor: "rgba(224, 183, 60, 0.55)",
          color: "#1a3e72",
          fontWeight: "600",
        },
        "& .super-app.dab": {
          color: "#d30c0c",
          fontWeight: "600",
        },
      }}
    >
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          autoHeight
          rows={data ? data : salairesTempData[1]}
          columns={salairesColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection={false}
          onRowClick={editSal}
          sx={{
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
              cursor: "pointer",
            },
          }}
        />
      </div>
    </Box>
  );
};

export default SalairesTable;
