import React, { useState } from "react";
import { ins1000Sep, formatNum } from "./TableColumnsUtils";

import { Link } from "react-router-dom";
//import { filesTableColumns } from "./TableColumns";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";

import { GridActionsCellItem } from "@mui/x-data-grid";
import { renderCellExpand } from "./CellExpand";

import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import PaidIcon from "@mui/icons-material/Paid";
import clsx from "clsx";

import DepositModal from "../DepositModal/DepositModal";

const FilesTable = ({ data }) => {
  const [deposit, setDeposit] = useState(false);
  const [dosId, setDosId] = useState(0);

  const closeDeposit = () => {
    setDeposit(false);
  };

  const openDeposit = () => {
    setDeposit(true);
  };

  const blabla = (id) => {
    return function () {
      console.log(id);
    };
  };

  const filesTableColumns = [
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

        <GridActionsCellItem
          icon={<PaidIcon />}
          onClick={blabla(params.id)}
          label="Verser"
          showInMenu
        />,
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
        return `$ ${valueFormatted}`;
      },
    },
    {
      field: "MA",
      headerName: "Montant admissible",
      type: "number",
      width: 140,
      valueFormatter: (params) => {
        const valueFormatted = ins1000Sep(formatNum(params.value));
        return `$ ${valueFormatted}`;
      },
    },
    {
      field: "MV",
      headerName: "Montant vérsé",
      type: "number",
      width: 140,
      valueFormatter: (params) => {
        const valueFormatted = ins1000Sep(formatNum(params.value));
        return `$ ${valueFormatted}`;
      },
    },
    {
      field: "Participation",
      headerName: "Participation financière",
      type: "number",
      width: 140,
      valueFormatter: (params) => {
        const valueFormatted = ins1000Sep(formatNum(params.value));
        return `$ ${valueFormatted}`;
      },
    },
  ];
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          "& .super-app-theme--cell": {
            backgroundColor: "rgba(224, 183, 60, 0.55)",
            color: "#1a3e72",
            fontWeight: "600",
          },
          "& .super-app.actif": {
            backgroundColor: "rgba(157, 255, 118, 0.49)",
            color: "#1a3e72",
            fontWeight: "600",
            textTransform: "uppercase",
          },
          "& .super-app.ferme": {
            backgroundColor: "#d47483",
            color: "#1a3e72",
            fontWeight: "600",
            textTransform: "uppercase",
          },
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            autoHeight
            rows={data}
            columns={filesTableColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
          />
        </div>
        <DepositModal
          deposit={deposit}
          dos={dosId}
          dossiers={data}
          closeDeposit={closeDeposit}
          MR={10000}
          MA={8000}
          MV={6000}
        />
      </Box>
      <Button variant="outlined" onClick={openDeposit}>
        Open
      </Button>
    </>
  );
};

export default FilesTable;
