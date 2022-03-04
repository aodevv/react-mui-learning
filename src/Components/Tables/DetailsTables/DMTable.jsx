import React from "react";

import { DataGrid } from "@mui/x-data-grid";

//import { DMColumns } from "./columns";

import { Link } from "react-router-dom";

import { ins1000Sep, formatNum } from "../TableColumnsUtils";
import { GridActionsCellItem } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";

const DMTable = ({ totals, dossierId, type }) => {
  const DMColumns = [
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<SearchIcon />}
          component={Link}
          to={`/dossier/${dossierId}/${type}/${params.id.toLowerCase()}`}
          label="Afficher"
        />,
      ],
    },
    {
      field: "id",
      headerName: "",
      minWidth: 200,
    },
    {
      field: "mr",
      flex: 1,
      headerName: "Montant réclamé",
      valueFormatter: (params) => {
        const valueFormatted = ins1000Sep(formatNum(params.value));
        return `$${valueFormatted}`;
      },
    },
    {
      field: "mad",
      flex: 1,
      headerName: "Montant admissible",
      valueFormatter: (params) => {
        const valueFormatted = ins1000Sep(formatNum(params.value));
        return `$${valueFormatted}`;
      },
    },
    {
      field: "mat",
      flex: 1,
      headerName: "Montant autorisé",
      valueFormatter: (params) => {
        const valueFormatted = ins1000Sep(formatNum(params.value));
        return `$${valueFormatted}`;
      },
    },
    {
      field: "mv",
      flex: 1,
      headerName: "Montant versé",
      valueFormatter: (params) => {
        const valueFormatted = ins1000Sep(formatNum(params.value));
        return `$${valueFormatted}`;
      },
    },
  ];

  return (
    <div style={{ width: "100%", display: "flex" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          autoHeight
          rows={totals}
          columns={DMColumns}
          checkboxSelection={false}
        />
      </div>
    </div>
  );
};

export default DMTable;
