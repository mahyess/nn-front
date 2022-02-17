import * as types from "./actionTypes"
import axios from "axios"


export const getAllNotifications = () => ( dispatch ) => {
   axios
   .get( "/api/notifications/" )
   .then( ( response ) => {

      dispatch( {
         type: types.GET_All_NOTIFICATIONS,
         payload: response.data,
      } )
   } )

   .catch( ( err ) =>
      dispatch( {
         type: types.GET_ERRORS,
         payload: err.response,
      } ),
   )
}
