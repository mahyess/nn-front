import axios from "axios"
import {
   GET_USER_POSTS,
   CLEAR_POSTS,
   GET_USER_PROFILE_POSTS,
   GET_USER_TAGGED_POSTS,
   GET_SATHI_PROFILE,
   GET_ERRORS,
   GET_IS_LOADING,
   GET_USER_GALLERY,
} from "./actionTypes"
import { isAuth } from "./authActions"

export const fetchUserPosts = ( uid ) => ( dispatch ) => {
   dispatch( {
      type: GET_IS_LOADING,
   } )
   dispatch( {
      type: CLEAR_POSTS,
   } )
   axios
   .get( `/api/user/${ uid }/get-user-posts/` )
   .then( ( res ) => {
      dispatch( {
         type: GET_USER_POSTS,
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

export const fetchUserDetails = ( username ) => ( dispatch ) => {
   dispatch( {
      type: GET_IS_LOADING,
   } )
   dispatch( {
      type: CLEAR_POSTS,
   } )
   axios
   .get( `/api/user/${ username }/get-user-details/` )
   .then( ( res ) => {
      dispatch( {
         type: GET_SATHI_PROFILE,
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

export const getUserTaggedPosts = ( dispatch ) => {
   dispatch( {
      type: GET_IS_LOADING,
   } )
   dispatch( {
      type: CLEAR_POSTS,
   } )
   axios
   .get( `/api/community/posts/get-user-tagged-posts/` )
   .then( ( res ) => {
      dispatch( {
         type: GET_USER_TAGGED_POSTS,
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

export const getUserPosts = ( username, source ) => ( dispatch ) => {
   dispatch( {
      type: GET_IS_LOADING,
   } )
   dispatch( {
      type: CLEAR_POSTS,
   } )
   axios
   .get( `/api/posts/user/${ username }/?source=${ source }` )
   .then( ( res ) => {
      dispatch( {
         type: GET_USER_PROFILE_POSTS,
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

export const updateUserProfile = ( formData, username ) => ( dispatch ) => {
   axios
   .post( "/api/user/profile/edit-profile/", formData )
   .then( ( res ) => {
      dispatch( isAuth() )
      dispatch( fetchUserDetails( username ) )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: GET_ERRORS,
         payload: err.response,
      } )
   } )
}

export const updateCoverPicture = ( formData ) => ( dispatch ) => {
   axios
   .post( "/api/user/profile/change-cover/", formData )
   .then( ( _ ) => {
      dispatch( isAuth() )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: GET_ERRORS,
         payload: err.response,
      } )
   } )
}

export const updateAvatarPicture = ( formData ) => ( dispatch ) => {
   axios
   .post( "/api/user/profile/change-avatar/", formData )
   .then( ( _ ) => {
      dispatch( isAuth() )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: GET_ERRORS,
         payload: err.response,
      } )
   } )
}

export const blockUser = ( uid ) => ( dispatch ) => {
   axios
   .post( "/api/user/block-user/", uid )
   .then( ( res ) => {
      dispatch( {} )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: GET_ERRORS,
         payload: err.response,
      } )
   } )
}

export const getUserGallery = ( username ) => ( dispatch ) => {
   axios
   .get( `/api/user/${ username }/gallery/` )
   .then( ( res ) => {
      dispatch( {
         type: GET_USER_GALLERY,
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
