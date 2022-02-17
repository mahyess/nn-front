import * as types from "../actions/actionTypes";

const initialState = {
  posts: {
    count: 0,
    next: null,
    previous: null,
    results: [],
    isLoading: false,
  },
  post: null,
};

export default function (state = initialState, action) {
  let posts = [];
  let post = null;
  switch (action.type) {
    case types.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        post: null,
        isLoading: false,
      };

    case types.GET_POST:
      return {
        ...state,
        post: action.payload,
        isLoading: false,
      };
    case types.GET_NEW_POSTS:
      return {
        ...state,
        posts: action.payload,
        post: null,
        isLoading: false,
      };

    case types.GET_FRIEND_POSTS:
      return {
        ...state,
        posts: action.payload,
        post: null,
        isLoading: false,
      };

    case types.GET_SAMAJ_POSTS:
      return {
        ...state,
        posts: action.payload,
        post: null,
        isLoading: false,
      };

    case types.GET_USER_PROFILE_POSTS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
      };

    case types.GET_USER_COMMUNITY_POSTS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
      };

    case types.GET_USER_TAGGED_POSTS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
      };

    case types.GET_HASH_TAG_POSTS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
      };
    // case types.ADD_POST:
    //   return {
    //     ...state,
    //     posts: [...state.posts, action.payload]
    //   };
    // case types.DELETE_POST:
    //   return {
    //     ...state,
    //     posts: state.posts.filter(post => post.id !== action.payload)
    //   };
    case types.GET_MORE_POSTS:
      const postsCopy = state.posts.results.map((a) => ({ ...a }));
      const newPostsCopy = postsCopy.concat(action.payload.results);

      return {
        ...state,
        posts: {
          ...state.posts,
          results: newPostsCopy,
          next: action.payload.next,
          previous: action.payload.previous,
        },
      };

    case types.MORE_COMMENTS:
      if (state.post && state.post.pid === action.postId) {
        let prevComments = [...state.post.comments];
        state.post.comments = action.payload;
        state.post.comments.results = [
          ...prevComments,
          ...state.post.comments.results,
        ];
      }
      const index = state.posts.results.findIndex(
        (x) => x.pid === action.postId
      );
      // const copyPosts = [...state.posts.results];
      const copyPosts = state.posts.results.map((a) => ({ ...a }));
      const results = copyPosts[index].comments.results.concat(
        action.payload.results
      );
      copyPosts[index].comments.count = action.payload.count;
      copyPosts[index].comments.next = action.payload.next;
      copyPosts[index].comments.previous = action.payload.previous;
      copyPosts[index].comments.results = results;

      return {
        ...state,
        posts: { ...state.posts, results: copyPosts },
      };

    case types.GET_COMMENTS:
      if (action.payload.count === 0) {
        return state;
      } else {
        if (state.post && state.post.pid === action.pid)
          state = {
            ...state,
            post: {
              ...state.post,
              comments: action.payload,
            },
          };
        if (state.posts.results.length > 0) {
          const postIndex = state.posts.results.indexOf(
            state.posts.results.find(
              (post) => post.pid === action.payload.results[0].post.pid
            )
          );

          const changedPosts = state.posts.results.map((a) => ({ ...a }));

          changedPosts[postIndex]["comments"] = action.payload;

          state = {
            ...state,
            posts: { ...state.posts, results: changedPosts },
          };
        }
        return state;
      }

    case types.ADD_COMMENT:
      if (state.posts.results.length > 0)
        state.posts.results.find((post) => post.pid === action.pid)
          .total_comments++;

      if (state.post && state.post.pid === action.pid)
        state.post.total_comments++;

      return {
        ...state,
      };

    case types.ADD_REPLY:
      if (state.posts.results.length > 0) {
        posts = state.posts.results.map((a) => ({ ...a }));

        let postIndex = posts.findIndex((post) => post.pid === action.pid);
        posts[postIndex].comments.results.push(action.payload);
        posts[postIndex].total_comments++;
      }

      if (state.post && state.post.pid === action.pid)
        state.post.total_comments++;

      return {
        ...state,
        posts: {
          ...state.posts,
          results: posts,
        },
      };

    case types.POST_LIKE:
      posts = state.posts.results.map((a) => ({ ...a }));
      if (posts.length > 0) {
        let pIndex = posts.findIndex((post) => post.pid === action.pid);
        let likeIndex = posts[pIndex].likes.indexOf(action.userId);

        if (likeIndex === -1) {
          posts[pIndex].likes.push(action.userId);
          posts[pIndex].total_likes++;
        } else {
          posts[pIndex].likes.splice(likeIndex, 1);
          posts[pIndex].total_likes--;
        }
      }
      if (state.post && action.pid === state.post.pid) {
        post = { ...state.post };
        let likeIndex = post.likes.indexOf(action.userId);

        if (likeIndex === -1) {
          post.likes.push(action.userId);
          post.total_likes++;
        } else {
          post.likes.splice(likeIndex, 1);
          post.total_likes--;
        }
      }
      return {
        ...state,
        posts: { ...state.posts, results: posts },
        post: post,
      };

    case types.ADD_USER_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          count: state.posts.count++,
          results: [action.payload.post, ...state.posts.results],
        },
      };

    case types.CLEAR_POST:
      return {
        ...state,
        post: null,
      };

    case types.CLEAR_POSTS:
      return {
        ...state,
        posts: initialState.posts,
      };
    case types.GET_IS_LOADING:
      return {
        ...state,

        isLoading: true,
      };
    default:
      return state;
  }
}
