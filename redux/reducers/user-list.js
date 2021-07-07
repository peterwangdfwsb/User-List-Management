const initState = { isLoading: false, data: [], error: null };

const userList = (state = initState, action) => {
  switch(action.type) {
    case "FETCH_USERS_START":
      return {
        ...state,
        isLoading: true
      };
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.data,
        error: null
      }
    case "FETCH_USERS_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state;
  }
};

export default userList;
