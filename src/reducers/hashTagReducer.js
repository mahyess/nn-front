import * as types from "../actions/actionTypes";

const initialState = {
  hashTagLists: [],
  hashTag: {},
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_HASH_TAG_LISTS:
      return {
        ...state,
        hashTagLists: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
