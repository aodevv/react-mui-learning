import { machineriesAll } from "./machineries.data";

const INITIAL_STATE = {
  machineries: machineriesAll,
};

const machineriesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_MACHINERIE":
      return {
        ...state,
        machineries: action.payload,
      };
    default:
      return state;
  }
};

export default machineriesReducer;
