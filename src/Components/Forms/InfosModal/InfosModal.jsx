import React, { useState } from "react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectInfos } from "../../../redux/DossierInfos/infosDossier.selectors";
import { addInfosMuni } from "../../../redux/DossierInfos/infosDossier.actions";

import { Box, Button, IconButton, Stack } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import TextField from "@mui/material/TextField";
import Submit from "../../../Components/FormUI/Submit";

import Textfield from "../../../Components/FormUI/Textfield";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

const data = {
  nom: "Quebec",
  adress: "10 Rue Pierre-Olivier-Chauveau",
  ville: "Quebec",
  code_pos: "23027",
  mrc: "-------",
  region: "Centre",
  rfu: "-------",
  contact: "+1 418-651-9890",
  fct: "-------",
  num_telph: "+1 418-651-9890",
  num_telcop: "+1 418-651-9890",
  adress_cour: "10 Rue Pierre-Olivier-Chauveau",
  taux_csst: 2.5,
  taux_ae: "-------",
};

const dataKeys = {
  nom: "Nom",
  adress: "Adress",
  ville: "Ville",
  code_pos: "Code Postal",
  mrc: "MRC",
  region: "Region",
  rfu: "Richesse Foncière uniformisé",
  contact: "Contact",
  fct: "Fonction",
  num_telph: "Numéro de téléphone",
  num_telcop: "Numéro de télécopieur",
  adress_cour: "Adresse courriellle",
  taux_csst: "Taux de la C.S.S.T",
  taux_ae: "Taux réduit d'assurance d'emploi",
};

const InfosModal = ({ closeModal, username, infos, addInfosMuni }) => {
  const [editing, setEditing] = useState(false);

  const INITIAL_FORM_STATE = {
    ...infos,
  };

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleSubmit = (values) => {
    addInfosMuni(values);
    setEditing(false);
  };

  return (
    <>
      <Formik initialValues={{ ...INITIAL_FORM_STATE }} onSubmit={handleSubmit}>
        {(formikProps) => {
          const { values, isValid } = formikProps;

          return (
            <Form>
              <Box position="relative" pt={5}>
                <Box position="absolute" top={-15} left={0}>
                  <IconButton
                    aria-label="delete"
                    color="default"
                    size="medium"
                    onClick={closeModal}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                </Box>
                {username === "admin" ? (
                  <Box position="absolute" top={-15} right={-5}>
                    <IconButton
                      aria-label="delete"
                      size="medium"
                      color={editing ? "primary" : "default"}
                      onClick={handleEdit}
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                ) : null}

                <Box
                  sx={{
                    overflowY: "scroll",
                    height: 500,
                  }}
                >
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 400 }} aria-label="simple table">
                      <TableBody>
                        {Object.keys(infos).map((key) => (
                          <TableRow
                            key={key}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              <b>{dataKeys[key]}</b>
                            </TableCell>
                            <TableCell>
                              {editing ? (
                                <Textfield
                                  name={key}
                                  label={dataKeys[key]}
                                  type={key === "taux_csst" ? "number" : null}
                                />
                              ) : (
                                infos[key]
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                {username === "admin" ? (
                  <Stack direction="row-reverse" spacing={1} mt={2}>
                    <Submit
                      variant="contained"
                      size="small"
                      disabled={!editing}
                    >
                      Modifier
                    </Submit>
                    <Button
                      onClick={() => setEditing(false)}
                      size="small"
                      startIcon={<CloseIcon />}
                      disabled={!editing}
                    >
                      Annuler
                    </Button>
                  </Stack>
                ) : null}
              </Box>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  infos: selectInfos,
});

const mapDispatchToProps = (dispatch) => ({
  addInfosMuni: (newInfos) => dispatch(addInfosMuni(newInfos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InfosModal);
