import React from "react";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { selectFacturesMemo } from "../../redux/Factures/Factures.selectors";
import { selectSalairesMemo } from "../../redux/Salaires/salaires.selectors";
import { selectMachineriesMemo } from "../../redux/Machineries/machineries.selectors";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import DMTable from "../../Components/Tables/DetailsTables/DMTable";
import { useParams } from "react-router-dom";

import { dabDATA, miDATA, mptDATA } from "./data";

const DossierDetails = ({ salaires, machineries, factures }) => {
  const params = useParams();

  const { dossierId } = params;

  // DAB total calulations
  if (factures.DAB[dossierId]) {
    const facturesTotal = factures.DAB[dossierId].reduce(
      (acc, facture) => acc + facture.montant_rec,
      0
    );
    dabDATA[0].mr = facturesTotal;
  }

  if (salaires.DAB[dossierId]) {
    const salairesTotal = salaires.DAB[dossierId].reduce(
      (acc, salaire) => acc + salaire.montant_rec,
      0
    );
    dabDATA[2].mr = salairesTotal;
  }

  if (machineries.DAB[dossierId]) {
    const machineriesTotal = machineries.DAB[dossierId].reduce(
      (acc, machinerie) => acc + machinerie.cout,
      0
    );
    dabDATA[1].mr = machineriesTotal;
  }

  // MPT totals caclulations
  if (factures.MPT[dossierId]) {
    const facturesTotal = factures.MPT[dossierId].reduce(
      (acc, facture) => acc + facture.montant_rec,
      0
    );
    mptDATA[0].mr = facturesTotal;
  }

  if (salaires.MPT[dossierId]) {
    const salairesTotal = salaires.MPT[dossierId].reduce(
      (acc, salaire) => acc + salaire.montant_rec,
      0
    );
    mptDATA[2].mr = salairesTotal;
  }

  if (machineries.MPT[dossierId]) {
    const machineriesTotal = machineries.MPT[dossierId].reduce(
      (acc, machinerie) => acc + machinerie.cout,
      0
    );
    mptDATA[1].mr = machineriesTotal;
  }

  // MI totals caclulations
  if (factures.MI[dossierId]) {
    const facturesTotal = factures.MI[dossierId].reduce(
      (acc, facture) => acc + facture.montant_rec,
      0
    );
    miDATA[0].mr = facturesTotal;
  }

  if (salaires.MI[dossierId]) {
    const salairesTotal = salaires.MI[dossierId].reduce(
      (acc, salaire) => acc + salaire.montant_rec,
      0
    );
    miDATA[2].mr = salairesTotal;
  }

  if (machineries.MI[dossierId]) {
    const machineriesTotal = machineries.MI[dossierId].reduce(
      (acc, machinerie) => acc + machinerie.cout,
      0
    );
    miDATA[1].mr = machineriesTotal;
  }

  return (
    <Grid>
      <Card>
        <CardHeader
          disableTypography={false}
          titleTypographyProps={{ fontWeight: "bold" }}
          title={`Dossier ${params.dossierId}`}
        />
      </Card>
      <Box mt={2}>
        <Card>
          <CardHeader
            disableTypography={false}
            titleTypographyProps={{ fontSize: 20 }}
            title="Dommage aux bien"
          />
          <CardContent>
            <Box sx={{ height: "calc(100% - 64px)" }}>
              <DMTable
                totals={dabDATA}
                type="dab"
                dossierId={params.dossierId}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box mt={2}>
        <Card>
          <CardHeader
            disableTypography={false}
            titleTypographyProps={{ fontSize: 20 }}
            title="Mesures preventives"
          />
          <CardContent>
            <Box sx={{ height: "calc(100% - 64px)" }}>
              <DMTable
                totals={mptDATA}
                type="mpt"
                dossierId={params.dossierId}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box mt={2}>
        <Card>
          <CardHeader
            disableTypography={false}
            titleTypographyProps={{ fontSize: 20 }}
            title="Mesures d'intervention"
          />
          <CardContent>
            <Box sx={{ height: "calc(100% - 64px)" }}>
              <DMTable totals={miDATA} type="mi" dossierId={params.dossierId} />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  salaires: selectSalairesMemo,
  machineries: selectMachineriesMemo,
  factures: selectFacturesMemo,
});

export default connect(mapStateToProps)(DossierDetails);
