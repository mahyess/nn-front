import React, { Component } from "react"
import { updateSamajBackground } from "src/actions/samajActions"
import { connect } from "react-redux"
import { Icon } from "semantic-ui-react"

class CoverUpdater
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
      fd.append( "background", this.state.selectedFile )
      this.props.updateSamajBackground( fd, this.props.samajId, this.props.slug )
      this.setState( { selectedFile: null } )
   }

   render() {
      return (
         <div>
            <label htmlFor="coverButton">
               <Icon name="camera" size="large" verticalalign="top"/>{ " " }
               <span>Change Cover</span>
            </label>
            <input
               type="file"
               id="coverButton"
               onChange={ ( e ) => this.fileSelectHandler( e ) }
               style={ { display: "none" } }
            />
         </div>
      )
   }
}

const mapDispatchToProps = ( dispatch ) => {
   return {
      updateSamajBackground: ( fd, id, slug ) =>
         dispatch( updateSamajBackground( fd, id, slug ) ),
   }
}
export default connect( null, mapDispatchToProps )( CoverUpdater )
