import { dossierAll } from "./infosDossier.data";

const INITIAL_STATE = {
  dossiers: dossierAll,
};

const infosDossierReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_DOSSIER":
      return {
        ...state,
        dossiers: action.payload,
      };
    default:
      return state;
  }
};

export default infosDossierReducer;
