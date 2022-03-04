import { createSelector } from "reselect";

const DAB = (state) => state.dabs;

export const selectDABs = createSelector([DAB], (DAB) => DAB.dabs);
