import React from "react";

import { Box, Button, IconButton } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import CloseIcon from "@mui/icons-material/Close";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const data = {
  Nom: "Quebec",
  Adresse: "10 Rue Pierre-Olivier-Chauveau",
  Ville: "Quebec",
  "Code Postal": "23027",
  MRC: "-------",
  Region: "Centre",
  "Richesse Foncière uniformisé": "-------",
  Contact: "+1 418-651-9890",
  Fonction: "-------",
  "Numéro de téléphone": "+1 418-651-9890",
  "Numéro de télécopieur": "+1 418-651-9890",
  "Adresse courriellle": "10 Rue Pierre-Olivier-Chauveau",
  "Taux de la C.S.S.T": "2.5%",
  "Taux réduit d'assurance d'emploi": "-------",
};

const InfosModal = ({ closeModal }) => {
  return (
    <>
      <Box position="relative" pt={3}>
        <Box position="absolute" top={-30} right={-10}>
          <IconButton
            aria-label="delete"
            color="default"
            size="large"
            onClick={closeModal}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Box
          sx={{
            overflowY: "scroll",
            height: 500,
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableBody>
                {Object.keys(data).map((key) => (
                  <TableRow
                    key={key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <b>{key}</b>
                    </TableCell>
                    <TableCell>{data[key]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default InfosModal;
