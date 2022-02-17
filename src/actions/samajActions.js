import {
   GET_SAMAJ_LIST,
   GET_MY_SAMAJ_LIST,
   JOIN_SAMAJ,
   GET_SAMAJ_DETAILS,
   GET_SAMAJ_POSTS,
   GET_PINNED_POST,
   ADD_SAMAJ_POST,
   SAMAJ_LOADING,
   KICK_USER,
   GET_ERRORS,
   CLEAR_POSTS,
} from "./actionTypes"
import axios from "axios"
import { types } from "react-alert"

export const getSamajList = () => ( dispatch ) => {
   dispatch( {
      type: SAMAJ_LOADING,
   } )
   dispatch( {
      type: CLEAR_POSTS,
   } )

   axios
   .get( "/api/community/" )
   .then( ( res ) => {
      dispatch( {
         type: GET_SAMAJ_LIST,
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

export const getMySamajList = () => ( dispatch ) => {
   // dispatch( {
   //    type: SAMAJ_LOADING,
   // } )
   // dispatch( {
   //    type: CLEAR_POSTS,
   // } )

   axios
   .get( "/api/community/my-list/" )
   .then( ( res ) => {

      dispatch( {

         type: GET_MY_SAMAJ_LIST,
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

export const joinSamaj = ( samajId, user ) => ( dispatch ) => {
   const data = new FormData()
   data.append( "samaj", samajId )
   dispatch( {
      type: CLEAR_POSTS,
   } )
   axios
   .post( "/api/community/join/", data )
   .then( ( res ) => {
      dispatch( {
         type: JOIN_SAMAJ,
         user: user,
         samajId: samajId,
      } )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: GET_ERRORS,
         payload: err.response,
      } )
   } )
}

export const leaveSamaj = ( samajId, slug ) => ( dispatch ) => {
   const data = new FormData()
   data.append( "samaj", samajId )

   axios
   .post( "/api/community/leave/", data )
   .then( ( res ) => {
      // dispatch({
      //   type: LEAVE_SAMAJ,
      //   payload: res.data
      // });
      dispatch( getSamajDetails( samajId, slug ) )
      dispatch( getSamajList() )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: GET_ERRORS,
         payload: err.response,
      } )
   } )
}

export const getSamajDetails = ( samajId, slug ) => ( dispatch ) => {
   axios
   .get( `/api/community/${ samajId }/${ slug }/details/` )
   .then( ( res ) => {
      dispatch( {
         type: GET_SAMAJ_DETAILS,
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

export const getSamajPosts = ( samajId, slug ) => ( dispatch ) => {
   dispatch( {
      type: CLEAR_POSTS,
   } )
   axios
   .get( `/api/posts/community/${ slug }/${ samajId }/` )
   .then( ( res ) => {
      dispatch( {
         type: GET_SAMAJ_POSTS,
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

export const getPinnedPost = ( samajId ) => ( dispatch ) => {

   axios
   .get( `/api/posts/community/${ samajId }/get-pinned-post/` )
   .then( ( res ) => {
      dispatch( {
         type: GET_PINNED_POST,
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

export const handlePinnedPost = ( post ) => ( dispatch ) => {
   const fd = new FormData()
   fd.append( "pid", post.pid )
   axios
   .post( `/api/community/post/pin/`, fd )
   .then( () => {
      dispatch( getPinnedPost( post.community.id ) )
   } )
   .catch( ( err ) =>
      dispatch( {
         type: types.GET_ERRORS,
         payload: err.response,
      } ),
   )
}

export const requestSamaj = ( formData ) => ( dispatch ) => {
   axios
   .post( "/api/community/request/", formData )
   .then( ( res ) => {
      alert(
         "Your request is under consideration. We will notify about this as soon as possible",
      )

      // dispatch({
      //   type: REQUEST_SAMAJ,
      //   payload: res.data
      // });
   } )
   .catch( ( err ) => {
      dispatch( {
         type: GET_ERRORS,
         payload: err.response,
      } )
   } )
}
export const addSamajPost = ( formData ) => ( dispatch ) => {
   axios
   .post( "/api/posts/", formData )
   .then( ( res ) => {

      dispatch( {
         type: ADD_SAMAJ_POST,
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
export const kickUser = ( formData ) => ( dispatch ) => {
   axios
   .post( "/api/community/admin/edit/kick-user/", formData )
   .then( ( res ) => {
      dispatch( {
         type: KICK_USER,
         payload: res.data.details,
      } )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: GET_ERRORS,
         payload: err.response,
      } )
   } )
}

export const updateSamajDescription = ( formData ) => ( dispatch ) => {
   // dispatch({
   //   type: CLEAR_POSTS,
   // });
   axios
   .post( "/api/community/admin/edit/change-descriptions/", formData )
   .then( ( res ) => {
   } )
   .catch( ( err ) => {
      dispatch( {
         type: GET_ERRORS,
         payload: err.response,
      } )
   } )
}

export const updateSamajBackground = ( formData, id, slug ) => ( dispatch ) => {
   axios
   .post( "/api/community/change-background/", formData )
   .then( ( res ) => {
      dispatch( getSamajDetails( id, slug ) )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: GET_ERRORS,
         payload: err.response,
      } )
   } )
}

export const updateSamajIcon = ( formData, id, slug ) => ( dispatch ) => {
   axios
   .post( "/api/community/change-icon/", formData )
   .then( ( res ) => {
      dispatch( getSamajDetails( id, slug ) )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: GET_ERRORS,
         payload: err.response,
      } )
   } )
}
