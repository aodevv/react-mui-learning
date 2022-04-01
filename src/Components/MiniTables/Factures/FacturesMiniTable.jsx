import React from "react";

import { facturesColumns } from "../TableColumns";
import { DataGrid } from "@mui/x-data-grid";

const FacturesMiniTable = ({ data, setFacToEdit }) => {
  const editFac = ({ id }) => {
    setFacToEdit(id);
  };

  return (
    <div style={{ width: "100%", display: "flex" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          autoHeight
          rows={data}
          columns={facturesColumns}
          pageSize={2}
          rowsPerPageOptions={[2]}
          checkboxSelection={false}
          disableColumnMenu
          onRowClick={editFac}
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

export default FacturesMiniTable;
