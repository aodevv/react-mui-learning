import React from "react";

import { salairesColumns } from "../TableColumns";
import { salairesTempData } from "../tempdata";
import { DataGrid } from "@mui/x-data-grid";

const SalairesTable = ({ data }) => {
  return (
    <div style={{ width: "100%", display: "flex" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          autoHeight
          rows={data ? data : salairesTempData[1]}
          columns={salairesColumns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default SalairesTable;
