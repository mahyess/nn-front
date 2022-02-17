const isImage = ( params ) => {
   //   let cntnt = /[.]/.exec(params) ? /[^.]+$/.exec(params) : undefined;
   //   let images = ["jpg", "jpeg", "gif", "png"];

   // if (!isEmpty(params)) {
   if ( typeof params === "string" )
      if (
         params.includes( "data:image/gif;base64," ) ||
         params.includes( "data:image/png;base64," ) ||
         params.includes( "data:image/jpeg;base64," ) ||
         params.includes( "data:image/webp;base64," ) ||
         params.includes( ".png" ) ||
         params.startsWith( "[[ATTACHMENT]]:[[IMAGE]]" )
      ) return true
   return false
}

export default isImage
