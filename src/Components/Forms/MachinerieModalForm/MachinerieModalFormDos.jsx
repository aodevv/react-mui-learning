import React, { useState } from "react";

// FORMIK and YUP
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { connect } from "react-redux";
import { addMachinerie } from "../../../redux/Machineries/machineries.actions";
import { addSites } from "../../../redux/Sites/Sites.actions";
import { addInfosDossier } from "../../../redux/DossierInfos/infosDossier.actions";

// MUI ICONS
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
import InputAdornment from "@mui/material/InputAdornment";

import Textfield from "../../../Components/FormUI/Textfield";
//import Select from "../../../Components/FormUI/Select";
import SelectDossier from "../../../Components/FormUI/SelectDossier";
import SelectPrejudice from "../../../Components/FormUI/SelectPrejudice";
import SelectSites from "../../../Components/FormUI/SelectSites";
//import DatePicker from "../../../Components/FormUI/DateTime";
//import Checkbox from "../../../Components/FormUI/Checkbox";
import Submit from "../../../Components/FormUI/Submit";

import Cout from "./Cout";

import EditIcon from "@mui/icons-material/Edit";

const MachinerieModalFormDos = ({
  sites,
  numDos,
  addMachinerie,
  addInfosDossier,
  addSites,
  machineries,
  prejudices,
  dossiers,
  closeModal,
  edit,
  setMachToEdit,
  role,
}) => {
  const [validDate, setValiDate] = useState("2010-01-01");
  const [editing, setEditing] = useState(false);
  var today = new Date();
  const isAdmin = role === "admin";
  const modifAjust = isAdmin ? "Ajustement" : "Modification";

  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  let INITIAL_FORM_STATE, oldCout, oldAjust;

  if (edit !== null) {
    var [dosMachEdit, idMachEdit] = edit.split(";");
    idMachEdit = parseInt(idMachEdit);
    const machVals = machineries[dosMachEdit].find(
      (mach) => mach.id === idMachEdit
    );
    const sitesList = sites[dosMachEdit].map((site) => site.site);
    console.log(sitesList);
    let siteId = sitesList.findIndex(
      (site, index) => site === machVals.site_con
    );
    INITIAL_FORM_STATE = {
      numDos: dosMachEdit,
      code: machVals.code,
      desc: machVals.desc,
      type: machVals.type,
      site_con: siteId,
      maintenance: machVals.maintenance,
      hrs_fonc: machVals.hrs_fonc,
      hrs_stat: machVals.hrs_stat,
      taux_fonc: machVals.taux_fonc,
      cout: machVals.cout,
      ajust: machVals.ajust,
    };
    oldCout = machVals.cout;
    oldAjust = machVals.ajust;
  } else {
    INITIAL_FORM_STATE = {
      numDos: "",
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
    numDos: Yup.string().required("Champ obligatoire"),
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

  const dosCopy = JSON.parse(JSON.stringify(dossiers));
  const sitesCopy = JSON.parse(JSON.stringify(sites));

  const handleSubmit = (values, { resetForm }) => {
    const dosInt = values.numDos;
    let newMachs = JSON.parse(JSON.stringify(machineries));
    let machDos = newMachs[dosInt];
    let id;
    const ids = machDos
      .map((fac) => fac.id)
      .sort(function (a, b) {
        return a - b;
      });
    id = ids.length ? ids[ids.length - 1] + 1 : 0;

    const siteToAdd = sites[dosInt].map((site) => site.site)[values.site_con];
    let machId;
    if (edit !== null) {
      machId = idMachEdit;
    } else {
      machId = id;
    }

    const newMach = {
      id: machId,
      code: values.code,
      desc: values.desc,
      type: values.type,
      site_con: siteToAdd,
      maintenance: values.maintenance,
      hrs_fonc: values.hrs_fonc,
      hrs_stat: values.hrs_stat,
      taux_fonc: values.taux_fonc,
      cout: values.cout,
      ajust: values.ajust,
    };

    if (edit === null) {
      machDos.push({ ...newMach });
    } else {
      const otherFacs = machDos.filter((fac) => fac.id !== idMachEdit);
      machDos = [...otherFacs, { ...newMach }].sort((a, b) =>
        a.id >= b.id ? 1 : -1
      );
    }

    Object.keys(newMachs).forEach(function (key, index) {
      if (key === dosInt) {
        newMachs[key] = machDos;
      }
    });
    addMachinerie(newMachs);

    const dosId = values.numDos;
    const siteId = siteToAdd;

    const dosToEdit = dosCopy.find((dossier) => dossier.id === dosId);
    console.log(oldCout);
    const diffMontant = edit === null ? values.cout : values.cout - oldCout;
    const diffAjust = isAdmin ? values.ajust - oldAjust : values.ajust;
    console.log(oldAjust);
    console.log(values.ajust);
    console.log(diffAjust);

    dosToEdit.MR = dosToEdit.MR + diffMontant;
    dosToEdit.MA = dosToEdit.MA - diffAjust;

    const otherDoses = dosCopy.filter((dossier) => dossier.id !== dosId);
    addInfosDossier(
      [...otherDoses, dosToEdit].sort((a, b) => (a.id >= b.id ? 1 : -1))
    );

    if (values.type === "dab") {
      const siteDos = sitesCopy[dosId];
      const siteToEdit = siteDos.find((site) => site.site === siteId);
      const otherSites = siteDos.filter((site) => site.site !== siteId);
      siteToEdit.m_montant_rec = siteToEdit.m_montant_rec + diffMontant;
      siteToEdit.montant_rec = siteToEdit.montant_rec + diffMontant;

      Object.keys(sitesCopy).forEach((item, key) => {
        if (key === dosId) sitesCopy[key] = [...otherSites, siteToEdit];
      });
      addSites(sitesCopy);
    }

    resetForm();
    setMachToEdit(null);
    setEditing(false);
    closeModal();
  };

  const handleClose = () => {
    if (edit !== null) {
      setMachToEdit(null);
    }
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

                    <Grid item xs={12}>
                      <SelectDossier
                        dossiers={dossiers}
                        setValiDate={setValiDate}
                        name="numDos"
                        label="Numéro dossier"
                        options={numDos}
                        disabled={edit !== null}
                      />
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <SelectPrejudice
                          name="type"
                          label="Préjudice"
                          defaultValue=""
                          options={prejudices}
                          dossiers={dossiers}
                          disabled={
                            values.numDos === "" || (edit !== null && !editing)
                          }
                        />
                      </Grid>
                      {values.type === "dab" ? (
                        <Grid item xs={6}>
                          <SelectSites
                            defaultValue=""
                            name="site_con"
                            label="Site concerné"
                            sites={sites}
                            disabled={
                              values.type !== "dab" ||
                              (edit !== null && !editing)
                            }
                          />
                        </Grid>
                      ) : null}
                    </Grid>
                    <Grid item xs={12}>
                      <Textfield
                        disabled={edit !== null && !editing}
                        name="code"
                        label="Code et appelation"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Textfield
                        disabled={edit !== null && !editing}
                        name="desc"
                        multiline
                        rows={4}
                        label="Description"
                      />
                    </Grid>
                    <Typography mt={1}>Heures</Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Textfield
                          disabled={edit !== null && !editing}
                          name="hrs_fonc"
                          label="Heures en fonction"
                          type="number"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Textfield
                          disabled={edit !== null && !editing}
                          name="hrs_stat"
                          label="Heures stationnaire"
                          type="number"
                        />
                      </Grid>
                    </Grid>

                    <Typography mt={1}>Taux</Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Textfield
                          disabled={edit !== null && !editing}
                          name="taux_fonc"
                          label="Taux de fonctionnement"
                          type="number"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Textfield
                          disabled={edit !== null && !editing}
                          name="maintenance"
                          label="Taux de maintenance"
                          type="number"
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
                        disabled={!isAdmin && edit !== null && !editing}
                        variant="contained"
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

const mapDispatchToProps = (dispatch) => ({
  addMachinerie: (newMach) => dispatch(addMachinerie(newMach)),
  addInfosDossier: (newInfos) => dispatch(addInfosDossier(newInfos)),
  addSites: (newSites) => dispatch(addSites(newSites)),
});

export default connect(null, mapDispatchToProps)(MachinerieModalFormDos);
