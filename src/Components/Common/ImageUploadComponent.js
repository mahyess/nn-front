import React, { Component } from "react"
import { Grid, Container, Card, Image } from "semantic-ui-react"
import uploadImage from "../../img/static/img/upload.jpg"

class ImageUploadComponent
   extends Component {
   fileObj = []
   fileArray = []
   filesObject = []

   constructor( props ) {
      super( props )
      this.state = {
         images: [],
      }
   }

   uploadMultipleFiles = ( e ) => {
      this.fileObj.push( e.target.files )
      this.filesObject.push( e.target.files[0] )
      for ( let i = 0; i < this.fileObj[0].length; i++ ) {
         this.fileArray.push( URL.createObjectURL( this.fileObj[0][i] ) )
      }

      this.setState( { images: e.target.files }, () => {
         this.props.uploadImageToState( this.state.images )
      } )
   }

   render() {
      return (
         <>
            <div>
               <Container>
                  <Grid>
                     <Grid.Row columns={ 4 }>
                        { ( this.fileArray || [] ).map( ( url ) => (
                           <Grid.Column width={ 4 }>
                              <img src={ url } alt="..."/>
                           </Grid.Column>
                        ) ) }
                     </Grid.Row>
                  </Grid>
               </Container>
            </div>
            <Grid>
               <Grid.Row>
                  <Grid.Column>
                     <Card fluid style={ { height: 60 } }>
                        <label for="file-input">
                           <Image
                              src={ uploadImage }
                              verticalAlign="middle"
                              style={ { height: 54, width: 64 } }
                           />{ " " }
                           <span>Upload Files...</span>
                        </label>
                        <input
                           id="file-input"
                           type="file"
                           onChange={ ( e ) => this.uploadMultipleFiles( e ) }
                           multiple
                           style={ { display: "none" } }
                        />
                     </Card>
                  </Grid.Column>
               </Grid.Row>
            </Grid>
         </>
      )
   }
}

export default ImageUploadComponent
