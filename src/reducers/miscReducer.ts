import * as types from "../actions/actionTypes";

const initialState = {
  page: "login",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_AUTH_PAGE:
      return {
        page: action.payload,
      };

    default:
      return state;
  }
}
