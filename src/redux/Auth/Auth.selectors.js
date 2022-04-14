import { createSelector } from "reselect";

const auth = (state) => state.auth;

export const selectAuth = createSelector([auth], (auth) => auth.isLoggedIn);
export const selectUsername = createSelector([auth], (auth) => auth.username);
