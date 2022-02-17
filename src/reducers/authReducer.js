import * as types from "../actions/actionTypes";

const initialState = {
  token: "jwt " + localStorage.getItem("token"),
  user: null,
  activities: [],
  isAuthenticated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.REGISTER_NEW_USER_ACCOUNT:
      return {
        ...state,
        user: [...state.user, action.payload],
      };

    case types.LOGIN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };

    case types.CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case types.LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
        activities: [],
        isAuthenticated: false,
      };

    case types.GET_USER_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    default:
      return state;
  }
}
