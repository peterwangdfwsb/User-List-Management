
import { combineReducers} from "redux";

import userList from "./user-list";
import createUser from "./create-user";
import deleteUser from "./delete-user";
import editUser from "./edit-user";


export default combineReducers({
  userList,
  createUser,
  deleteUser,
  editUser
});