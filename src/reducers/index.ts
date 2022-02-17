import { combineReducers } from "redux";
import postReducer from "./postReducer";
import samajReducer from "./samajReducer";
import authReducer from "./authReducer";
import sathiReducer from "../reducers/sathiReducer";
import hashTagReducer from "./hashTagReducer";
import errorReducer from "../reducers/errorReducer";
import messageReducer from "./messageReducer";
import miscReducer from "./miscReducer";
import searchReducer from "./searchReducer";
import allNotifications from "./allNotificationsReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  posts: postReducer,
  samaj: samajReducer,
  auth: authReducer,
  sathi: sathiReducer,
  errors: errorReducer,
  hash: hashTagReducer,
  message: messageReducer,
  misc: miscReducer,
  search: searchReducer,
  notifications: allNotifications,
  profile: profileReducer,
});
