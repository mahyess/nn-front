import React, { Component } from "react"
import {
   Segment,
   Image,
   Dropdown,
   Grid,
   Label,
   Button,
   Modal,
   Icon,
   Popup,
} from "semantic-ui-react"
import AvatarUpdaterCropper from "../Profile/AvatarUpdaterCopper"
import CoverUpdater from "../Profile/CoverUpdater"
import { connect } from "react-redux"
import { blockUser } from "src/actions/profileActions"
import SamajBackgroundUpdater from "../Profile/SamajBackgroundUpdater"
import SamajIconUpdater from "../Profile/SamajIconUpdater"
import { Link } from "react-router-dom"
import { leaveSamaj, joinSamaj } from "src/actions/samajActions"
import {
   unFriend,
   sendFriendRequest,
   acceptIncomingRequest,
   cancelOutgoingRequest,
   rejectIncomingRequest,
   fetchIncomingRequests,
   fetchOutgoingRequests,
} from "../../actions/sathiActions"
import isEmpty from "../../validation/is-empty"

class Banner
   extends Component {
   constructor( props ) {
      super( props )
      this.state = {
         unfriend_id: "",
         unfriendModal: false,
      }
   }

   componentDidMount = () => {
      if ( this.props.profileUser ) {
         this.props.fetchIncomingRequests()
         this.props.fetchOutgoingRequests()
      }
   }
   handleBlockUser = ( uid ) => {
      this.props.blockUser( uid )
   }
   handleSamajLeave = ( samajId, slug ) => {
      this.props.leaveSamaj( samajId, slug )
   }
   handleSamajSubscribe = ( samajId ) => {
      this.props.joinSamaj( samajId, this.props.user )
   }
   handleUnfriend = () => {
      if ( !isEmpty( this.state.unfriend_id ) ) {
         this.props.unFriend( this.state.unfriend_id )
         this.setState( { unfriend_id: "", unfriendModal: false } )
      }
   }

   // components used in render
   coverContainer = () => {
      return (
         <div className="coverContainer">
            <Image
               src={
                  ( this.props.profileUser &&
                     this.props.profileUser.profile &&
                     this.props.profileUser.profile.coverpic ) ||
                  ( this.props.samajDetail && this.props.samajDetail.background )
               }
               style={ { height: "240px", width: "100%", objectFit: "cover" } }
            />

            {/* change profile cover picture */ }
            { this.props.profileUser && this.props.isUser === "user" && (
               <div className="overlayCover">
                  <CoverUpdater/>
               </div>
            ) }

            {/* change samaj cover, available if user is samaj admin */ }
            { this.props.samajDetail &&
            this.props.samajDetail.admin &&
            this.props.user &&
            this.props.samajDetail.admin.filter(
               ( adminUser ) => adminUser.username === this.props.user.username,
            ).length > 0 && (
               <div className="overlayCover">
                  <SamajBackgroundUpdater
                     samajId={ this.props.samajDetail.id }
                     slug={ this.props.samajDetail.slug }
                  />
               </div>
            ) }
         </div>
      )
   }

   avatarContainer = () => {
      return (
         <div>
            <Popup
               pinned
               on="click"
               trigger={
                  <Image
                     src={
                        ( this.props.profileUser &&
                           this.props.profileUser.profile &&
                           this.props.profileUser.profile.avatar ) ||
                        ( this.props.samajDetail && this.props.samajDetail.icon )
                     }
                     size="small"
                     circular
                     style={ {
                        marginTop: "-70px",
                        border:
                           "5px solid " +
                           ( this.props.profileUser
                              ? this.props.profileUser.points &&
                              this.props.profileUser.points.color_code
                              : "white" ),
                        background: "white",
                        height: 102,
                        width: 102,
                     } }
                  />
               }
               content="hello"
            >
               <Popup
                  content="Add users to your feed"
                  trigger={ <Button icon="add"/> }
               />
            </Popup>

            {/* badge view */ }
            { this.props.profileUser && this.props.profileUser.badge && (
               <Image
                  src={ this.props.profileUser.badge }
                  size="tiny"
                  avatar
                  style={ {
                     marginTop: "-72px",
                     marginLeft: "72px",
                     background: "white",
                     border: "1px solid",
                     height: 32,
                     width: 32,
                  } }
               />
            ) }

            { this.props.profileUser &&
            this.props.isUser &&
            this.props.isUser === "user" && (
               <div className="overlayAvatar">
                  <AvatarUpdaterCropper/>
               </div>
            ) }
            { this.props.samajDetail &&
            this.props.samajDetail.admin &&
            this.props.profileUser &&
            this.props.samajDetail.admin.filter(
               ( adminUser ) =>
                  adminUser.username === this.props.profileUser.username,
            ).length > 0 && (
               <div className="overlayAvatar">
                  <SamajIconUpdater
                     samajId={ this.props.samajDetail.id }
                     slug={ this.props.samajDetail.slug }
                  />
               </div>
            ) }
         </div>
      )
   }

   bannerDetails = () => {
      let name = ""
      if ( this.props.profileUser )
         name = this.props.profileUser.first_name +
            " " +
            this.props.profileUser.last_name && (
               <div>
                  <Label color="teal">
                     <p>
                        XP Level{ " " }
                        { this.props.profileUser.points &&
                        this.props.profileUser.points.total_points }
                     </p>
                  </Label>
               </div>
            )
      else if ( this.props.samajDetail ) name = this.props.samajDetail.name

      return (
         <div
            style={ {
               marginLeft: "128px",
               marginTop: "-40px",
               color: "black",
               width: "50%",
            } }
         >
            <h3>{ name }</h3>
            { this.props.samajDetail && this.props.samajDetail.description }
         </div>
      )
   }

   bannerSettings = () => {
      // profile related buttons
      if ( this.props.profileUser ) {
         // if profile of self
         if ( this.props.isUser === "user" ) return null
         // if profile of other users
         else if ( this.props.isUser === "friend" ) {
            // if the profile is not friend with user
            if ( !this.props.profileUser.is_friend ) {
               let status = ""
               if (
                  this.props.requests.outgoing.findIndex(
                     ( request ) => request.id === this.props.profileUser.id,
                  ) >= 0
               ) {
                  status = "request_outgoing"
                  return (
                     <div
                        className="ui two buttons"
                        style={ {
                           width: "324px",
                           height: "fit-content",
                           marginTop: 15,
                           marginLeft: "auto",
                        } }
                     >
                        {/* <Button icon labelPosition="left">
                  <Icon name="pause" />
                  Request Sent
                </Button> */ }
                        <Button
                           color="google plus"
                           icon
                           labelPosition="left"
                           onClick={ () =>
                              this.props.cancelOutgoingRequest( this.props.profileUser )
                           }
                        >
                           Cancel Request
                           <Icon name="close"/>
                        </Button>
                     </div>
                  )
               } else if (
                  this.props.requests.incoming.findIndex(
                     ( request ) => request.id === this.props.profileUser.id,
                  ) >= 0
               ) {
                  status = "request_incoming"
                  return (
                     <div
                        className="ui two buttons"
                        style={ {
                           width: "324px",
                           height: "fit-content",
                           marginTop: 15,
                           marginLeft: "auto",
                        } }
                     >
                        <Button
                           float="right"
                           color="facebook"
                           icon
                           labelPosition="left"
                           onClick={ () =>
                              this.props.acceptIncomingRequest( this.props.profileUser )
                           }
                        >
                           <Icon name="check circle"/>
                           Accept Request
                        </Button>

                        <Button
                           // className="uitwobuttons"
                           float="right"
                           color="google plus"
                           icon
                           labelPosition="left"
                           onClick={ () =>
                              this.props.rejectIncomingRequest( this.props.profileUser )
                           }
                        >
                           Reject Request
                           <Icon name="close"/>
                        </Button>
                     </div>
                  )
               }

               return (
                  <div
                     className="ui two buttons"
                     style={ {
                        width: "324px",
                        height: "fit-content",
                        marginTop: 15,
                        marginLeft: "auto",
                     } }
                  >
                     <Button
                        positive
                        onClick={ () =>
                           this.props.sendFriendRequest( this.props.profileUser )
                        }
                        float="right"
                        style={ { height: 39 } }
                     >
                        Add Friend
                     </Button>
                  </div>
               )
            }
            // if the profile is friend with user
            else
               return (
                  <div
                     className="ui two buttons"
                     style={ {
                        width: "224px",
                        height: "fit-content",
                        marginTop: 15,
                        marginLeft: "auto",
                     } }
                  >
                     <Dropdown
                        text="Setting"
                        icon="setting"
                        floating
                        labeled
                        button
                        className="icon"
                        style={ { float: "right" } }
                     >
                        <Dropdown.Menu>
                           <Dropdown.Item onClick={ ( uid ) => this.handleBlockUser( uid ) }>
                              <Icon name="lock"/>
                              Block
                           </Dropdown.Item>
                           <Dropdown.Item>
                              <Icon name="chat"/>
                              Message
                           </Dropdown.Item>
                           <Dropdown.Item
                              onClick={ () =>
                                 this.setState( {
                                    unfriendModal: true,
                                    unfriend_id:
                                       this.props.profileUser && this.props.profileUser.uid,
                                 } )
                              }
                           >
                              <Icon name="unlink"/>
                              Unfriend
                           </Dropdown.Item>
                        </Dropdown.Menu>
                     </Dropdown>
                  </div>
               )
         }
      }
      // samaj related buttons
      else if ( this.props.samajDetail ) {
         return (
            <Link to="/samaj">
               <Button
                  negative
                  onClick={ () =>
                     this.props.isSubscribed
                        ? this.handleSamajLeave(
                        this.props.samajDetail.id,
                        this.props.samajDetail.slug,
                        )
                        : this.handleSamajSubscribe( this.props.samajDetail.id )
                  }
               >
                  { this.props.isSubscribed ? "Leave" : "Subscribe" }
               </Button>
            </Link>
         )
      }
      // if not subscribed, subscribe button
      //   else
      //     return (
      //       <div
      //         className="ui two buttons"
      //         style={{
      //           width: "224px",
      //           height: "fit-content",
      //           marginTop: 15,
      //           marginLeft: "auto",
      //         }}
      //       >
      //         <Button
      //           positive
      //           onClick={() =>
      //             this.handleSamajSubscribe(this.props.samajDetail.id)
      //           }
      //         >
      //           Subscribe
      //         </Button>
      //       </div>
      //     );
      // }
   }

   unfriendModal = () => {
      return (
         <Modal
            open={ this.state.unfriendModal }
            size="tiny"
            closeIcon
            onClose={ () => {
               this.setState( { unfriendModal: false, unfriend_id: null } )
            } }
         >
            <Modal.Header>Are you sure to unfriend?</Modal.Header>
            <Modal.Content>
               <p>Are you sure you want remove from friend?</p>
               <p>You will lose all the data with this user.</p>
               <p>Are you ok with that?</p>
            </Modal.Content>
            <Modal.Actions>
               <Button onClick={ () => this.handleUnfriend() }>Yes</Button>
               <Button
                  onClick={ () => {
                     this.setState( { unfriendModal: false } )
                  } }
               >
                  No
               </Button>
            </Modal.Actions>
         </Modal>
      )
   }

   render() {
      return (
         <Segment style={ { padding: "0" } }>
            <Segment basic style={ { padding: 0, width: "100%" } }>
               { this.coverContainer() }
               <Segment
                  basic
                  style={ {
                     padding: 16,
                     width: "100%",
                     borderRadius: "none",
                     borderTop: "1px solid lightgrey",
                  } }
               >
                  <Grid>
                     <Grid.Row columns={ 2 }>
                        <Grid.Column computer={ 8 } mobile={ 16 }>
                           { this.avatarContainer() }
                           { this.bannerDetails() }
                           { this.bannerSettings() }
                        </Grid.Column>

                        { this.unfriendModal() }
                     </Grid.Row>
                  </Grid>
                  <Grid></Grid>
               </Segment>
            </Segment>
         </Segment>
      )
   }
}

const mapStateToProps = ( state ) => {
   return {
      user: state.auth.user,
      requests: state.sathi.requests,
   }
}

const mapDispatchToProps = ( dispatch ) => {
   return {
      // for samaj actions
      joinSamaj: ( samajId, user ) => dispatch( joinSamaj( samajId, user ) ),
      leaveSamaj: ( samajId, slug ) => dispatch( leaveSamaj( samajId, slug ) ),

      // for profile actions
      blockUser: ( uid ) => dispatch( blockUser( uid ) ),
      unFriend: ( uid ) => dispatch( unFriend( uid ) ),

      sendFriendRequest: ( user ) => dispatch( sendFriendRequest( user ) ),
      acceptIncomingRequest: ( user ) => dispatch( acceptIncomingRequest( user ) ),
      cancelOutgoingRequest: ( user ) => dispatch( cancelOutgoingRequest( user ) ),
      rejectIncomingRequest: ( user ) => dispatch( rejectIncomingRequest( user ) ),

      fetchOutgoingRequests: () => dispatch( fetchOutgoingRequests() ),
      fetchIncomingRequests: () => dispatch( fetchIncomingRequests() ),
   }
}
export default connect( mapStateToProps, mapDispatchToProps )( Banner )
