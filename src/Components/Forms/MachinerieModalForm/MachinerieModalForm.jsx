import React, { useState } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectMachineriesMemo } from "../../../redux/Machineries/machineries.selectors";
import { addMachinerie } from "../../../redux/Machineries/machineries.actions";

import { selectDossiers } from "../../../redux/DossierInfos/infosDossier.selectors";
import { addInfosDossier } from "../../../redux/DossierInfos/infosDossier.actions";

// ICONS
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// FORMIK and YUP
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Custom componenets

import Textfield from "../../../Components/FormUI/Textfield";
import Select from "../../../Components/FormUI/Select";
//import DatePicker from "../../../Components/FormUI/DateTime";
//import Checkbox from "../../../Components/FormUI/Checkbox";
import Submit from "../../../Components/FormUI/Submit";

import Cout from "./Cout";

const MachinerieModalForm = ({
  closeModal,
  globalValues,
  prejudices,
  machineries,
  addMachinerie,
  existing,
  edit,
  setMachToEdit,
  addInfosDossier,
  dossiers,
  dosToEdit,
  role,
}) => {
  const [editing, setEditing] = useState(false);
  const allowed = [];
  if (globalValues.dab) allowed.push("dab");
  if (globalValues.mpt) allowed.push("mpt");
  if (globalValues.mi) allowed.push("mi");
  if (globalValues.bcg) allowed.push("bcg");

  const isAdmin = role === "admin";
  const modifAjust = isAdmin ? "Ajustement" : "Modification";

  const filteredPrejudices = Object.keys(prejudices)
    .filter((key) => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = prejudices[key];
      return obj;
    }, {});
  const sites = globalValues.sites.map((site) => site.site);

  let INITIAL_FORM_STATE, oldCout, oldAjust;
  if (edit !== null) {
    let siteId = sites.findIndex(
      (site, index) => site === globalValues.machineries[edit].site_con
    );
    siteId = siteId !== -1 ? siteId : "";
    INITIAL_FORM_STATE = {
      id: edit,
      code: globalValues.machineries[edit].code,
      desc: globalValues.machineries[edit].desc,
      type: globalValues.machineries[edit].type,
      site_con: siteId,
      maintenance: globalValues.machineries[edit].maintenance,
      hrs_fonc: globalValues.machineries[edit].hrs_fonc,
      hrs_stat: globalValues.machineries[edit].hrs_stat,
      taux_fonc: globalValues.machineries[edit].taux_fonc,
      cout: globalValues.machineries[edit].cout,
      ajust: globalValues.machineries[edit].ajust,
    };
    oldCout = globalValues.machineries[edit].cout;
    oldAjust = globalValues.machineries[edit].ajust;
  } else {
    INITIAL_FORM_STATE = {
      id: "",
      code: "",
      desc: "",
      type: "",
      site_con: "",
      maintenance: 0,
      hrs_fonc: 0,
      hrs_stat: 0,
      taux_fonc: 0,
      cout: 0,
      ajust: 0,
    };
  }

  const FORM_VALIDATION = Yup.object().shape({
    type: Yup.string().required("Champ obligatoire"),
    site_con: Yup.string().when("type", {
      is: "dab", // alternatively: (val) => val == true
      then: (schema) => schema.required("Champ obligatoire"),
    }),
    code: Yup.string().required("Champ obligatoire"),
    desc: Yup.string().required("Champ obligatoire"),
    maintenance: Yup.number().min(0, "Valeur négative !"),
    hrs_fonc: Yup.number().min(0, "Valeur négative !"),
    hrs_stat: Yup.number().min(0, "Valeur négative !"),
    taux_fonc: Yup.number().min(0, "Valeur négative !"),
    ajust: Yup.number()
      .min(0, "Valeur négative !")
      .max(oldCout, "Valeur supérieur au coût total"),
  });

  const handleSubmit = (values) => {
    let id;

    let newMachine = globalValues.machineries;
    const ids = newMachine
      .map((mach) => mach.id)
      .sort(function (a, b) {
        return a - b;
      });

    //ADD total to dossier
    const dosCopy = JSON.parse(JSON.stringify(dossiers));
    const dosId = dosToEdit.id;
    const diffMontant = edit === null ? values.cout : values.cout - oldCout;
    const diffAjust = isAdmin ? values.ajust - oldAjust : values.ajust;

    dosToEdit.MR = dosToEdit.MR + diffMontant;
    dosToEdit.MA = dosToEdit.MA - diffAjust;

    const otherDoses = dosCopy.filter((dossier) => dossier.id !== dosId);
    const newDoses = [...otherDoses, dosToEdit].sort((a, b) =>
      a.id >= b.id ? 1 : -1
    );
    addInfosDossier(newDoses);
    ////////////

    if (values.type === "dab") {
      globalValues.sites[values.site_con].montant_rec =
        globalValues.sites[values.site_con].montant_rec + diffMontant;
      globalValues.sites[values.site_con].m_montant_rec =
        globalValues.sites[values.site_con].m_montant_rec + diffMontant;
    }
    id = ids.length ? ids[ids.length - 1] + 1 : 0;
    newMachine = Object.assign([], newMachine);

    if (edit === null) {
      values.id = id;
      newMachine.push({ ...values, site_con: sites[values.site_con] });
    } else {
      const otherMachs = newMachine.filter((mach) => mach.id !== edit);
      newMachine = [
        ...otherMachs,
        { ...values, site_con: sites[values.site_con] },
      ].sort((a, b) => (a.id >= b.id ? 1 : -1));
    }

    //values.site_con = sites[values.site_con];
    if (existing) {
      let newMachs = JSON.parse(JSON.stringify(machineries));
      const dosInt = globalValues.numero;
      Object.keys(newMachs).forEach(function (key, index) {
        if (key === dosInt) {
          newMachs[key] = newMachine;
        }
      });
      addMachinerie(newMachs);
    }
    globalValues.machineries = newMachine;

    setMachToEdit(null);
    setEditing(false);
    closeModal();
  };

  const handleClose = () => {
    setMachToEdit(null);
    closeModal();
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(!editing);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Container maxWidth="l">
            <Formik
              initialValues={{ ...INITIAL_FORM_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={handleSubmit}
            >
              {(formikProps) => {
                const { values, isValid } = formikProps;

                return (
                  <Form>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="h5" mb={1}>
                        {edit !== null ? modifAjust : "Ajout machinerie"}
                      </Typography>
                      {edit !== null && !isAdmin ? (
                        <IconButton
                          aria-label="delete"
                          color={!editing ? "default" : "primary"}
                          size="medium"
                          onClick={handleEdit}
                        >
                          <EditIcon fontSize="inherit" />
                        </IconButton>
                      ) : null}
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Select
                          name="type"
                          label="Préjudice"
                          options={filteredPrejudices}
                          disabled={
                            !Object.keys(filteredPrejudices).length > 0 ||
                            (edit !== null && !editing)
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        {values.type === "dab" ? (
                          <Select
                            name="site_con"
                            label="Site concerné"
                            options={sites}
                            disabled={edit !== null && !editing}
                          />
                        ) : null}
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Textfield
                        name="code"
                        disabled={edit !== null && !editing}
                        label="Code et appelation"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Textfield
                        name="desc"
                        multiline
                        rows={4}
                        label="Description"
                        disabled={edit !== null && !editing}
                      />
                    </Grid>
                    <Typography mt={1}>Heures</Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Textfield
                          name="hrs_fonc"
                          label="Heures en fonction"
                          type="number"
                          disabled={edit !== null && !editing}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Textfield
                          name="hrs_stat"
                          label="Heures stationnaire"
                          type="number"
                          disabled={edit !== null && !editing}
                        />
                      </Grid>
                    </Grid>

                    <Typography mt={1}>Taux</Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Textfield
                          name="taux_fonc"
                          label="Taux de fonctionnement"
                          type="number"
                          disabled={edit !== null && !editing}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Textfield
                          name="maintenance"
                          label="Taux de maintenance"
                          type="number"
                          disabled={edit !== null && !editing}
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Box mt={2} display="flex" alignItems="center">
                        <Typography variant="h5" mr={2}>
                          Côut total:{" "}
                          <Box sx={{ fontWeight: 600, display: "inline" }}>
                            {/* {`$ ${ins1000Sep(formatNum(values.cout))}`} */}
                            <Cout name="cout" />
                          </Box>
                        </Typography>
                        <Grid item xs={4}>
                          <Textfield
                            disabled={!isAdmin}
                            name="ajust"
                            label="Ajustement"
                            type="number"
                          />
                        </Grid>
                      </Box>
                    </Grid>
                    <Stack direction="row-reverse" spacing={1} mt={2}>
                      <Submit
                        variant="contained"
                        disabled={!isAdmin && edit !== null && !editing}
                        size="small"
                      >
                        {edit !== null ? "Modifier" : "Enregistrer"}
                      </Submit>
                      {edit === null ? (
                        <Button
                          type="reset"
                          size="small"
                          disabled={edit !== null && !editing}
                          startIcon={<UndoIcon />}
                        >
                          Réinitialiser
                        </Button>
                      ) : null}
                      <Button
                        size="small"
                        onClick={handleClose}
                        startIcon={<CloseIcon />}
                      >
                        Annuler
                      </Button>
                    </Stack>
                    <Stack direction="row-reverse" spacing={1} mt={2}>
                      <Button
                        size="small"
                        color="error"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<RemoveRedEyeIcon />}
                      >
                        Aperçuu
                      </Button>
                    </Stack>
                  </Form>
                );
              }}
            </Formik>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  machineries: selectMachineriesMemo,
  dossiers: selectDossiers,
});

const mapDispatchToProps = (dispatch) => ({
  addMachinerie: (newMachs) => dispatch(addMachinerie(newMachs)),
  addInfosDossier: (newInfos) => dispatch(addInfosDossier(newInfos)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MachinerieModalForm);
