import React, { PureComponent } from "react"

import { connect } from "react-redux"
import {
   Grid,
   Modal,
   Header,
   Button,
   Segment,
   Image,
   Progress,
} from "semantic-ui-react"
import isEmpty from "../../validation/is-empty"

import { updateAvatarPicture } from "src/actions/profileActions"
import Avatar from "react-avatar-edit"

class AvatarUpdaterCropper
   extends PureComponent {
   state = {
      src: null,
      percentage: 0,
      errors: {},
   }

   componentDidUpdate( prevProps ) {
      if ( this.props.src !== prevProps.src ) {
         this.props.onEditorClose()
      }
   }

   // avatar
   onAvatarSave = () => {
      const { preview } = this.state
      if ( !isEmpty( preview ) ) {
         let formData = new FormData()
         formData.append( "avatar", preview )

         const options = {
            onUploadProgress: ( progressEvent ) => {
               let percentCompleted = Math.round(
                  ( progressEvent.loaded * 100 ) / progressEvent.total,
               )
               this.setState( { percentage: percentCompleted } )
            },
         }

         this.props.updateAvatarPicture( formData )

         this.setState( { percentage: 100 }, () => {
            setTimeout( () => {
               this.setState( { percentage: 0, src: "" } )
            }, 1000 )
         } )
      }
   }

   onClose = () => {
      this.setState( { preview: null, errors: {} } )
   }

   onCrop = ( preview ) => {
      this.setState( { preview } )
   }

   onBeforeFileLoad = ( elem ) => {
      if ( elem.target.files[0].size > 10000000 ) {
         alert( "File is too big!" )
         elem.target.value = ""
      }
   }

   //avatar end //
   render() {
      const { src, percentage } = this.state

      return (
         <Modal
            open={ this.props.avatarModal }
            size="small"
            closeIcon
            closeOnDimmerClick={ false }
            closeOnRootNodeClick={ false }
            onClose={ this.props.onEditorClose }
         >
            <Header>Edit your Profile Avatar</Header>
            <Modal.Content scrolling>
               { percentage > 0 && (
                  <Progress
                     percent={ this.state.percentage }
                     indicating
                     content="Uploading Files.. Please Wait"
                     error={ !isEmpty( this.props.errors ) }
                  />
               ) }
               <Grid columns={ 2 } divided stackable>
                  <Grid.Row>
                     <Grid.Column width="11">
                        <Avatar
                           width={ 390 }
                           height={ 295 }
                           onCrop={ this.onCrop }
                           onClose={ this.onClose }
                           onBeforeFileLoad={ this.onBeforeFileLoad }
                           src={ src }
                           closeIconColor="blue"
                        />
                     </Grid.Column>
                     <Grid.Column width="5">
                        <span>Cropped Image Preview</span>
                        <Segment basic>
                           <Image src={ this.state.preview } centered/>
                        </Segment>
                     </Grid.Column>
                  </Grid.Row>
               </Grid>
               <div className="pt-5" style={ { marginTop: "5px" } }>
                  <Button onClick={ this.onAvatarSave } fluid>
                     save
                  </Button>
               </div>
            </Modal.Content>
         </Modal>
      )
   }
}

const mapDispatchToProps = ( dispatch ) => {
   return {
      updateAvatarPicture: ( formData ) => dispatch( updateAvatarPicture( formData ) ),
   }
}
export default connect( null, mapDispatchToProps )( AvatarUpdaterCropper )
