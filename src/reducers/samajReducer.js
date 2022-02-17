import * as types from "../actions/actionTypes";

const initialState = {
  samajs: [],
  mySamaj: [],
  samajDetail: null,
  pinnedPost: null,
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_SAMAJ_LIST:
      return {
        ...state,
        samajs: action.payload,
        isLoading: false,
      };
    case types.GET_MY_SAMAJ_LIST:
      return {
        ...state,
        mySamaj: action.payload,
        isLoading: false,
      };

    case types.GET_SAMAJ_DETAILS:
      return {
        ...state,
        samajDetail: action.payload,
        isLoading: false,
      };

    case types.GET_PINNED_POST:
      return {
        ...state,
        pinnedPost: action.payload,
      };
    case types.SAMAJ_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    // case types.ADD_SAMAJ_POST:
    //   return {
    //     ...state,
    //     posts: {
    //       ...state.posts,
    //       results: state.posts.results.unshift(action.payload)
    //     }
    //   };
    case types.KICK_USER:
      return {
        ...state,
        samajDetail: {
          ...state.samajDetail,
          details: action.payload,
        },
      };
    // case types.LEAVE_SAMAJ:
    //   return {
    //     ...state,
    //     samajDetail: {
    //       details: action.payload
    //     }
    //   };
    case types.JOIN_SAMAJ:
      let tempSamajs = state.samajs.slice();

      let samajIndex = tempSamajs.findIndex(
        (samaj) => samaj.id === action.samajId
      );
      tempSamajs[samajIndex].subscribers.push(action.user);

      let tempSamaj = {};
      if (state.samajDetail) {
        // tempSamaj = state.samajDetail.map(a => ({ ...a }));
        tempSamaj = { ...state.samajDetail };
        tempSamaj.details.subscribers.push(action.user);
      }
      return {
        ...state,
        samajs: [...tempSamajs],
        samajDetail: { ...tempSamaj },
      };
    default:
      return state;
  }
}
