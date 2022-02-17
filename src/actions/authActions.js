import * as types from "./actionTypes"
import axios from "axios"
import setAuthToken from "../utils/setAuthToken"

// login
export const login = ( data ) => ( dispatch ) => {
   axios
   .post( "/api/login/", { username: data.username, password: data.password } )
   .then( ( res ) => {
      localStorage.setItem( "token", res.data.token )
      setAuthToken( res.data.token )
      dispatch( { type: types.LOGIN, payload: res.data } )
      dispatch( { type: types.CLEAR_ERRORS } )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: types.GET_ERRORS,
         payload: err.response,
      } )
   } )
}

// logout
export const logout = () => ( dispatch ) => {
   localStorage.removeItem( "token" )
   dispatch( { type: types.LOGOUT } )
}

// Password change
export const passwordChange = ( formData ) => ( dispatch ) => {
   axios.post( "/api/user/change-password/", formData )
        .catch( ( err ) =>
           dispatch( {
              type: types.GET_ERRORS,
              payload: err.response,
           } ),
        )
}

// check if token is available and return current auth user data
export const isAuth = () => ( dispatch ) => {
   axios
   .get( `/api/is-auth/` )
   .then( ( res ) => {
      dispatch( {
         type: types.CURRENT_USER,
         payload: res.data,
      } )
   } )
   .catch( ( err ) => {
      if ( err.response && err.response.status === 401 )
         dispatch( { type: types.LOGOUT } )
   } )
}

// Signup Actions/ register new user
export const registerUser = ( userData, history ) => ( dispatch ) => {
   axios
   .post( "/api/users/register", userData )
   .then( ( res ) => history.push( "/login/" ) )
   .catch( ( err ) =>
      dispatch( {
         type: types.GET_ERRORS,
         payload: err.response,
      } ),
   )
}

export const deactivateAccount = ( formData ) => ( dispatch ) => {
   axios
   .post( "/api/user/account-deactivate/", formData )
   .then( ( _ ) => {
      localStorage.removeItem( "token" )
      dispatch( { type: types.LOGOUT } )
   } )
   .catch( ( err ) => {
      dispatch( {
         type: types.GET_ERRORS,
         payload: err.response,
      } )
   } )
}

export const getUserActivities = () => ( dispatch ) => {

   axios
   .get( "/api/get-user-logs/" )
   .then( ( res ) => {
      dispatch( {
         type: types.GET_USER_ACTIVITIES,
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
