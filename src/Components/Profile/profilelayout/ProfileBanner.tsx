import React, { Component } from "react"
import { Link } from "react-router-dom"
import {
   Image,
   Dropdown,
   Grid,
   Button,
   Modal,
   Icon,
   List,
   Responsive,
   Divider,
   Popup,
} from "semantic-ui-react"
import CoverUpdater from "../../Profile/CoverUpdater"
import { connect } from "react-redux"
import { blockUser } from "src/actions/profileActions"

import {
   unFriend,
   sendFriendRequest,
   acceptIncomingRequest,
   cancelOutgoingRequest,
   rejectIncomingRequest,
   fetchIncomingRequests,
   fetchOutgoingRequests,
} from "../../../actions/sathiActions"
import isEmpty from "../../../validation/is-empty"
import ProfileBannerPlaceHolder from "./ProfileBannerPlaceHolder"
import AvatarUpdaterCopper from "../../Profile/AvatarUpdaterCopper"

class ProfileBanner
   extends Component {
   constructor( props ) {
      super( props )
      this.state = {
         unfriend_id: "",
         unfriendModal: false,
         avatarModal: false,
         errors: {},
         screenWidth: 0,
         isAvatarPopupPinned: false,
         isAvatarModalActive: false,
      }
   }

   onEditorClose = () => {
      this.setState( { avatarModal: false, errors: {} } )
   }

   componentDidMount = () => {
      if ( this.props.isUser === "friend" ) {
         this.props.fetchIncomingRequests()
         this.props.fetchOutgoingRequests()
      }
   }

   handleOnUpdateScreen = ( e, { width } ) => {
      this.setState( { screenWidth: width } )
   }

   handleBlockUser = ( uid ) => {
      this.props.blockUser( uid )
   }

   handleUnfriend = () => {
      if ( !isEmpty( this.state.unfriend_id ) ) {
         this.props.unFriend( this.state.unfriend_id )
         this.setState( { unfriend_id: "", unfriendModal: false } )
      }
   }

   // Image for cover pic starts here//
   imageForCover = () => {
      return (
         <Image
            src={
               this.props.profileUser &&
               this.props.profileUser.profile &&
               this.props.profileUser.profile.coverpic
            }
            style={ {
               height:
                  this.state.screenWidth >= Responsive.onlyComputer.minWidth
                     ? "40vh"
                     : "30vh",
               width: "100%",
               objectFit: "cover",
               cursor: "pointer",
            } }
         />
      )
   }
   // Image for cover pic ends here//

   // components used in render
   coverContainer = () => {
      return (
         <div>
            {/*  Modal for  coverpic triggered on click starts  here */ }
            <Modal
               trigger={ { ...this.imageForCover() } }
               centered
               closeIcon
               size="small"
            >
               {/* image for modal content when clicked on the coverpic starts here */ }
               <Modal.Content image>
                  <Image
                     wrapped
                     src={
                        this.props.profileUser &&
                        this.props.profileUser.profile &&
                        this.props.profileUser.profile.coverpic
                     }
                  />
               </Modal.Content>
               {/* image for modal content when clicked on the coverpic ends here */ }
            </Modal>
            {/*  Modal for  coverpic ends here */ }

            {/* change profile cover picture */ }
            { this.props.profileUser && this.props.isUser === "user" && (
               <div
                  style={ {
                     cursor: "pointer",
                     float: "right",
                     color: "rgb(10, 9, 9)",
                     position: "relative",
                     marginTop: -25,
                     background: "white",

                     width: 125,
                     marginRight: 5,
                     borderRadius: 2,
                  } }
               >
                  <CoverUpdater/>
               </div>
            ) }
         </div>
      )
   }

   profileAvatar = () => {
      return (
         <Image
            src={
               this.props.profileUser &&
               this.props.profileUser.profile &&
               this.props.profileUser.profile.avatar
            }
            size="small"
            circular
            style={ {
               marginTop: "-96px",
               objectFit: "cover",
               cursor: "pointer",

               border:
                  "5px solid " +
                  ( this.props.profileUser
                     ? this.props.profileUser.points &&
                     this.props.profileUser.points.color_code
                     : "white" ),
               background: "white",
               height: 132,
               width: 132,
            } }
         />
      )
   }
   avatarContainer = () => {
      return (
         <div>
            <Modal
               trigger={ { ...this.profileAvatar() } }
               size="mini"
               centered
               closeIcon
               style={ { width: "250px", height: "250px" } }
            >
               {/* image for modal content when clicked on the coverpic starts here */ }
               <Modal.Content image>
                  <Image
                     size="medium"
                     wrapped
                     circular
                     src={
                        this.props.profileUser &&
                        this.props.profileUser.profile &&
                        this.props.profileUser.profile.avatar
                     }
                  />
               </Modal.Content>
               {/* image for modal content when clicked on the coverpic ends here */ }
            </Modal>
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
         </div>
      )
   }

   bannerDetails = () => {
      return (
         this.props.profileUser && (
            <div style={ { marginTop: "-16px", paddingBottom: 0 } }>
               <List>
                  <List.Item>
                     <h3>
                        { this.props.profileUser.first_name +
                        " " +
                        this.props.profileUser.last_name }
                     </h3>
                  </List.Item>
                  <List.Item>@{ this.props.profileUser.username }</List.Item>
               </List>
            </div>
         )
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
                  this.props.requests.outgoing.results.findIndex(
                     ( request ) =>
                        request.id === this.props.profileUser.id &&
                        !request.cancelledRequest,
                  ) >= 0
               ) {
                  status = "request_outgoing"
                  return (
                     <Button
                        negative
                        label
                        content="Cancel Sent Request"
                        icon="remove user"
                        fluid
                        onClick={ () =>
                           this.props.cancelOutgoingRequest( this.props.profileUser )
                        }
                     />
                  )
               } else if (
                  this.props.requests.incoming.results.findIndex(
                     ( request ) =>
                        request.id === this.props.profileUser.id &&
                        !request.requestAccepted &&
                        !request.requestRejected,
                  ) >= 0
               ) {
                  status = "request_incoming"
                  return (
                     <div>
                        <Dropdown
                           fluid
                           floating
                           labeled
                           trigger={
                              <Button
                                 positive
                                 content="Respond to friend request"
                                 icon="user"
                                 fluid
                              />
                           }
                           style={ { color: "white" } }
                        >
                           <Dropdown.Menu style={ { width: "96%", margin: 4 } }>
                              <Dropdown.Item
                                 onClick={ () =>
                                    this.props.acceptIncomingRequest( this.props.profileUser )
                                 }
                              >
                                 <Icon name="user plus"/>
                                 Accept{ " " }
                              </Dropdown.Item>
                              <Divider/>
                              <Dropdown.Item
                                 onClick={ () =>
                                    this.props.cancelOutgoingRequest( this.props.profileUser )
                                 }
                              >
                                 <Icon name="remove user"/>
                                 Reject
                              </Dropdown.Item>
                           </Dropdown.Menu>
                        </Dropdown>
                     </div>
                  )
               } else {
                  return (
                     <Button
                        positive
                        fluid
                        onClick={ () =>
                           this.props.sendFriendRequest( this.props.profileUser )
                        }
                        content="Send Friend Request"
                        icon="user plus"
                     />
                  )
               }
            }
            // if the profile is friend with user
            else
               return (
                  <Dropdown
                     fluid
                     style={ { color: "white" } }
                     trigger={
                        <Button positive content="Settings" icon="setting" fluid/>
                     }
                  >
                     <Dropdown.Menu style={ { width: "100%" } }>
                        <Dropdown.Item
                           onClick={ ( uid ) =>
                              this.props.profileUser &&
                              this.handleBlockUser( this.props.profileUser.uid )
                           }
                        >
                           <Icon name="lock"/>
                           Block
                        </Dropdown.Item>
                        <Dropdown.Item
                           as={ Link }
                           to={ `/message/${this.props.profileUser.username}/`}
                        >
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
               )
         }
      }
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

   loadProfileBanner() {
      const { screenWidth } = this.state

      return (
         <Responsive columns={ 1 } fireOnMount onUpdate={ this.handleOnUpdateScreen }>
            <Grid>
               <Grid.Row>
                  <Grid.Column style={ { padding: 0, paddingBottom: 8 } }>
                     { this.coverContainer() }
                  </Grid.Column>
               </Grid.Row>
               <Grid.Row>
                  <Grid.Column computer={ 16 } mobile={ 16 }>
                     <Grid.Row columns={ 2 }>
                        <Grid.Column computer={ 8 } mobile={ 16 }>
                           <Grid>
                              <Grid.Row columns={ 4 }>
                                 <Grid.Column
                                    computer={ 3 }
                                    mobile={ 7 }
                                    tablet={ 4 }
                                    style={ {
                                       padding: 0,
                                       position: "relative",
                                    } }
                                 >
                                    { this.avatarContainer() }
                                    { this.props.profileUser &&
                                    this.props.isUser === "user" && (
                                       <Icon
                                          onClick={ () =>
                                             this.setState( { avatarModal: true } )
                                          }
                                          className="camera-icon"
                                          size="small"
                                          name="camera retro"
                                          corner="top right"
                                          circular

                                       />
                                    ) }
                                 </Grid.Column>

                                 <Grid.Column
                                    computer={ 8 }
                                    mobile={ 7 }
                                    tablet={ 4 }
                                    style={ { padding: 0 } }
                                 >
                                    <Grid>
                                       <Grid.Row columns={ 3 } style={ { padding: 0 } }>
                                          <Grid.Column computer={ 4 } mobile={ 16 }>
                                             { this.bannerDetails() }
                                          </Grid.Column>
                                          <Grid.Column
                                             computer={ 8 }
                                             mobile={ 16 }
                                             style={ {
                                                padding: 0,
                                                marginLeft:
                                                   screenWidth >=
                                                   Responsive.onlyComputer.minWidth
                                                      ? "0px"
                                                      : "8px",
                                                marginBottom: 8,
                                             } }
                                          >
                                             <div
                                                className="progress"
                                                style={ {
                                                   marginTop:
                                                      screenWidth >=
                                                      Responsive.onlyComputer.minWidth
                                                         ? "-9px"
                                                         : "3px",

                                                   marginBottom: 8,
                                                } }
                                             >
                                                <div
                                                   class="bar"
                                                   style={ {
                                                      width:
                                                         ( this.props.profileUser.points &&
                                                            this.props.profileUser.points
                                                               .total_points / 10 ) *
                                                         100 +
                                                         "%",
                                                      backgroundColor:
                                                         this.props.profileUser.points &&
                                                         this.props.profileUser.points.color_code,
                                                   } }
                                                >
                                                   <p class="percent">
                                                      { this.props.profileUser.points &&
                                                      this.props.profileUser.points
                                                         .total_points }
                                                   </p>
                                                </div>
                                             </div>
                                             <p>
                                                <Icon
                                                   name="star"
                                                   style={ {
                                                      color:
                                                         this.props.profileUser.points &&
                                                         this.props.profileUser.points.color_code,
                                                   } }
                                                />
                                                XP Level
                                                { this.props.profileUser.points &&
                                                this.props.profileUser.points.total_points }
                                             </p>
                                          </Grid.Column>

                                       </Grid.Row>
                                    </Grid>
                                 </Grid.Column>
                                 <Grid.Column
                                    computer={ 3 }
                                    mobile={ 16 }
                                    style={ { padding: 0 } }
                                 >
                                    { this.bannerSettings() }
                                 </Grid.Column>
                              </Grid.Row>
                           </Grid>
                        </Grid.Column>

                        { this.unfriendModal() }
                     </Grid.Row>
                  </Grid.Column>
               </Grid.Row>
            </Grid>
         </Responsive>
      )
   }

   render() {
      return (
         <React.Fragment>
            <div
               className="grid-padding"
               style={ { background: "white", padding: 0 } }
            >
               { this.props.profileUser != null ? (
                  this.loadProfileBanner()
               ) : (
                  <Grid>
                     <Grid.Row>
                        <Grid.Column style={ { padding: "0" } }>
                           <ProfileBannerPlaceHolder/>
                        </Grid.Column>
                     </Grid.Row>
                  </Grid>
               ) }
            </div>

            <AvatarUpdaterCopper
               avatarModal={ this.state.avatarModal }
               src={
                  this.props.profileUser &&
                  this.props.profileUser.profile &&
                  this.props.profileUser.profile.avatar
               }
               onEditorClose={ this.onEditorClose }
            />
         </React.Fragment>
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
export default connect( mapStateToProps, mapDispatchToProps )( ProfileBanner )
