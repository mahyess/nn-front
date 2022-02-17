import React, { Component } from "react"
import { connect } from "react-redux"
import { Icon, List } from "semantic-ui-react"
import { updateSamajIcon } from "../../actions/samajActions"

class AvatarUpdater
   extends Component {
   state = {
      selectedFile: null,
   }

   fileSelectHandler = ( e ) => {
      let files = e.target.files
      let reader = new FileReader()
      reader.onload = ( r ) => {
         this.setState( { selectedFile: r.target.result }, () => {
            this.fileUploadHandler()
         } )
      }
      reader.readAsDataURL( files[0] )
   }

   fileUploadHandler = ( dispatch ) => {
      const fd = new FormData()
      fd.append( "samaj", this.props.samajId )
      fd.append( "icon", this.state.selectedFile )

      this.props.updateSamajIcon( fd, this.props.samajId, this.props.slug )
      this.setState( { selectedFile: null } )
   }

   render() {
      return (
         <div>
            <List.Item>
               <label
                  htmlFor="avatarButton"
                  style={ { padding: 8, cursor: "pointer" } }
               >
                  <Icon name="camera" corner/> Change Samaj Avatar
               </label>
            </List.Item>
            <input
               type="file"
               id="avatarButton"
               onChange={ ( e ) => this.fileSelectHandler( e ) }
               style={ { display: "none" } }
            />
         </div>
      )
   }
}

const mapDispatchToProps = ( dispatch ) => {
   return {
      updateSamajIcon: ( fd, id, slug ) => dispatch( updateSamajIcon( fd, id, slug ) ),
   }
}
export default connect( null, mapDispatchToProps )( AvatarUpdater )
