import React, { Component } from "react"
// import { useBooleanKnob } from '@stardust-ui/docs-components'
import {
   Menu,
   Button,
   Icon,
   Label,
   Image,
   Grid,
   Dropdown,
   List,
   Popup,
   Card,
   Modal,
} from "semantic-ui-react"

import { Link } from "react-router-dom"

import moment from "moment"
import { toast } from "react-toastify"

import messages from "../../img/static/img/messages.png"
import bellImage from "../../img/static/img/bell.png"
import setting from "../../img/static/img/setting.png"
import NotifWebSocketInstance from "../../services/NotifSocket"
import "../../static/style.css"
import "./Layout.module.css"
import logo from "../../img/post/logo.png"
import logo3 from "../../img/post/logo3.png"
import { logout } from "../../actions/authActions"
import { connect } from "react-redux"
import { getPost, clearPost } from "../../actions/postActions"

import messageAlert from "../../static/alert/messagealert.mp3"
import SearchBar from "../Search/SearchBar"
import Post from "../Posts/Post/Post"

class Navbar
   extends Component {
   constructor( props ) {
      super( props )
      this.state = {
         online: false,

         notifications: [],
         messages: [],
         notifPop: false,
         unread_messages: 0,
         unread_notifications: 0,
      }
   }

   componentDidMount() {
      NotifWebSocketInstance.connect()
      this._isMounted = true
      this.waitForSocketConnection( () => {
         NotifWebSocketInstance.addCallbacks(
            this.setUnreadNotifications,
            this.setNotifications,
            this.setNewMessages,
            this.setUnreadMessage,
            this.setFriendRequest,
         )
      } )

      this.messageAlertSound = new Audio( messageAlert )
      this.messageAlertSound.load()

      setTimeout( () => {
         NotifWebSocketInstance.fetchNotifications()
         NotifWebSocketInstance.fetchUnreadMessages()
      }, 5000 )
   }

   handleUserNotificationClick = ( slug ) => {
      this.props.getPost( slug )

   }
   removePost = () => {
      this.props.clearPost()

   }

   componentDidUpdate( prevProps, prevState ) {
      if ( prevProps !== this.props ) {
         NotifWebSocketInstance.fetchNotifications()
      }
      // if (prevProps.auth.user.username !== this.props.auth.user.username) {
      //   NotifWebSocketInstance.fetchNotifications();
      // }
   }

   componentWillMount() {
   }

   messageAlertSound

   onSetSidebarOpen = ( state ) => {
      localStorage.setItem( "sidebarState", state )
   }

   handleLogout = () => {
      this.props.logout()
   }

   waitForSocketConnection( callback ) {
      const component = this
      setTimeout( function () {
         // Check if websocket state is OPEN
         if ( NotifWebSocketInstance.state() === 1 ) {
            callback()
            return
         } else {
            component.waitForSocketConnection( callback )
         }
      }, 100 ) // wait 100 milisecond for the connection...
   }

   notify = ( username, message ) => {
      toast.configure()
      toast( username + "\n" + message, {
         position: "bottom-left",
         autoClose: 100,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         type: "success",
      } )
   }

   setNotifications = ( notifications ) => {
      let unread = notifications.filter( ( notification ) => notification.seen === "False" )

      this._isMounted &&
      this.setState( {
         notifications: [ ...this.state.notifications, ...notifications ],
         unread_notifications: this.state.unread_notifications + unread.length,
      } )
   }

   setUnreadMessage = ( count ) => {
      this._isMounted && this.setState( { unread_messages: count } )
   }

   setUnreadNotifications = ( count ) => {
      this._isMounted &&
      this.setState( {
         unread_notifications: count,
      } )
   }

   setNewMessages = ( data ) => {
      if ( data != null ) {
         this.setState( { unread_messages: this.state.unread_messages + 1 } )
         let msg = ""

         data.content.includes( "data:image/" )
            ? ( msg = `${ data.from }: Sent you a Sticker` )
            : ( msg = `${ data.from }: ${ data.content.substring( 0, 10 ) }` )

         if ( data.content != null ) {
            // this.notify(data.from, data.content);

            this.messageAlertSound.play()
         }
      }
   }

   setFriendRequest = ( data ) => {
      // if (!isEmpty(data)) {
      //   Alert.info(data, {
      //     position: "bottom-left",
      //     effect: "genie",
      //     beep: beep
      //   });
   }

   items = ( notifications ) => {
      return notifications.slice( 0, 5 )
                          .map( ( data ) => (
                             <List.Item key={ data.id }>

                                <Image
                                   src={ data.user.profile.avatar }
                                   avatar
                                   style={ {
                                      width: 24,
                                      height: 24,
                                      border: `solid ${ data && data.user && data.user.points && data.user.points.color_code } 2px`,
                                   } }
                                   verticalAlign="middle"
                                />
                                <List.Content>
                                   <List.Header>
                                      { data.user.username }
                                      <span
                                         style={ { paddingLeft: "3px" } }
                                         onClick={ () => this.handleUserNotificationClick( data.details.slug ) }
                                      >
              { data.action }
            </span>
                                      { data.seen === "False" ? (
                                         <span>
                <Icon
                   name="circle"
                   size="tiny"
                   style={ { float: "right", verticalAlign: "top" } }
                   color="blue"
                />
              </span>
                                      ) : (
                                         ""
                                      ) }
                                   </List.Header>
                                   <List.Description>
                                      <span>{ moment( data.timestamp )
                                      .fromNow() }</span>
                                   </List.Description>
                                </List.Content>
                             </List.Item>
                          ) )
   }

   logo = () => {
      return (
         <Card style={ { borderRadius: 0 } }>
            <Card.Content as={ Link } to="/chautari/">
               <Image
                  src={ logo }
                  size="small"
                  style={ { width: 40, padding: 0, float: "left" } }
               />
               <h4 style={ { float: "left", margin: 0, paddingTop: 8 } }>
                  NAMASTE NEPAL
               </h4>
            </Card.Content>
         </Card>
      )
   }

   render() {
      const {
         // activeItem,
         notifications,

         // unread_messages,
         unread_notifications,
         searchKeyword,
      } = this.state

      return (
         <React.Fragment>
            { this.props.post && (
               <Modal
                  open={ this.props.post }
                  closeIcon
                  onClose={ () => this.removePost() }
                  // size=""
                  // style={{ minHeight: 480 }}
               >
                  <Modal.Content>
                     <Post post={ this.props.post }/>
                  </Modal.Content>
               </Modal>
            ) }
            <div>
               <Menu
                  style={ { background: "#DC143C", borderRadius: 0, height: "48px" } }
               >
                  <Menu.Item
                     style={ { boxShadow: "none", border: "none", padding: 0 } }
                  >
                     <Grid>
                        <Grid.Row>
                           <Grid.Column only="mobile tablet">
                              { !this.props.sidebarOpen && (
                                 <Button
                                    style={ { background: "transparent" } }
                                    icon
                                    onClick={ () => this.props.changeSidebarStatus() }
                                 >
                                    <Icon style={ { color: "white" } } name="bars"/>
                                 </Button>
                              ) }
                           </Grid.Column>
                        </Grid.Row>
                     </Grid>
                  </Menu.Item>
                  <Grid>
                     <Grid.Row>
                        { window.location.pathname.includes( "/message" ) && (
                           <Grid style={ { paddingTop: 1 } }>
                              <Grid.Row>
                                 <Grid.Column only="computer">
                                    <Image
                                       as={ Link }
                                       to="/chautari/"
                                       src={ logo3 }
                                       size="small"
                                       style={ { width: 160, paddingTop: 0, float: "left" } }
                                    />
                                 </Grid.Column>
                              </Grid.Row>
                           </Grid>
                        ) }
                        <Grid.Column only="computer tablet">
                           <SearchBar/>
                        </Grid.Column>
                     </Grid.Row>
                  </Grid>
                  <Menu.Item
                     position="right"
                     style={ { paddingRight: "2px" } }
                     className="nav-rightbar-item"
                  >
                     <Grid
                        columns={ 4 }
                        computer={ 6 }
                        mobile={ 16 }
                        className="no-padding"
                        style={ { marginRight: 0 } }
                     >
                        <Grid.Row columns={ 4 }>
                           <Grid.Column width={ 4 } only="mobile">
                              <Label
                                 title="Search"
                                 as="a"
                                 circular
                                 size="large"
                                 style={ {
                                    backgroundColor: "white",
                                    height: 32,
                                    width: 32,
                                    padding: 0,
                                 } }
                              >
                                 <Icon name="search" size="small"/>
                              </Label>
                           </Grid.Column>
                           <Grid.Column width={ 4 } style={ { paddingRight: 22 } }>
                              <Label
                                 title="Message"
                                 as={ Link }
                                 to="/message"
                                 circular
                                 style={ {
                                    backgroundColor: "white",
                                    height: 32,
                                    width: 32,
                                 } }
                              >
                                 <Image
                                    alt="Messages"
                                    src={ messages }
                                    size="mini"
                                    style={ { padding: 0, height: "32px" } }
                                 />
                              </Label>
                           </Grid.Column>

                           <Grid.Column width={ 4 }>
                              <Popup
                                 trigger={
                                    <Label
                                       title="Notifications"
                                       as="a"
                                       circular
                                       style={ {
                                          backgroundColor: "white",
                                          height: 32,
                                          width: 32,
                                       } }
                                    >
                                       <Image
                                          src={ bellImage }
                                          size="mini"
                                          // style={{ padding: 0, height: "auto" }}
                                       />
                                       { unread_notifications !== 0 ? (
                                          <Label
                                             color="blue"
                                             style={ {
                                                top: 2,
                                                padding: 4,
                                                backgroundColor: "blue",
                                                position: "absolute",
                                                borderRadius: "100%",
                                                height: 18,
                                                width: 18,
                                             } }
                                          >
                                             { unread_notifications }
                                          </Label>
                                       ) : (
                                          ""
                                       ) }
                                    </Label>
                                 }
                                 on="click"
                                 closeOnTriggerBlur
                                 closeOnDocumentClick
                                 closeOnEscape
                                 closeOnTriggerClick
                                 wide
                                 className="notificaton"
                                 position="bottom left"
                                 style={ { zIndex: "9999" } }

                                 // onClose
                              >
                                 <Popup.Content>
                                    <List relaxed animated size="tiny" divided>
                                       { notifications === null ? (
                                          <List.Item>
                                             <List.Content>No Notifications Yet</List.Content>
                                          </List.Item>
                                       ) : (
                                          this.items( notifications )
                                       ) }
                                       <Button
                                          size="tiny"
                                          as={ Link }
                                          to={ `/notifications/` }
                                          fluid
                                          className="notification"
                                       >
                                          Show all
                                       </Button>
                                    </List>
                                 </Popup.Content>
                              </Popup>
                           </Grid.Column>

                           <Grid.Column width={ 4 }>
                              <Dropdown
                                 trigger={
                                    <Label
                                       title="Settings"
                                       as="a"
                                       circular
                                       style={ {
                                          backgroundColor: "white",
                                          height: 32,
                                          width: 32,
                                       } }
                                    >
                                       <Image src={ setting } size="mini"/>
                                    </Label>
                                 }
                                 floating
                                 pointing="top left"
                                 direction="left"
                                 icon={ null }
                              >
                                 <Dropdown.Menu>
                                    <Dropdown.Item
                                       as={ Link }
                                       to="/"
                                       onClick={ () => this.handleLogout() }
                                    >
                                       <Icon name="log out"/>
                                       Logout
                                    </Dropdown.Item>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item>
                                       <Icon name="privacy"/>
                                       Privacy Policy
                                    </Dropdown.Item>

                                    <Dropdown.Divider/>

                                    <Dropdown.Item>
                                       <Icon name="database" color="blue"/>
                                       Storage & Technologies
                                    </Dropdown.Item>
                                    <Dropdown.Divider/>

                                    <Dropdown.Item>
                                       <Icon name="clipboard" color="red"/>
                                       Terms & Conditions
                                    </Dropdown.Item>

                                    <Dropdown.Divider/>
                                    <Dropdown.Item>
                                       <Icon name="bell" color="blue"/>
                                       Push Notifications
                                    </Dropdown.Item>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item as={ Link } to="/account-settings/">
                                       <Icon name="setting" color="black"/>
                                       Account Settings
                                    </Dropdown.Item>
                                 </Dropdown.Menu>
                              </Dropdown>
                           </Grid.Column>
                        </Grid.Row>
                     </Grid>
                  </Menu.Item>
               </Menu>
            </div>
         </React.Fragment>
      )
   }
}

export const mapStateToProps = ( state ) => ( {
   user: state.auth.user,
   post: state.posts.post,
   // fetchedPosts: state.search.results,
} )

export const mapDispatchToProps = ( dispatch ) => ( {
   logout: () => dispatch( logout() ),
   getPost: ( slug ) => dispatch( getPost( slug ) ),
   // fetchPost: (title) => dispatch(fetchPost(title)),
   // search: (searchKeyword) => dispatch(search(searchKeyword)),
   clearPost: () => dispatch( clearPost() ),
} )

export default connect( mapStateToProps, mapDispatchToProps )( Navbar )
