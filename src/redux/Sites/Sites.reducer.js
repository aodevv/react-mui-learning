import { sitesAll, sitesList } from "./Sites.data";

const INITIAL_STATE = {
  sites: sitesAll,
  sitesList: sitesList,
};

const sitesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_SITES":
      return {
        ...state,
        sites: action.payload,
      };
    case "ADD_SITES_TO_LIST":
      return {
        ...state,
        sitesList: action.payload,
      };
    default:
      return state;
  }
};

export default sitesReducer;
