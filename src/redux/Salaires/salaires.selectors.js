import { createSelector } from "reselect";

export const selectSalaires = (state) => state.salaires;

export const selectSalairesMemo = createSelector(
  [selectSalaires],
  (salaires) => salaires.salaires
);

export const selectPayroll = createSelector(
  [selectSalaires],
  (salaires) => salaires.payroll
);
