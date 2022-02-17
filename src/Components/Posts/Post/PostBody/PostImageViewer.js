import React, { Component } from "react"
import ReactPlayer from "react-player"
import { Card, Grid, Image } from "semantic-ui-react"
import VideoPlayer from "../../../Message/MessageLayout/VideoPlayer"

class PostImageViewer
   extends Component {
   state = {
      isImage: true,
   }

   componentDidMount() {
      const attachments = this.props.image
      if ( attachments != null ) {
         if ( this.props.image.split( "." )
                  .pop() === "MP4" ) {
            this.setState( {
               isImage: false,
            } )
         }

      }
   }

   render() {
      return (
         <div>
            <Card.Description style={ { paddingTop: 8 } }>
               { this.state.isImage ? (
                  <Image
                     src={ this.props.image }
                     style={ {
                        objectFit: "contain",
                        height: "400px",
                        width: "100%",
                        margin: "0",
                        padding: 0,
                     } }
                  />
               ) : (
                  <Grid>
                     <Grid.Row>
                        <Grid.Column>
                           <ReactPlayer
                              url={ this.props.image }
                              src={ this.props.image }
                              // height={80}
                              width={ "100%" }
                              controls
                           />
                        </Grid.Column>
                     </Grid.Row>
                  </Grid>
               ) }
            </Card.Description>
         </div>
      )
   }
}

export default PostImageViewer
