import React from "react";

import { machineriesColumns } from "../TableColumns";
import { DataGrid } from "@mui/x-data-grid";

const MachineriesMiniTable = ({ data, setMachToEdit }) => {
  const editMach = ({ id }) => {
    setMachToEdit(id);
  };
  return (
    <div style={{ width: "100%", display: "flex" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          autoHeight
          rows={data}
          columns={machineriesColumns}
          pageSize={2}
          rowsPerPageOptions={[2]}
          checkboxSelection={false}
          onRowClick={editMach}
          sx={{
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
              cursor: "pointer",
            },
          }}
        />
      </div>
    </div>
  );
};

export default MachineriesMiniTable;
