import { createSelector } from "reselect";

export const selectMachineries = (state) => state.machineries;

export const selectMachineriesMemo = createSelector(
  [selectMachineries],
  (machineries) => machineries.machineries
);
