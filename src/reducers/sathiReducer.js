import { act } from "react-dom/test-utils";
import * as types from "../actions/actionTypes";
import { addOrReplaceSathi } from "../utils/addOrReplace";

const initialState = {
  sathiLists: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },

  sathi: {},
  requests: {
    incoming: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    outgoing: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
  },
  suggestedFriends: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_SATHI_LISTS:
      return {
        ...state,
        sathiLists: action.payload,
        isLoading: false,
      };
    case types.GET_MORE_SATHILISTS:
      return {
        ...state,
        sathiLists: {
          ...state.sathiLists,
          results: [...state.sathiLists.results, ...action.payload.results],
          next: action.payload.next,
          previous: action.payload.previous,
        },
        isLoading: false,
      };

    case types.GET_SATHI_PROFILE:
      return {
        ...state,
        sathi: action.payload,
        isLoading: false,
      };

    case types.ACCEPT_FRIEND_REQUEST:
      return {
        ...state,
        sathi: { ...state.sathi, is_friend: true },
        requests: {
          ...state.requests,
          incoming: {
            ...state.requests.incoming,
            count: --state.requests.incoming.count,
            results: state.requests.incoming.results.map((request) =>
              request.uid === action.payload.uid
                ? { ...action.payload, requestAccepted: true }
                : request
            ),
          },
        },
      };

    case types.CANCEL_INCOMING_REQUEST:
      return {
        ...state,
        requests: {
          ...state.requests,
          incoming: {
            ...state.requests.incoming,
            results: state.requests.incoming.results.map((sathi) =>
              sathi.uid === action.payload.uid
                ? { ...sathi, cancelledRequest: true }
                : sathi
            ),
            count: state.requests.incoming--,
          },
        },
        suggestedFriends: {
          ...state.suggestedFriends,
          results: state.suggestedFriends.results.map((sathi) =>
            sathi.uid === action.payload.uid
              ? { ...action.payload, cancelledRequest: true }
              : sathi
          ),
        },
        isLoading: false,
      };

    case types.UNFRIEND:
      if (action.uid === state.sathi.uid)
        return {
          ...state,
          sathi: { ...state.sathi, is_friend: false },
        };
      return state;

    case types.GET_INCOMING_REQUESTS:
      return {
        ...state,
        requests: {
          ...state.requests,
          incoming: action.payload,
        },
        isLoading: false,
      };

    case types.GET_SUGGESTION_FRIENDS:
      return {
        ...state,
        suggestedFriends: action.payload,
        isLoading: false,
      };

    case types.GET_MORE_SUGGESTED_FRIENDS:
      return {
        ...state,
        suggestedFriends: {
          ...state.suggestedFriends,
          results: [
            ...state.suggestedFriends.results,
            ...action.payload.results,
          ],
          next: action.payload.next,
          previous: action.payload.previous,
        },
        isLoading: false,
      };
    case types.GET_OUTGOING_REQUESTS:
      return {
        ...state,
        requests: {
          ...state.requests,
          outgoing: action.payload,
        },
        isLoading: false,
      };
    case types.REMOVE_FRIEND_REQUEST:
      return {
        ...state,
        requests: {
          ...state.requests,
          outgoing: {
            ...state.requests.outgoing,
            results: state.requests.outgoing.results.map((sathi) =>
              sathi.uid === action.payload.uid
                ? { ...sathi, cancelledRequest: true }
                : sathi
            ),
            count: state.requests.outgoing--,
          },
        },
        suggestedFriends: {
          ...state.suggestedFriends,
          results: state.suggestedFriends.results.map((sathi) =>
            sathi.uid === action.payload.uid
              ? { ...action.payload, cancelledRequest: true }
              : sathi
          ),
        },
        isLoading: false,
      };
    case types.ADD_FRIEND_REQUEST:
      let outgoingRequests = state.requests.outgoing.results;
      return {
        ...state,
        requests: {
          ...state.requests,
          outgoing: {
            ...state.requests.outgoing,
            count: state.requests.outgoing.count++,
            results: addOrReplaceSathi(state.requests.outgoing.results, {
              ...action.payload,
              created_at: Date.now(),
            }),
            // [
            //   ...state.requests.outgoing.results,
            //   { ...action.payload, created_at: Date.now() },
            // ],
          },
        },
        suggestedFriends: {
          ...state.suggestedFriends,
          results: state.suggestedFriends.results.map((user) =>
            user.uid === action.payload.uid
              ? { ...user, requestSent: true }
              : user
          ),
        },
      };
    case types.SATHI_IS_LOADING:
      return {
        ...state,

        isLoading: true,
      };

    default:
      return state;
  }
}
