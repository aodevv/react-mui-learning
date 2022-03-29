import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

// REDUX
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
  selectSalairesMemo,
  selectPayroll,
} from "../../redux/Salaires/salaires.selectors";
import { selectDossiers } from "../../redux/DossierInfos/infosDossier.selectors";
import { selectSitesMemo } from "../../redux/Sites/Sites.selectors";

// MUI components
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Modal, Fade } from "@mui/material";

// MUI icons
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import SalairesTable from "../../Components/Tables/Salaires/SalairesTable";
import SalairesFilters from "../../Components/Filters/SalairesFilters/SalairesFilters";

import PayrollTable from "../../Components/Tables/Payroll/PayrollTable";

import SalaireModalFormDos from "../../Components/Forms/SalaireModalForm/SalaireModalFormDos";
import PayrollModalForm from "../../Components/Forms/PayrollForm/PayrollModalForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  borderRadius: 2,
  p: "30px 10px",
};

const SalairesPage = ({ salaires, dossiers, sites, payroll }) => {
  const [salaireModal, setSalaireModal] = useState(false);
  const [salToEdit, setSalToEdit] = useState(null);
  const openSalaire = () => {
    setSalaireModal(true);
  };
  const closeSalaire = () => {
    setSalaireModal(false);
  };
  const [payrollModal, setPayrollModal] = useState(false);
  const openPay = () => {
    setPayrollModal(true);
  };
  const closePay = () => {
    setPayrollModal(false);
  };
  let flatSalaires = [];
  Object.keys(salaires).forEach((item) =>
    salaires[item].forEach((sal) => {
      flatSalaires.push({
        ...sal,
        dos: item,
        id: `${item};${sal.id}`,
      });
    })
  );

  const [filteredSalaires, setFilteredSalaires] = useState(flatSalaires);

  let dosOnly = [];

  // Object.keys(salaires).forEach((item) => {
  //   dosOnly.push(item);
  // });

  dossiers.forEach((dos) => {
    dosOnly.push(dos.id);
  });

  let sitesOnly = [];

  Object.keys(sites).forEach((item, index) => {
    sites[item].map((site) => sitesOnly.push(site.site));
  });

  const remove_duplicates = (arr) => {
    var obj = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
      obj[arr[i]] = true;
    }
    for (var key in obj) {
      ret_arr.push(key);
    }
    return ret_arr;
  };

  const typePrejudices = {
    dab: "Dommage au biens",
    mpt: "Mesures preventives temporaires",
    mi: "Mesures d'interventions",
    bcg: "Bris du couvert de glace",
  };

  useEffect(() => {
    flatSalaires = [];
    Object.keys(salaires).forEach((item) =>
      salaires[item].forEach((sal) => {
        flatSalaires.push({
          ...sal,
          dos: item,
          id: `${item};${sal.id}`,
        });
      })
    );
    setFilteredSalaires(flatSalaires);
  }, [salaires]);

  useEffect(() => {
    if (salToEdit !== null) {
      openSalaire();
    }
  }, [salToEdit]);

  return (
    <Grid>
      <Card>
        <CardHeader
          disableTypography={false}
          titleTypographyProps={{ fontWeight: "bold" }}
          title={"Liste des salaires"}
        />
        <CardContent>
          <Grid item xs={12} mb={2}>
            <SalairesFilters
              salaires={flatSalaires}
              setFilteredSalaires={setFilteredSalaires}
              numDos={dosOnly}
              sites={remove_duplicates(sitesOnly)}
            />
          </Grid>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={openSalaire}
            >
              Ajouter
            </Button>
            <Button
              variant="contained"
              disabled
              size="small"
              startIcon={<DeleteIcon />}
            >
              Supprimer
            </Button>
          </Stack>
          <Box mt={2} sx={{ height: "calc(100% - 64px)" }}>
            <SalairesTable
              setSalToEdit={setSalToEdit}
              data={filteredSalaires}
            />
          </Box>
        </CardContent>
      </Card>
      <Box mt={2}></Box>
      <Card>
        <CardHeader
          disableTypography={false}
          titleTypographyProps={{ fontWeight: "bold" }}
          title={"Liste des salairés"}
        />
        <CardContent>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={openPay}
            >
              Ajouter
            </Button>
            <Button
              variant="contained"
              disabled
              size="small"
              startIcon={<DeleteIcon />}
            >
              Supprimer
            </Button>
          </Stack>
          <Box mt={2} sx={{ height: "calc(100% - 64px)" }}>
            <PayrollTable data={payroll} />
          </Box>
        </CardContent>
      </Card>
      <Modal
        open={salaireModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={salaireModal}>
          <Box sx={style}>
            <SalaireModalFormDos
              prejudices={typePrejudices}
              closeModal={closeSalaire}
              sites={sites}
              numDos={dosOnly}
              dossiers={dossiers}
              salaires={salaires}
              payroll={payroll}
              setSalToEdit={setSalToEdit}
              edit={salToEdit}
            />
          </Box>
        </Fade>
      </Modal>
      {/* PAYROLL */}
      {/* PAYROLL */}
      {/* PAYROLL */}
      {/* PAYROLL */}
      <Modal
        open={payrollModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={payrollModal}>
          <Box sx={style}>
            <PayrollModalForm closeModal={closePay} payroll={payroll} />
          </Box>
        </Fade>
      </Modal>
      <Outlet />
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  dossiers: selectDossiers,
  salaires: selectSalairesMemo,
  sites: selectSitesMemo,
  payroll: selectPayroll,
});

export default connect(mapStateToProps)(SalairesPage);
