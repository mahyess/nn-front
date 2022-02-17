import React, { Component } from "react"
import { updateCoverPicture } from "src/actions/profileActions"
import { connect } from "react-redux"
import { Icon} from "semantic-ui-react"

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
      fd.append( "coverpic", this.state.selectedFile )
      this.props.updateCoverPicture( fd )
   }

   render() {
      return (
         <div>
            <label htmlFor="coverButton" style={ { cursor: "pointer" } }>
               <Icon name="camera" size="large" verticalAlign="middle"/>
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

const mapStateToProps = ( state ) => ( {
   user: state.auth.user,
} )

const mapDispatchToProps = ( dispatch ) => {
   return {
      updateCoverPicture: ( fd ) => dispatch( updateCoverPicture( fd ) ),
   }
}
export default connect( mapStateToProps, mapDispatchToProps )( CoverUpdater )
