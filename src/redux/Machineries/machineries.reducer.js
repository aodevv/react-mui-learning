import { machineriesDABData } from "./machineries.data";
import { machineriesMPTData } from "./machineries.data";
import { machineriesMIData } from "./machineries.data";

const INITIAL_STATE = {
  DAB: machineriesDABData,
  MPT: machineriesMPTData,
  MI: machineriesMIData,
};

const machineriesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_MACHINERIES_DAB":
      return {
        ...state,
        DAB: action.payload,
      };
    case "ADD_MACHINERIES_MPT":
      return {
        ...state,
        MPT: action.payload,
      };
    case "ADD_MACHINERIES_MI":
      return {
        ...state,
        MI: action.payload,
      };
    default:
      return state;
  }
};

export default machineriesReducer;
