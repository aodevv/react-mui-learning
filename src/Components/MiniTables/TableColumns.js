import { Link } from "react-router-dom";
import { ins1000Sep, formatNum } from "./TableColumnsUtils";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { renderCellExpand } from "./CellExpand";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

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
    headerName: "ID",
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
const typePrejudices = {
  dab: "Dommage au biens",
  mpt: "Mesures preventives temporaires",
  mi: "Mesures d'interventions",
  bcg: "Bris du couvert de glace",
};

const status = {
  occ: "Occasionnel",
  reg: "Régulier",
};

export const facturesColumns = [
  {
    field: "id",
    headerName: "",
    hide: true,
  },
  {
    field: "type",
    headerName: "Préjudice",
    width: 100,
    valueFormatter: (params) => {
      return typePrejudices[params.value];
    },
  },
  {
    field: "site_con",
    headerName: "Site concerné",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "desc_fact",
    headerName: "Description",
    flex: 1,
    minWidth: 150,
    renderCell: renderCellExpand,
  },
  {
    field: "date_fact",
    headerName: "Date de la facture",
    flex: 1,
    minWidth: 130,
  },

  {
    field: "montant_rec",
    headerName: "Montant réclamé",
    flex: 1,
    minWidth: 140,
    valueFormatter: (params) => {
      const valueFormatted = currencyFormatter.format(Number(params.value));
      return `${valueFormatted}`;
    },
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
      <GridActionsCellItem icon={<EditIcon />} label="Modifier" />,
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
    headerName: "",
    hide: true,
  },
  {
    field: "type",
    headerName: "Préjudice",
    width: 100,
    valueFormatter: (params) => {
      return typePrejudices[params.value];
    },
  },
  {
    field: "site_con",
    headerName: "Site concerné",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "code",
    headerName: "Code et appelation",
    minWidth: 150,
  },
  {
    field: "desc",
    headerName: "Description",
    flex: 1,
    minWidth: 150,
    renderCell: renderCellExpand,
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
      <GridActionsCellItem icon={<EditIcon />} label="Modifier" />,
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
    field: "type",
    headerName: "Préjudice",
    minWidth: 150,
    flex: 1,
    valueFormatter: (params) => {
      return typePrejudices[params.value];
    },
  },
  {
    field: "site_con",
    headerName: "Site concerné",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "nom",
    headerName: "Nom",
    minWidth: 100,
  },
  {
    field: "prenom",
    headerName: "Prénom",
    minWidth: 100,
  },

  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 100,
    valueFormatter: (params) => {
      return status[params.value];
    },
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
    field: "Hsup",
    headerName: "Hsup 1",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "Hsup2",
    headerName: "Hsup 2",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "taux_vac",
    headerName: "Taux de vacances",
    flex: 1,
    minWidth: 120,
    valueFormatter: (params) => {
      return `${params.value} %`;
    },
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
  {
    field: "actions",
    type: "actions",
    width: 80,
    getActions: (params) => [
      <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
      <GridActionsCellItem icon={<EditIcon />} label="Modifier" />,
    ],
  },
];

export const siteColumns = [
  {
    field: "id",
    headerName: "",
    hide: true,
  },
  {
    field: "site",
    headerName: "Site",
    minWidth: 140,
  },
  {
    field: "nature",
    headerName: "Nature",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "part_end",
    headerName: "Partie endommagée",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "pourc_end",
    headerName: "Pourcentage endommagé",
    flex: 1,
    minWidth: 100,
    valueFormatter: (params) => {
      return `${params.value} %`;
    },
  },
  {
    field: "type_ret",
    headerName: "Type rétabli",
    flex: 1,
    minWidth: 100,
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
  {
    field: "f_montant_rec",
    headerName: "Factures total",
    flex: 1,
    minWidth: 100,
    valueFormatter: (params) => {
      const valueFormatted = ins1000Sep(formatNum(params.value));
      return `$ ${valueFormatted}`;
    },
  },
  {
    field: "s_montant_rec",
    headerName: "Salaires total",
    flex: 1,
    minWidth: 100,
    valueFormatter: (params) => {
      const valueFormatted = ins1000Sep(formatNum(params.value));
      return `$ ${valueFormatted}`;
    },
  },
  {
    field: "m_montant_rec",
    headerName: "Machineries total",
    flex: 1,
    minWidth: 100,
    valueFormatter: (params) => {
      const valueFormatted = ins1000Sep(formatNum(params.value));
      return `$ ${valueFormatted}`;
    },
  },
  {
    field: "pourc_adm",
    headerName: "Pourcentage admissible",
    flex: 1,
    minWidth: 100,
    valueFormatter: (params) => {
      return `${params.value} %`;
    },
  },

  {
    field: "actions",
    type: "actions",
    width: 80,
    getActions: (params) => [
      <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
      <GridActionsCellItem icon={<EditIcon />} label="Modifier" />,
    ],
  },
];
