import { sitesAll } from "./Sites.data";

const INITIAL_STATE = {
  sites: sitesAll,
};

const sitesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_SITES":
      return {
        ...state,
        sites: action.payload,
      };
    default:
      return state;
  }
};

export default sitesReducer;
