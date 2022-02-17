import {
   GET_COMMENTS,
   MORE_COMMENTS,
   ADD_COMMENT,
   GET_ERRORS,
} from "./actionTypes"
import axios from "axios"
import { authHeader } from "../authHeader"

var headers = authHeader()

export const getComments = ( pid ) => ( dispatch ) => {
   axios
   .get( `/api/posts/${ pid }/comments/` )
   .then( ( res ) => {
      dispatch( {
         type: GET_COMMENTS,
         payload: res.data,
         pid: pid,
      } )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: GET_ERRORS,
         payload: err.response,
      } )
   } )
}

export const getMoreComments = ( url, postId ) => ( dispatch ) => {
   axios
   .get( url )
   .then( ( res ) => {
      dispatch( {
         type: MORE_COMMENTS,
         payload: res.data,
         postId: postId,
      } )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: GET_ERRORS,
         payload: err.response,
      } )
   } )
}

export const handleCommentUpvote = ( pid, cid ) => ( dispatch ) => {
   const data = new FormData()
   data.append( "comment", cid )

   axios
   .post( "/api/posts/comment/vote-up/", data, { headers: headers } )
   .then( ( res ) => {
      dispatch( getComments( pid ) )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: GET_ERRORS,
         payload: err.response,
      } )
   } )
}

export const handleCommentDownvote = ( pid, cid ) => ( dispatch ) => {
   const data = new FormData()
   data.append( "comment", cid )

   axios
   .post( "/api/posts/comment/vote-down/", data, {
      headers: headers,
   } )
   .then( ( res ) => {
      dispatch( getComments( pid ) )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: GET_ERRORS,
         payload: err.response,
      } )
   } )
}

export const handleAddComment = ( pid, comment ) => ( dispatch ) => {
   const addCommentData = new FormData()
   // addCommentData.append("user", uid);
   addCommentData.append( "comment", comment )
   // addCommentData.append("post", pid);

   axios
   .post( `/api/posts/${ pid }/comments/`, addCommentData )
   .then( ( res ) => {
      dispatch( {
         type: ADD_COMMENT,
         pid: pid,
      } )
      dispatch( getComments( pid ) )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: GET_ERRORS,
         payload: err.response,
      } )
   } )
}
