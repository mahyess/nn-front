import * as types from "./actionTypes"

import axios from "axios"

export const search = ( text ) => ( dispatch ) => {
   axios
   .get( `/api/search/?q=${ text }` )
   .then( ( response ) =>
      dispatch( {
         type: types.SEARCH,
         payload: response.data,
      } ),
   )
   .catch( ( err ) =>
      dispatch( {
         type: types.GET_ERRORS,
         payload: err.response,
      } ),
   )
}
