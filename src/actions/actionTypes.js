import { $CombinedState } from "redux";

// post
export const GET_POSTS = "GET_POSTS";
export const GET_NEW_POSTS = "GET_NEW_POSTS";
export const GET_FRIEND_POSTS = "GET_FRIEND_POSTS";
export const GET_MORE_POSTS = "GET_MORE_POSTS";
export const CLEAR_POSTS = "CLEAR_POSTS";
export const CLEAR_POST = "CLEAR_POST";
export const ADD_SAMAJ_POST = "ADD_SAMAJ_POST";
export const ADD_USER_POST = "ADD_USER_POST";

// comments
export const GET_COMMENTS = "GET_COMMENTS";
export const MORE_COMMENTS = "MORE_COMMENTS";

// comments vote
export const COMMENT_UPVOTE = "COMMENT_UPVOTE";
export const COMMENT_DOWNVOTE = "COMMENT_DOWNVOTE";

// auth
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REGISTER_NEW_USER_ACCOUNT = "REGISTER_NEW_USER_ACCOUNT";

// user
export const CURRENT_USER = "CURRENT_USER";
export const GET_USER_ACTIVITIES = "GET_USER_ACTIVITIES";
export const GET_POST = "GET_POST";

// samaj
export const GET_SAMAJ_LIST = "GET_SAMAJ_LIST";
export const GET_MY_SAMAJ_LIST = "GET_MY_SAMAJ_LIST";
export const JOIN_SAMAJ = "JOIN_SAMAJ";
export const LEAVE_SAMAJ = "LEAVE_SAMAJ";

export const GET_SAMAJ_DETAILS = "GET_SAMAJ_DETAILS";
export const GET_SAMAJ_POSTS = "GET_SAMAJ_POSTS";

export const GET_PINNED_POST = "GET_PINNED_POST";
export const SAMAJ_LOADING = "SAMAJ_LOADING";

// errors
export const GET_ERRORS = "GET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

// profile
export const GET_USER_PROFILE = "GET_USER_PROFILE";
export const GET_USER_DETAILS = "GET_USER_DETAILS";
export const GET_USER_POSTS = "GET_USER_POSTS";
export const GET_USER_PROFILE_POSTS = "GET_USER_PROFILE_POSTS";
export const GET_USER_COMMUNITY_POSTS = "GET_USER_COMMUNITY_POSTS";
export const GET_USER_TAGGED_POSTS = "GET_USER_TAGGED_POSTS";

// sathi
export const GET_SATHI_LISTS = "GET_SATHI_LISTS";
export const GET_SATHI_PROFILE = "GET_SATHI_PROFILE";

//Hash Tag
export const GET_HASH_TAG_LISTS = "GET_HASH_TAG_LISTS";
export const GET_HASH_TAG_POSTS = "GET_HASH_TAG_POSTS";

// Get All Notificatiions//
export const GET_All_NOTIFICATIONS = "GET_All_NOTIFICATIONS";

//ADD COMMENT
export const ADD_COMMENT = "ADD_COMMENT";
export const ADD_REPLY = "ADD_REPLY";

//Post Like

export const POST_LIKE = "POST_LIKE";

// KICK USER
export const KICK_USER = "KICK_USER";

// Freiend Request
export const FRIEND_REQUESTS_COUNT = "FRIEND_REQUESTS_COUNT";
export const GET_SUGGESTION_FRIENDS = "GET_SUGGESTION_FRIENDS";
export const ADD_FRIEND_REQUEST = "ADD_FRIEND_REQUEST";
export const REMOVE_FRIEND_REQUEST = "REMOVE_FRIEND_REQUEST";
export const ACCEPT_FRIEND_REQUEST = "ACCEPT_FRIEND_REQUEST";
export const GET_INCOMING_REQUESTS = "GET_INCOMING_REQUESTS";
export const GET_OUTGOING_REQUESTS = "GET_OUTGOING_REQUESTS";
export const CANCEL_INCOMING_REQUEST = "CANCEL_INCOMING_REQUEST";
export const CANCEL_OUTGOING_REQUEST = "CANCEL_OUTGOING_REQUEST";
export const GET_MORE_SUGGESTED_FRIENDS = "GET_MORE_SUGGESTED_FRIENDS";
export const GET_MORE_SATHILISTS = "GET_MORE_SATHILISTS";

// Unfriend
export const UNFRIEND = "UNFRIEND";
//Message
export const GET_MESSAGE_SATHI = "GET_MESSAGE_SATHI";
export const GET_GROUP_CHAT = "GET_GROUP_CHAT";

//login state
export const CHANGE_AUTH_PAGE = "CHANGE_AUTH_PAGE";

// search
export const SEARCH = "SEARCH";
// export const SEARCH_POSTS = "SEARCH_POSTS";
// export const SEARCH_USERS = "SEARCH_USERS";
// export const SEARCH_SAMAJS = "SEARCH_SAMAJS";

//Post Loading
export const GET_IS_LOADING = "GET_IS_LOADING";
//sathi Loading
export const SATHI_IS_LOADING = "SATHI_IS_LOADING";

//Galllery
export const GET_USER_GALLERY = "GET_USER_GALLERY";
