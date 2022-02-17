import * as types from "./actionTypes"
import axios from "axios"
import { authHeader } from "../authHeader"

var headers = authHeader()

export const getPosts = ( order_by ) => ( dispatch ) => {
   dispatch( {
      type: types.CLEAR_POSTS,
   } )
   dispatch( {
      type: types.GET_IS_LOADING,
   } )
   axios
   .get( `/api/posts/?order_by=${ order_by }` )
   .then( ( res ) => {
      dispatch( {
         type: types.GET_POSTS,
         payload: res.data,
      } )
   } )
   .catch( ( err ) => {

      dispatch( {
         type: types.GET_ERRORS,
         payload: err.response,
      } )
   } )
}

export const getMorePosts = ( url ) => ( dispatch ) => {
   axios
   .get( url )
   .then( ( res ) => {
      dispatch( {
         type: types.GET_MORE_POSTS,
         payload: res.data,
      } )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: types.GET_ERRORS,
         payload: err.response,
      } )
   } )
}

export const getFriendPosts = () => ( dispatch ) => {
   dispatch( {
      type: types.GET_IS_LOADING,
   } )
   dispatch( {
      type: types.CLEAR_POSTS,
   } )

   axios
   .get( "/api/posts/friends/" )
   .then( ( res ) => {
      dispatch( {
         type: types.GET_FRIEND_POSTS,
         payload: res.data,
      } )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: types.GET_ERRORS,
         payload: err.response,
      } )
   } )
}

export const getPost = ( slug ) => ( dispatch ) => {
   dispatch( {
      type: types.CLEAR_POST,
   } )
   axios
   .get( `/api/posts/${ slug }/details/` )
   .then( ( res ) => {
      dispatch( {
         type: types.GET_POST,
         payload: res.data,
      } )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: types.GET_ERRORS,
         payload: err.response.data,
      } )
   } )
}

// export const addComment = pid => dispatch => {
//   axios
//     .post(`/api/community/post/${pid}/fetch-comments/`)
//     .then(res => {
//       dispatch({
//         type: types.ADD_COMMENT,
//         payload: res.data,
//         pid: pid
//       });
//     })
//     .catch(err => console.log(err));
// };

export const addReplyComment = ( pid, comment, parentId ) => ( dispatch ) => {
   const addCommentData = new FormData()
   addCommentData.append( "comment", comment )
   addCommentData.append( "parent", parentId )

   axios
   .post( `/api/posts/${ pid }/comments/`, addCommentData )
   .then( ( res ) => {
      dispatch( {
         type: types.ADD_REPLY,
         payload: res.data.comment,
         pid: pid,
         parentCommentId: res.data.comment.parent,
      } )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: types.GET_ERRORS,
         payload: err.response.data,
      } )
   } )
}

export const postLike = ( pid, userId ) => ( dispatch ) => {
   axios
   .post( `/api/posts/${ pid }/like/`, { headers: headers } )
   .then( ( _ ) => {
      dispatch( {
         type: types.POST_LIKE,
         pid: pid,
         userId: userId,
      } )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: types.GET_ERRORS,
         payload: err.response.data,
      } )
   } )
}

export const addPost = ( formData ) => ( dispatch ) => {
   axios
   .post(
      "/api/posts/",
      formData,
   )
   .then( ( res ) => {
      dispatch( {
         type: types.ADD_USER_POST,
         payload: res.data,
      } )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: types.GET_ERRORS,
         payload: err.response,
      } )
   } )
}

export const clearPost = () => ( dispatch ) => {
   dispatch( {
      type: types.CLEAR_POST,
   } )
}
