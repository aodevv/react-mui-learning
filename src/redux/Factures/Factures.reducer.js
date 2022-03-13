import { facturesAll } from "./Factures.data";

const INITIAL_STATE = {
  factures: facturesAll,
};

const facturesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_FACTURES":
      return {
        ...state,
        factures: action.payload,
      };
    default:
      return state;
  }
};

export default facturesReducer;
