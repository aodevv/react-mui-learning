import { Link } from "react-router-dom";
import { ins1000Sep, formatNum } from "./TableColumnsUtils";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { renderCellExpand } from "./CellExpand";

import clsx from "clsx";

//import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PaidIcon from "@mui/icons-material/Paid";
import EditIcon from "@mui/icons-material/Edit";

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

      <GridActionsCellItem icon={<PaidIcon />} label="Verser" showInMenu />,
    ],
  },
  {
    field: "id",
    headerName: "Numéro",
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
    field: "datOuv",
    headerName: "Date d'ouverture",
    type: "date",
    width: 130,
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
    headerName: "ID",
    hide: true,
  },
  {
    field: "dos",
    headerName: "Dossier",
    width: 100,
  },
  {
    field: "type",
    headerName: "Préjudice",
    width: 220,
    valueFormatter: (params) => {
      return typePrejudices[params.value];
    },
    cellClassName: (params) =>
      clsx("super-app", {
        dab: params.value === "dab",
      }),
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
    valueFormatter: (params) => {
      const valueFormatted = currencyFormatter.format(Number(params.value));
      return `${valueFormatted}`;
    },
  },
  {
    field: "ajust",
    headerName: "Ajustement",
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
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const machineriesColumns = [
  {
    field: "dos",
    headerName: "Dossier",
    width: 100,
  },
  {
    field: "type",
    headerName: "Préjudice",
    width: 220,
    valueFormatter: (params) => {
      return typePrejudices[params.value];
    },
    cellClassName: (params) =>
      clsx("super-app", {
        dab: params.value === "dab",
      }),
  },
  {
    field: "site_con",
    headerName: "Site concerné",
    flex: 1,
    minWidth: 140,
  },
  {
    field: "code",
    headerName: "Appelation",
    width: 150,
  },
  {
    field: "id",
    hide: true,
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
    field: "maintenance",
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
    field: "dos",
    headerName: "Dossier",
    width: 100,
  },
  {
    field: "type",
    headerName: "Préjudice",
    width: 220,
    valueFormatter: (params) => {
      return typePrejudices[params.value];
    },
    cellClassName: (params) =>
      clsx("super-app", {
        dab: params.value === "dab",
      }),
  },
  {
    field: "nom",
    headerName: "Nom",
    minWidth: 110,
  },
  {
    field: "prenom",
    headerName: "Prénom",
    minWidth: 110,
  },

  {
    field: "site_con",
    headerName: "Site concerné",
    flex: 1,
    minWidth: 140,
  },

  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 100,
    valueFormatter: (params) => {
      return status[params.value];
    },
    cellClassName: (params) =>
      clsx("super-app", {
        occ: params.value === "occ",
      }),
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
    cellClassName: "super-app actif",
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
    cellClassName: "super-app actif",
    valueFormatter: (params) => {
      const valueFormatted = ins1000Sep(formatNum(params.value));
      return `$ ${valueFormatted}`;
    },
  },
  {
    field: "Hsup2",
    headerName: "Hsup 2",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "Tsup2",
    headerName: "Tsup 2",
    flex: 1,
    minWidth: 100,
    cellClassName: "super-app actif",
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
      const valueFormatted = params.value;
      return `${valueFormatted} %`;
    },
  },
  {
    field: "ae",
    headerName: "AE",
    type: "boolean",
    width: 80,
  },
  {
    field: "rrq",
    headerName: "RRQ",
    type: "boolean",
    width: 80,
  },
  {
    field: "rqap",
    headerName: "RQAP",
    type: "boolean",
    width: 80,
  },
  {
    field: "fss",
    headerName: "FSS",
    type: "boolean",
    width: 80,
  },
  {
    field: "csst",
    headerName: "CSST",
    type: "boolean",
    width: 80,
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
    field: "ajust",
    headerName: "Ajustement",
    flex: 1,
    minWidth: 100,
    valueFormatter: (params) => {
      const valueFormatted = ins1000Sep(formatNum(params.value));
      return `$ ${valueFormatted}`;
    },
  },
];

export const PayrollColumns = [
  {
    field: "id",
    headerName: "",
    hide: true,
  },
  {
    field: "nom",
    headerName: "Nom",
    minWidth: 110,
  },
  {
    field: "prenom",
    headerName: "Prénom",
    minWidth: 110,
  },

  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 100,
    valueFormatter: (params) => {
      return status[params.value];
    },
    cellClassName: (params) =>
      clsx("super-app", {
        occ: params.value === "occ",
      }),
  },
  {
    field: "taux_vac",
    headerName: "Taux de vacances",
    flex: 1,
    minWidth: 120,
    valueFormatter: (params) => {
      const valueFormatted = params.value;
      return `${valueFormatted} %`;
    },
  },
  {
    field: "Treg",
    headerName: "Treg",
    flex: 1,
    minWidth: 100,
    cellClassName: "super-app actif",
    valueFormatter: (params) => {
      const valueFormatted = ins1000Sep(formatNum(params.value));
      return `$ ${valueFormatted}`;
    },
  },

  {
    field: "Tsup",
    headerName: "Tsup",
    flex: 1,
    minWidth: 100,
    cellClassName: "super-app actif",
    valueFormatter: (params) => {
      const valueFormatted = ins1000Sep(formatNum(params.value));
      return `$ ${valueFormatted}`;
    },
  },
  {
    field: "Tsup2",
    headerName: "Tsup 2",
    flex: 1,
    minWidth: 100,
    cellClassName: "super-app actif",
    valueFormatter: (params) => {
      const valueFormatted = ins1000Sep(formatNum(params.value));
      return `$ ${valueFormatted}`;
    },
  },
  {
    field: "ae",
    headerName: "AE",
    type: "boolean",
    width: 80,
  },
  {
    field: "rrq",
    headerName: "RRQ",
    type: "boolean",
    width: 80,
  },
  {
    field: "rqap",
    headerName: "RQAP",
    type: "boolean",
    width: 80,
  },
  {
    field: "fss",
    headerName: "FSS",
    type: "boolean",
    width: 80,
  },
  {
    field: "csst",
    headerName: "CSST",
    type: "boolean",
    width: 80,
  },
];

export const sitesColumns = [
  {
    field: "id",
    headerName: "",
    hide: true,
  },
  {
    field: "dos",
    headerName: "Dossier",
    width: 80,
  },
  {
    field: "site",
    headerName: "Site",
    minWidth: 100,
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
