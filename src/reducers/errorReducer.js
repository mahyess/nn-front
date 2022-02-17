import * as types from "../actions/actionTypes";

const initialState = {
  data: [],
  status: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CLEAR_ERRORS:
      return initialState;

    case types.GET_ERRORS:
      return {
        data: action.payload,
        status: action.payload,
      };

    default:
      return state;
  }
}
