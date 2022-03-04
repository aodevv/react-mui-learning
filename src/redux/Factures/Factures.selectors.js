import { createSelector } from "reselect";

export const selectFactures = (state) => state.factures;

export const selectFacturesMemo = createSelector(
  [selectFactures],
  (factures) => factures
);

export const selectDABFactures = createSelector(
  [selectFactures],
  (factures) => factures.DAB
);

export const selectMPTFactures = createSelector(
  [selectFactures],
  (factures) => factures.MPT
);

export const selectMIFactures = createSelector(
  [selectFactures],
  (factures) => factures.MI
);
