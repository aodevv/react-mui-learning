import { createSelector } from "reselect";

const dossiers = (state) => state.dossiers;

export const selectDossiers = createSelector(
  [dossiers],
  (dossiers) => dossiers.dossiers
);
