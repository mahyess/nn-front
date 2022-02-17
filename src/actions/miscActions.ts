import * as types from "./actionTypes"

export const changeAuthPage = ( page ) => ( dispatch ) => {
   dispatch( {
      type: types.CHANGE_AUTH_PAGE,
      payload: page,
   } )
}
