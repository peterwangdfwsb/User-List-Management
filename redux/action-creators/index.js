import axios from "axios";
import history from '../../history';



const fetchUsersStart = () => ({ type: "FETCH_USERS_START" });
const fetchUsersSuccess = (data) => ({ type: "FETCH_USERS_SUCCESS", data });
const fetchUsersFail = (error) => ({ type: "FETCH_USERS_FAIL", error });

export const fetchUsers = () => (dispatch) => {
  dispatch(fetchUsersStart());
  axios.get("http://localhost:4000/api/users")
    .then(res => {
      dispatch(fetchUsersSuccess(res.data));
    })
    .catch(err => {
      dispatch(fetchUsersFail(err));
    });
}

const createUserStart = () => ({ type: "CREATE_USER_START" });
const createUserSuccess = (data) => ({ type: "CREATE_USER_SUCCESS", data });
const createUserFail = (error) => ({ type: "CREATE_USER_FAIL", error });

export const createUser = (data) => (dispatch) => {
  dispatch(createUserStart());
  axios.post("http://localhost:4000/api/users", data)
    .then(res => {
      dispatch(createUserSuccess(data));
      history.push('/');
      window.location.reload();
    })
    .catch(err => {
      dispatch(createUserFail(err));
    });
}

const deleteUserStart = () => ({ type: "DELETE_USER_START" });
const deleteUserSuccess = (data) => ({ type: "DELETE_USER_SUCCESS", data });
const deleteUserFail = (error) => ({ type: "DELETE_USER_FAIL", error });

/*export const deleteUsers = (data) => (dispatch) => {
  dispatch(deleteUserStart());
  axios.delete(`http://localhost:4000/api/users/${data}`)
    .then(res => {
      dispatch(deleteUserSuccess(data));
      window.location.reload();
    })
    .catch(err => {
      dispatch(deleteUserFail(err));
    });
}*/

export const deleteUsers = (data) => (dispatch) => {
  dispatch(deleteUserStart());
  axios.delete(`http://localhost:4000/api/users/${data}`)
    .then(res => {
      dispatch(deleteUserSuccess(data));
      axios.get("http://localhost:4000/api/users")
      .then(res => {
        dispatch(fetchUsersSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchUsersFail(err));
      });
    })
    .catch(err => {
      dispatch(deleteUserFail(err));
    });
}

const editUserStart = () => ({ type: "EDIT_USER_START" });
const editUserSuccess = (editData) => ({ type: "EDIT_USER_SUCCESS", editData });
const editUserFail = (error) => ({ type: "EDIT_USER_FAIL", error });

export const editUsers = (editData) => (dispatch) => {
  dispatch(editUserStart());
  axios.put(`http://localhost:4000/api/users/${editData.id}`, editData.data)
    .then(res => {
      dispatch(editUserSuccess(editData));
      history.push('/');
      window.location.reload();
    })
    .catch(err => {
      dispatch(editUserFail(err));
    });
}


