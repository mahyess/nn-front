import * as types from "../actions/actionTypes";

const initialState = {
  groupChatList: [],
  messageSathiLists: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_GROUP_CHAT:
      return {
        ...state,
        groupChatList: action.payload,
        // isLoading: false
      };

    case types.GET_MESSAGE_SATHI:
      return {
        ...state,
        messageSathiLists: action.payload,
      };
    default:
      return state;
  }
}
