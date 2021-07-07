const initState = { id: null, isLoading: false, data: {}, error: null };

const editUser = (state = initState, action) => {
  switch(action.type) {
    case "EDIT_USERS_START":
      return {
        ...state,
        isLoading: true
      };
    case "EDIT_USERS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.data,
        error: null
      }
    case "EDIT_USERS_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state;
  }
};

export default editUser;