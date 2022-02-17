import * as types from "../actions/actionTypes";

const initialState = {
    gallery: [],

};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_USER_GALLERY:
      return {
        ...state,
        gallery: action.payload,
      };

    default:
      return state;
  }
}
