import { facturesDABData } from "./Factures.data";
import { facturesMPTData } from "./Factures.data";
import { facturesMIData } from "./Factures.data";
import { allFactures } from "./Factures.data";

const INITIAL_STATE = {
  DAB: facturesDABData,
  MPT: facturesMPTData,
  MI: facturesMIData,
  all: allFactures,
};

const facturesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_FACTURE_DAB":
      return {
        ...state,
        DAB: action.payload,
      };
    case "ADD_FACTURE_MPT":
      return {
        ...state,
        MPT: action.payload,
      };
    case "ADD_FACTURE_MI":
      return {
        ...state,
        MI: action.payload,
      };
    default:
      return state;
  }
};

export default facturesReducer;
