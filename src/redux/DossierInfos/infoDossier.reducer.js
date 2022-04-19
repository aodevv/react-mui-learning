import { dossierAll, facturesAll } from "./infosDossier.data";

const INITIAL_STATE = {
  dossiers: dossierAll,
  factures: facturesAll,
  population: 10000,
};

const infosDossierReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_DOSSIER":
      return {
        ...state,
        dossiers: action.payload,
      };
    case "ADD_FACTURES":
      return {
        ...state,
        factures: action.payload,
      };
    case "SET_POP":
      return {
        ...state,
        population: action.payload,
      };
    default:
      return state;
  }
};

export default infosDossierReducer;
