const initState = { isLoading: false, data: null, error: null };

const deleteUser = (state = initState, action) => {
  switch(action.type) {
    case "DELETE_USERS_START":
      return {
        ...state,
        isLoading: true
      };
    case "DELETE_USERS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.data,
        error: null
      }
    case "DELETE_USERS_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state;
  }
};

export default deleteUser;