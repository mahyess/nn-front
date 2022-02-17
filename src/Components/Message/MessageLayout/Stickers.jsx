import React from "react"
import { Card, Grid } from "semantic-ui-react"
import WebSocketInstance from "src/services/Websocket"


const importAll = ( r ) => {
   let images = {}
   r.keys()
    .map( ( item ) => {
       images[item.replace( "./", "" )] = r( item )
    } )
   return images
}

const setSticker = ( sticker ) => {
   if ( this.state.activeFriend !== null ) {
      if ( this.state.messageType === "friends" )
         WebSocketInstance.newChatMessage( {
            from: this.props.auth.user.username,
            to: this.state.activeFriend.username,
            content: sticker,
         } )
      // else GroupChatInstance.newChatMessage({groupID: this.state.activeGroup, content: sticker});
      this.setState( { message: "" } )
   }
}

const StickersList = () => {
   const images = importAll(
      require.context( "../../../img/emoji", false, /\.(png|jpe?g|svg)$/ ),
   )
   const stickers = Object.keys( images )

   return (
      <Grid>
         <Grid.Row columns={ 4 }>
            { stickers.map( ( sticker ) => (
               <Grid.Column>
                  <Card
                     style={ { width: 200 } }
                     key={ sticker }
                     raised
                     link
                     image={ images[sticker] }
                     onClick={ () => {
                        setSticker( images[sticker] )
                     } }
                  />
               </Grid.Column>
            ) ) }
         </Grid.Row>
      </Grid>
   )
}

export default StickersList