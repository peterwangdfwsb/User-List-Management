const initState = { isLoading: false, data: null, error: null };

const createUser = (state = initState, action) => {
  switch(action.type) {
    case "CREATE_USERS_START":
      return {
        ...state,
        isLoading: true
      };
    case "CREATE_USERS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.data,
        error: null
      }
    case "CREATE_USERS_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state;
  }
};

export default createUser;