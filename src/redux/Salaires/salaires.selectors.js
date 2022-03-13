import { createSelector } from "reselect";

export const selectSalaires = (state) => state.salaires;

export const selectSalairesMemo = createSelector(
  [selectSalaires],
  (salaires) => salaires.salaires
);
