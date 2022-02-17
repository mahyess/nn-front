import axios from "axios"
import { GET_ERRORS, GET_GROUP_CHAT, GET_MESSAGE_SATHI } from "./actionTypes"


export const getGroupChatList = () => ( dispatch ) => {
   axios
   .get( "/api/messages/group-message/list/" )
   .then( ( res ) => {
      dispatch( {
         type: GET_GROUP_CHAT,
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

export const getChatList = () => ( dispatch ) => {
   axios
   .get( `/api/messages/` )
   .then( ( res ) => {
      dispatch( {
         type: GET_MESSAGE_SATHI,
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

export const sendAttachment = ( formData ) => () => {
   axios
   .post( `/api/messages/add-message-attachment/`, formData )
   .then( ( res ) => {
      console.log( res )
   } )
   .catch( ( err ) => {
      console.log( err )
   } )
}

export const initMessage = ( username ) => async () =>
   await axios.post( "/api/messages/init-message/", { username: username } )
