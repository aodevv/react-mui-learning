import React from "react";

import { filesTableColumns } from "./TableColumns";
import { filesTableData } from "./tempdata";
import { DataGrid } from "@mui/x-data-grid";

const FilesTable = () => {
  return (
    <div style={{ width: "100%", display: "flex" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          autoHeight
          rows={filesTableData}
          columns={filesTableColumns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default FilesTable;
