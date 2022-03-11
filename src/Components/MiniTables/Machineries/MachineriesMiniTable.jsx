import React from "react";

import { machineriesColumns } from "../TableColumns";
import { DataGrid } from "@mui/x-data-grid";

const MachineriesMiniTable = ({ data }) => {
  return (
    <div style={{ width: "100%", display: "flex" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          autoHeight
          rows={data}
          columns={machineriesColumns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection={false}
        />
      </div>
    </div>
  );
};

export default MachineriesMiniTable;
