import { createSelector } from "reselect";

export const selectFactures = (state) => state.factures;

export const selectFacturesMemo = createSelector(
  [selectFactures],
  (factures) => factures.factures
);
