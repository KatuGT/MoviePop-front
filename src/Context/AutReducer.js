const AutReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        usuario: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        usuario: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAIL":
      return {
        usuario: null,
        isFetching: false,
        error: true,
      };

    default:
      return state ;
  }
};

export default AutReducer
