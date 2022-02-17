import * as types from "../actions/actionTypes";

const initialState = {
  q: "",
  posts: {},
  users: {},
  samajs: {},
  results: {},
  value: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SEARCH:
      let searchResults = action.payload;
      Object.keys(searchResults).forEach((category) => {
        state.results[category] = {
          name: category,
          results: searchResults[category].results,
        };

        if (Array.isArray(state.results[category].results)) {
          // for (let i = 0; i < state.results[category].results.length; i++) {
          //   if (state.results[category].results[i]["id"]) {
          //     state.results[category].results[i]["_id"] =
          //       state.results[category].results[i]["id"];
          //   } else break;
          // }
          state.results[category].results.forEach(
            (o, i, a) => (a[i]["_id"] = a[i]["id"])
          );
        }
      });
      state.value = state.q;
      delete state.results["q"];
      // delete state.results["samajs"];

      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
