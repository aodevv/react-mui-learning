import React from "react";

import { facturesColumns } from "./TableColumns";
import { facturesTableData } from "./tempdata";
import { DataGrid } from "@mui/x-data-grid";

const FacturesTable = () => {
  return (
    <div style={{ width: "100%", display: "flex" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          autoHeight
          rows={facturesTableData[1]}
          columns={facturesColumns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default FacturesTable;
