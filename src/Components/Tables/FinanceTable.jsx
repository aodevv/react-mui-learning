import React, { useState } from "react";
import { ins1000Sep, formatNum } from "./TableColumnsUtils";

import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import { addInfosDossier } from "../../redux/DossierInfos/infosDossier.actions";

import { createStructuredSelector } from "reselect";
import { selectDossiers } from "../../redux/DossierInfos/infosDossier.selectors";

import { Link } from "react-router-dom";
//import { filesTableColumns } from "./TableColumns";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";

import { GridActionsCellItem } from "@mui/x-data-grid";
import { renderCellExpand } from "./CellExpand";

//import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import PaidIcon from "@mui/icons-material/Paid";
import clsx from "clsx";

import DepositModal from "../DepositModal/DepositModal";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const FilesTable = ({
  data,
  hiddenStatus,
  addInfosDossier,
  setFilteredDossiers,
  dossiers,
}) => {
  const [deposit, setDeposit] = useState(false);
  const [dosId, setDosId] = useState(0);
  const [dosToEdit, setDosToEdit] = useState(0);

  const navigate = useNavigate();

  const closeDeposit = () => {
    setDeposit(false);
  };

  const openDeposit = () => {
    setDeposit(true);
  };

  const depositToDos = (id) => {
    const dosCopy = JSON.parse(JSON.stringify(dossiers));
    setDosId(id);
    setDosToEdit(dosCopy.find((dossier) => dossier.id === id));
    openDeposit();
  };

  const changeStatus = (id) => {
    const dosCopy = JSON.parse(JSON.stringify(dossiers));

    const dosToEdit = dosCopy.find((dossier) => dossier.id === id);
    if (dosToEdit.status === "actif") {
      dosToEdit.status = "fermé";
      const otherDoses = dosCopy.filter((dossier) => dossier.id !== id);
      const newDoses = [...otherDoses, dosToEdit].sort((a, b) =>
        a.id >= b.id ? 1 : -1
      );
      addInfosDossier(newDoses);

      if (!hiddenStatus) {
        setFilteredDossiers(newDoses);
      }
    }
  };

  const changeStatusOpen = (id) => {
    const dosCopy = JSON.parse(JSON.stringify(dossiers));

    const dosToEdit = dosCopy.find((dossier) => dossier.id === id);
    if (dosToEdit.status === "fermé") {
      dosToEdit.status = "actif";
      const otherDoses = dosCopy.filter((dossier) => dossier.id !== id);
      const newDoses = [...otherDoses, dosToEdit].sort((a, b) =>
        a.id >= b.id ? 1 : -1
      );
      addInfosDossier(newDoses);

      if (!hiddenStatus) {
        setFilteredDossiers(newDoses);
      }
    }
  };

  const filesTableColumns = [
    {
      field: "actions",
      type: "actions",
      hide: true,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<PaidIcon />}
          onClick={() => depositToDos(params.id)}
          label="Verser"
        />,
        <GridActionsCellItem
          icon={<DangerousIcon />}
          label="Fermer"
          onClick={() => changeStatus(params.id)}
        />,
        <GridActionsCellItem
          icon={<CheckCircleIcon />}
          label="Réactiver"
          onClick={() => changeStatusOpen(params.id)}
        />,
      ],
    },
    {
      field: "id",
      headerName: "Numéro",
      flex: 1,
      minWidth: 180,
      maxWidth: 200,
      renderCell: (params) => (
        <Box
          display="flex"
          sx={{ width: "100%" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            variant="outlined"
            color="success"
            size="small"
            disabled={params.row.status === "fermé"}
            style={{ marginLeft: 16 }}
            onClick={() => depositToDos(params.id)}
          >
            verser
          </Button>
          <strong>{params.value}</strong>
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      hide: hiddenStatus,
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
      field: "MR",
      headerName: "Montant réclamé",
      type: "number",
      align: "center",
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
      align: "center",
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
      align: "center",
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
      width: 160,
      valueFormatter: (params) => {
        const valueFormatted = ins1000Sep(formatNum(params.value));
        return `$ ${valueFormatted}`;
      },
    },
  ];

  const navigateToDos = ({ id }) => {
    navigate(`/dossier/${id}`);
  };

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
            disableColumnMenu
            sx={{
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
                cursor: "pointer",
              },
            }}
          />
        </div>
        <DepositModal
          deposit={deposit}
          dosToEdit={dosToEdit}
          dossiers={dossiers}
          fullDosPage={!hiddenStatus}
          closeDeposit={closeDeposit}
          setFilteredDossiers={setFilteredDossiers}
        />
      </Box>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addInfosDossier: (newInfos) => dispatch(addInfosDossier(newInfos)),
});

const mapStateToProps = createStructuredSelector({
  dossiers: selectDossiers,
});

export default connect(mapStateToProps, mapDispatchToProps)(FilesTable);
