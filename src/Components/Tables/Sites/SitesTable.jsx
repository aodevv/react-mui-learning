import React from "react";
import Box from "@mui/material/Box";

import { sitesColumns } from "../TableColumns";
import { DataGrid } from "@mui/x-data-grid";

const SitesTable = ({ data }) => {
  return (
    <div style={{ width: "100%", display: "flex" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          autoHeight
          rows={data}
          columns={sitesColumns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default SitesTable;
