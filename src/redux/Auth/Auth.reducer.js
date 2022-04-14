const INITIAL_STATE = {
  isLoggedIn: false,
  username: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload,
      };
    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
        username: null,
      };
    default:
      return state;
  }
};

export default authReducer;
