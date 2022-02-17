import * as types from "./actionTypes"

import axios from "axios"
import { clearUserFriendStatus } from "../utils/clearUserFriendStatus"

export const getSathiLists = () => ( dispatch ) => {
   dispatch( {
      type: types.SATHI_IS_LOADING,
   } )
   axios
   .get( "/api/user/friends-list/" )
   .then( ( res ) => {
      dispatch( {
         type: types.GET_SATHI_LISTS,
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

export const getSathiProfile = ( username ) => ( dispatch ) => {
   axios

   .get( `/api/user/${ username }/get-user-details/` )
   .then( ( res ) => {
      dispatch( {
         type: types.GET_SATHI_PROFILE,
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

export const unFriend = ( uid ) => ( dispatch ) => {
   let formData = new FormData()
   formData.append( "uid", uid )
   axios
   .post( "/api/user/friend/unfriend/", formData )
   .then( ( res ) => {
      dispatch( {
         type: types.UNFRIEND,
         uid: uid,
      } )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: types.GET_ERRORS,
         payload: err.response,
      } )
   } )
}

export const sendFriendRequest = ( user ) => ( dispatch ) => {
   dispatch( {
      type: types.GET_IS_LOADING,
   } )
   let formData = new FormData()
   formData.append( "to_user", user.username )

   axios
   .post( "/api/user/send-friend-request/", formData )
   .then( ( res ) => {
      dispatch( {
         type: types.ADD_FRIEND_REQUEST,
         payload: clearUserFriendStatus( user ),
      } )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: types.GET_ERRORS,
         payload: err.response,
      } )
   } )
}

export const fetchIncomingRequests = () => ( dispatch ) => {
   dispatch( {
      type: types.SATHI_IS_LOADING,
   } )
   axios
   .get( "/api/user/friend-requests/" )
   .then( ( res ) => {
      dispatch( {
         type: types.GET_INCOMING_REQUESTS,
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

export const fetchOutgoingRequests = () => ( dispatch ) => {
   dispatch( {
      type: types.SATHI_IS_LOADING,
   } )
   axios
   .get( "/api/user/friend-requests/sent/" )
   .then( ( res ) => {
      dispatch( {
         type: types.GET_OUTGOING_REQUESTS,
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

export const acceptIncomingRequest = ( user ) => ( dispatch ) => {
   const formData = new FormData()
   formData.append( "from_user", user.username )
   axios
   .post( "/api/user/friend-requests/", formData )
   .then( ( res ) => {
      dispatch( {
         type: types.ACCEPT_FRIEND_REQUEST,
         payload: clearUserFriendStatus( user ),
      } )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: types.GET_ERRORS,
         payload: err.response,
      } )
   } )
}

export const cancelOutgoingRequest = ( user ) => ( dispatch ) => {
   const formData = new FormData()
   formData.append( "to_user", user.username )

   axios
   .post( "/api/user/friend-requests/cancel-outgoing/", formData )
   .then( ( res ) => {
      dispatch( {
         type: types.REMOVE_FRIEND_REQUEST,
         payload: clearUserFriendStatus( user ),
      } )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: types.GET_ERRORS,
         payload: err.response.data,
      } )
   } )
}

export const rejectIncomingRequest = ( user ) => ( dispatch ) => {
   const formData = new FormData()
   formData.append( "from_user", user.username )

   axios
   .post( "/api/user/friend-requests/cancel-incomming/", formData )
   .then( ( res ) => {
      dispatch( {
         type: types.CANCEL_INCOMING_REQUEST,
         payload: clearUserFriendStatus( user ),
      } )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: types.GET_ERRORS,
         payload: err.response,
      } )
   } )
}
export const fetchSuggestedRequests = () => ( dispatch ) => {
   dispatch( {
      type: types.SATHI_IS_LOADING,
   } )
   axios
   .get( "/api/user/get-suggested-friends/" )
   .then( ( res ) => {
      dispatch( {
         type: types.GET_SUGGESTION_FRIENDS,
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

export const getMoreSuggestedFriends = ( url ) => ( dispatch ) => {
   axios
   .get( url )
   .then( ( res ) => {
      dispatch( {
         type: types.GET_MORE_SUGGESTED_FRIENDS,
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
export const getMoreSathiLists = ( url ) => ( dispatch ) => {
   axios
   .get( url )
   .then( ( res ) => {
      dispatch( {
         type: types.GET_MORE_SATHILISTS,
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
