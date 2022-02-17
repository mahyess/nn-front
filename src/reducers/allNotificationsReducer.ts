import * as types from "../actions/actionTypes";

const initialState = {
  allNotifications: [],

  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_All_NOTIFICATIONS:
      return {
        ...state,
        allNotifications: action.payload,

        isLoading: false,
      };

    default:
      return state;
  }
}
