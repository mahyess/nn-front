import React, { Component } from "react"
import { connect } from "react-redux"
import { Grid, Segment, Header } from "semantic-ui-react"
import { getUserGallery } from "src/actions/profileActions"
import ReactImageVideoLightbox from "react-image-video-lightbox"

class Photos
   extends Component {
   state = {
      currentImage: 0,
      isModelOpen: false,
      attachments: [],
   }

   closeLightbox = () => {
      this.setState( {
         currentIndex: 0,
         isModelOpen: false,
      } )
   }

   componentDidMount() {
      this.props.getUserGallery( this.props.username )

   }

   componentDidUpdate = ( prevProps ) => {
      if ( this.props.gallery !== prevProps.gallery ) {
         let reactImageVideoLightboxData = []
         this.props.gallery.map( ( media ) => {

            let mediaData = {
               url: media,
               altTag: "bla",
            }
            if ( media.split( "." )
                      .pop() === "MP4" ) {
               mediaData.type = "video"
            } else {
               mediaData.type = "photo"
            }
            reactImageVideoLightboxData.push( mediaData )
         } )
         this.setState( { attachments: [ ...reactImageVideoLightboxData ] } )
      }
   }

   // openLightBox = (event, index) => {
   //   this.setState({
   //     currentImage: index,
   //     isModelOpen: true,
   //   });
   // };

   render() {
      const { isLoading } = this.props

      return (
         <React.Fragment>
            <Grid>
               <Grid.Column only="computer">
                  <Header as="h3" dividing>
                     Media
                     <Header.Subheader style={ {} }>
                        A gallery of all the media you have posted.{ " " }
                     </Header.Subheader>
                  </Header>
                  <Segment
                     // className="pad-0"
                     basic
                     style={ { height: "334px", overflow: "scroll", padding: 0 } }
                  >
                     { !isLoading && (
                        <ReactImageVideoLightbox
                           data={ this.state.attachments }
                           startIndex={ 0 }
                           showResourceCount={ true }
                           // onCloseCallback={() => {
                           //   this.setState({ lightboxOpen: false });
                           // }}
                        />
                     ) }
                  </Segment>
               </Grid.Column>
            </Grid>
         </React.Fragment>
      )
   }
}

const mapStateToProps = ( state ) => ( {
   gallery: state.profile.gallery.gallery,
} )

const mapDispatchToProps = ( dispatch ) => ( {
   getUserGallery: ( username ) => dispatch( getUserGallery( username ) ),
} )

export default connect( mapStateToProps, mapDispatchToProps )( Photos )
