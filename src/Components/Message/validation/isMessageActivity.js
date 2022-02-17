const isMessageActivity = ( message ) => {
   if ( typeof message === "string" )
      if ( message.startsWith( "[[ACTIVITY]]:" ) ) return true
   return false
}


export default isMessageActivity