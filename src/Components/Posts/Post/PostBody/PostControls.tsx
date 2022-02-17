import React, { Component } from "react"
import { Image, Icon, Grid, Dropdown, Divider } from "semantic-ui-react"

import namastes from "../../../../img/static/img/namastes.png"
import commenticon from "../../../../img/static/img/comments.png"
import shares from "../../../../img/static/img/shares.png"
import samaj from "../../../../img/static/img/society.png"
import messagess from "../../../../img/static/img/messagess.png"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import SharePost, { mapStateToProps } from "../../CreatePost/SharePost"
import { getMySamajList } from "src/actions/samajActions"
import { connect } from "react-redux"

class PostControls
   extends Component {
   state = {
      isSharePostModelOpen: false,
   }

   handleSharePostModelClose = () => {
      this.setState( { isSharePostModelOpen: false } )
   }

   handleSharePostModelOpen = () => {
      this.setState( { isSharePostModelOpen: true } )
      this.props.getMySamajList()
   }

   notify = () => {
      toast.configure()
      toast( " 😲 we're sorry, access is not allowed because you have not login", {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         type: "error",
      } )
   }

   notifyLinkCopied = ( message ) => {
      toast.configure()
      toast( message, {
         position: "bottom-center",
         autoClose: 5000,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         type: "error",
      } )
   }

   shareOnFaceBook( slug ) {
      window.open(
         "https://www.facebook.com/sharer/sharer.php?u=https://www.namastenepal.com/non-auth/post-details/" +
         slug +
         "/",
         "_blank",
      )
   }

   shareOnTwitter( slug ) {
      window.open(
         "https://twitter.com/share?url=" +
         encodeURIComponent(
            "https://www.namastenepal.com/non-auth/post-details/" + slug + "/",
         ),
         "_blank",
      )
   }

   shareOnLinkedin( slug ) {
      window.open(
         "https://www.linkedin.com/sharing/share-offsite/?url=https://www.namastenepal.com/non-auth/post-details/" +
         slug +
         "/",
         "_blank",
      )
   }

   copyToClipBoard() {
      var text = "Example text to appear on clipboard"
      // var notifyLinkCopied = this.notifyLinkCopied(text);
      navigator.clipboard.writeText( text )
               .then(
                  function ( notifyLinkCopied ) {
                     toast.configure()
                     toast( "Linked Copied to Clipboard", {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        type: "error",
                     } )
                  },
                  function ( err ) {
                     toast.configure()
                     toast( "Could not copy text", {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        type: "error",
                     } )
                  },
               )
   }

   shareButtonOption( slug ) {
      return (

         <Dropdown
            trigger={
               <Image
                  src={ shares }
                  style={ { cursor: "pointer", height: 18, width: 18, marginRight: 20 } }
               />
            }
            floating
            pointing="top right"
            direction="left"
            icon={ null }
         >

            <Dropdown.Menu style={ { padding: 16 } }>
               { this.props.user &&
                  <>

               <Dropdown.Item onClick={ this.copyToClipBoard }>
                  Copy Link
               </Dropdown.Item>
               <Divider/>

               <Dropdown.Item onClick={ () => this.handleSharePostModelOpen() }>
                  <Image
                     className="drop down image"
                     src={ samaj }
                     avatar
                     size="small"
                  />
                  Share on Samaj
               </Dropdown.Item>
               <Dropdown.Item>
                  <Image
                     className="drop down image"
                     size="small"
                     avatar
                     src={
                        this.props.user &&
                        this.props.user.profile &&
                        this.props.user.profile.avatar != null
                           ? this.props.user.profile.avatar
                           : ""
                     }
                  />
                  Share on Profile
               </Dropdown.Item>

               <Dropdown.Item>
                  <Image
                     className="drop down image"
                     src={ messagess }
                     size="small"
                     avatar
                  />
                  Send in message
               </Dropdown.Item>
               <Divider/>
                </>}
               <p>Share on other Social Media</p>
               <Dropdown.Item onClick={ () => this.shareOnFaceBook( slug ) }>
                  <Icon name="facebook"/> Share on Facebook
               </Dropdown.Item>
               <Dropdown.Item onClick={ () => this.shareOnTwitter( slug ) }>
                  <Icon name="twitter"/> Share on Twitter
               </Dropdown.Item>
               <Dropdown.Item onClick={ () => this.shareOnLinkedin( slug ) }>
                  <Icon name="linkedin"/> Share on LinkedIn
               </Dropdown.Item>
            </Dropdown.Menu>
         </Dropdown>
      )
   }

   render() {
      const namaste = {
         height: 18,
         width: 18,
         borderRadius: "50%",
         boxShadow: "0 2px 0 3px white, 0 0 0 5px rgb(96, 172, 243)",
      }

      return (
         <React.Fragment>
            <Grid columns={ 3 } textAlign="center">
               <Grid.Row className="post-control">
                  <Grid.Column>
              <span
                 style={ { cursor: "pointer" } }
                 onClick={ () =>
                    this.props.user
                       ? this.props.handleLikeClick(
                       this.props.post.pid,
                       this.props.userId,
                       )
                       : this.notify()
                 }
              >
                <Image
                   src={ namastes }
                   style={ this.props.postIsLiked ? namaste : null }
                />
              </span>
                  </Grid.Column>
                  <Grid.Column>
              <span
                 style={ { cursor: "pointer" } }
                 onClick={ () =>
                    this.props.user
                       ? this.props.handleShowCommentsClick( this.props.post.pid )
                       : this.notify()
                 }
              >
                <Image
                   src={ commenticon }
                   style={ {
                      height: 18,
                      width: 18,
                   } }
                />
              </span>
                  </Grid.Column>
                  <Grid.Column>
                     { this.shareButtonOption( this.props.post.slug ) }
                  </Grid.Column>
               </Grid.Row>
            </Grid>

            <SharePost
               modalOpen={ this.state.isSharePostModelOpen }
               handleClose={ this.handleSharePostModelClose }
               post={ this.props.post }
            />
         </React.Fragment>
      )
   }
}

export const mapDispatchToProps = ( dispatch ) => {
   return {
      getMySamajList: () => dispatch( getMySamajList() ),

   }
}
export default connect( null, mapDispatchToProps )( PostControls )

