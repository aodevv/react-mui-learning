import { Link } from "react-router-dom";

import { ins1000Sep, formatNum } from "../TableColumnsUtils";
import { GridActionsCellItem } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";

export const DMColumns = [
  {
    field: "actions",
    type: "actions",
    width: 80,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<SearchIcon />}
        onClick={() => console.log(params)}
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
