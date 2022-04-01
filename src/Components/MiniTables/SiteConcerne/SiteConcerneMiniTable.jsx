import React from "react";

import { siteColumns } from "../TableColumns";
import { DataGrid } from "@mui/x-data-grid";

const SiteConcerneMiniTable = ({ data, setSiteToEdit }) => {
  const editSite = ({ id }) => {
    setSiteToEdit(id);
  };
  return (
    <div style={{ width: "100%", display: "flex" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          autoHeight
          rows={data}
          columns={siteColumns}
          pageSize={2}
          rowsPerPageOptions={[2]}
          checkboxSelection={false}
          disableColumnMenu
          onRowClick={editSite}
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

export default SiteConcerneMiniTable;
