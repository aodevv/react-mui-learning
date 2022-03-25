import { createSelector } from "reselect";

const auth = (state) => state.auth;

export const selectAuth = createSelector([auth], (auth) => auth.isLoggedIn);
