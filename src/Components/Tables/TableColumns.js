import { Link } from "react-router-dom";
import { ins1000Sep, formatNum } from "./TableColumnsUtils";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { renderCellExpand } from "./CellExpand";

import clsx from "clsx";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const filesTableColumns = [
  {
    field: "actions",
    type: "actions",
    width: 80,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<SearchIcon />}
        component={Link}
        to={`/dossier/${params.id}`}
        label="Afficher"
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Supprimer"
        showInMenu
      />,

      <GridActionsCellItem icon={<EditIcon />} label="Modifier" showInMenu />,
    ],
  },
  {
    field: "id",
    headerName: "Identification",
  },
  {
    field: "Evenement",
    headerName: "Evenement",
    flex: 1,
    minWidth: 300,
    renderCell: renderCellExpand,
  },
  {
    field: "datEv",
    headerName: "Date évenement",
    type: "date",
    width: 130,
  },
  {
    field: "status",
    headerName: "Status",
    width: 90,
    cellClassName: (params) =>
      clsx("super-app", {
        actif: params.value === "actif",
        ferme: params.value === "fermé",
      }),
  },
  {
    field: "MR",
    headerName: "Montant réclamé",
    type: "number",
    minWidth: 140,
    valueFormatter: (params) => {
      const valueFormatted = ins1000Sep(formatNum(params.value));
      return `$${valueFormatted}`;
    },
  },
  {
    field: "MA",
    headerName: "Montant admissible",
    type: "number",
    width: 140,
    valueFormatter: (params) => {
      const valueFormatted = currencyFormatter.format(Number(params.value));
      return `${valueFormatted}`;
    },
  },
  {
    field: "MV",
    headerName: "Montant vérsé",
    type: "number",
    width: 140,
    valueFormatter: (params) => {
      const valueFormatted = currencyFormatter.format(Number(params.value));
      return `${valueFormatted}`;
    },
  },
  {
    field: "Participation",
    headerName: "Participation financière",
    type: "number",
    width: 140,
    valueFormatter: (params) => {
      const valueFormatted = currencyFormatter.format(Number(params.value));
      return `${valueFormatted}`;
    },
  },
];

export const facturesColumns = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "desc_fact",
    headerName: "Description",
    flex: 1,
    minWidth: 300,
    renderCell: renderCellExpand,
  },
  {
    field: "date_fact",
    headerName: "Date de la facture",
    flex: 1,
    minWidth: 130,
  },
  {
    field: "site_con",
    headerName: "Site concerné",
    flex: 1,
    minWidth: 140,
  },
  {
    field: "montant_rec",
    headerName: "Montant réclamé",
    flex: 1,
    minWidth: 140,
  },
  {
    field: "tax",
    headerName: "Taxable ?",
    type: "boolean",
  },
  {
    field: "actions",
    type: "actions",
    width: 80,
    getActions: (params) => [
      <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
      <GridActionsCellItem
        icon={<PictureAsPdfIcon />}
        label="Télécharger"
        showInMenu
      />,
    ],
  },
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const machineriesColumns = [
  {
    field: "id",
    headerName: "Code et appelation",
  },
  {
    field: "desc",
    headerName: "Description",
    flex: 1,
    minWidth: 250,
    renderCell: renderCellExpand,
  },
  {
    field: "hrs_fonc",
    headerName: "Heures en fonctionnement",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "hrs_stat",
    headerName: "Heures stationnaire",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "taux_fonc",
    headerName: "Taux horaire de fonctionnement",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "maiontenance",
    headerName: "Taux de maintenance",
    flex: 1,
  },
  {
    field: "cout",
    headerName: "Côut total",
    flex: 1,
    minWidth: 80,
    valueFormatter: (params) => {
      const valueFormatted = ins1000Sep(formatNum(params.value));
      return `$ ${valueFormatted}`;
    },
  },
  {
    field: "actions",
    type: "actions",
    width: 80,
    getActions: (params) => [
      <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
      <GridActionsCellItem
        icon={<PictureAsPdfIcon />}
        label="Télécharger"
        showInMenu
      />,
    ],
  },
];

export const salairesColumns = [
  {
    field: "id",
    headerName: "",
    hide: true,
  },
  {
    field: "name",
    headerName: "name",
    minWidth: 150,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "date_per",
    headerName: "Date",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "Hreg",
    headerName: "Hreg",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "Treg",
    headerName: "Treg",
    flex: 1,
    minWidth: 100,
    valueFormatter: (params) => {
      const valueFormatted = ins1000Sep(formatNum(params.value));
      return `$ ${valueFormatted}`;
    },
  },
  {
    field: "Hsup",
    headerName: "Hsup",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "Tsup",
    headerName: "Tsup",
    flex: 1,
    minWidth: 100,
    valueFormatter: (params) => {
      const valueFormatted = ins1000Sep(formatNum(params.value));
      return `$ ${valueFormatted}`;
    },
  },
  {
    field: "taux_vac",
    headerName: "Taux de vacances",
    flex: 1,
    minWidth: 120,
    valueFormatter: (params) => {
      const valueFormatted = params.value * 100;
      return `${valueFormatted} %`;
    },
  },
  {
    field: "ae",
    headerName: "AE",
    type: "boolean",
  },
  {
    field: "rrq",
    headerName: "RRQ",
    type: "boolean",
  },
  {
    field: "rqap",
    headerName: "RQAP",
    type: "boolean",
  },
  {
    field: "fss",
    headerName: "FSS",
    type: "boolean",
  },
  {
    field: "csst",
    headerName: "CSST",
    type: "boolean",
  },
  {
    field: "montant_rec",
    headerName: "Montant réclamé",
    flex: 1,
    minWidth: 100,
    valueFormatter: (params) => {
      const valueFormatted = ins1000Sep(formatNum(params.value));
      return `$ ${valueFormatted}`;
    },
  },
];
