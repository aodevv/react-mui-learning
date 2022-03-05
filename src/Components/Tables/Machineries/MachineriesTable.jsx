import React from "react";

import { machineriesColumns } from "../TableColumns";
import { machineriesTempData } from "../tempdata";
import { DataGrid } from "@mui/x-data-grid";

const MachineriesTable = ({ data }) => {
  return (
    <div style={{ width: "100%", display: "flex" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          autoHeight
          rows={data ? data : machineriesTempData[1]}
          columns={machineriesColumns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default MachineriesTable;
