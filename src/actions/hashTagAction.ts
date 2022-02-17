import {
   GET_HASH_TAG_LISTS,
   GET_HASH_TAG_POSTS,
   CLEAR_POSTS,
   GET_ERRORS,
   GET_IS_LOADING,
} from "../actions/actionTypes"
import axios from "axios"

export const getHashTagLists = () => ( dispatch ) => {
   dispatch( {
      type: GET_IS_LOADING,
   } )
   dispatch( {
      type: CLEAR_POSTS,
   } )
   axios

   .get( `/api/hashtags/` )
   .then( ( res ) => {
      dispatch( {
         type: GET_HASH_TAG_LISTS,
         payload: res.data,
      } )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: GET_ERRORS,
         payload: err.response,
      } )
   } )
}

export const getHashTagPosts = ( hashtag ) => ( dispatch ) => {
   dispatch( {
      type: GET_IS_LOADING,
   } )
   dispatch( {
      type: CLEAR_POSTS,
   } )
   axios

   .get( `/api/posts/hashtag/${ hashtag }/` )
   .then( ( res ) => {
      dispatch( {
         type: GET_HASH_TAG_POSTS,
         payload: res.data,
      } )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: GET_ERRORS,
         payload: err.response,
      } )
   } )
}
