import { dabsData } from "./DAB.data";

const INITIAL_STATE = {
  dabs: dabsData,
};

const DABReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_DAB":
      return {
        ...state,
        dabs: action.payload,
      };
    default:
      return state;
  }
};

export default DABReducer;
