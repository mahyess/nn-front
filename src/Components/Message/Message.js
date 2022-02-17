import Axios from "axios"
import axios from "axios"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Button, Divider, Dropdown, Form, Grid, Header, Icon, Image, List, Modal } from "semantic-ui-react"
import { getChatList, getGroupChatList, initMessage, sendAttachment } from "src/actions/messageActions"
import { getSathiLists } from "src/actions/sathiActions"
import StickersList from "src/Components/Message/MessageLayout/Stickers"
import GroupChatInstance from "../../services/GroupChat"
import MessageBody from "./MessageLayout/MessageBody"
import MessageFriendListCard from "./MessageLayout/MessageFriendListCard"
import MessageRightUserInfo from "./MessageLayout/MessageRightUserInfo"


class Message
   extends Component {
   state = {
      activeItem: "messages",
      DOMLoaded: false,
      activeGroup: 0,
      activeFriend: null,
      messages: [],
      imageModal: false,
      message: "",
      sendImageModal: false,
      groupChatModal: false,
      groupName: "",
      groupChats: [],
      participants: [],
      images: [],
      messageType: "friends",
      clearAllImages: false,
      infoBoxVisible: false,
      sideViewOption: "chat info",
      attachments: [],
   }

   componentDidMount = async () => {
      GroupChatInstance.connect()
      this.waitForGroupChatConnection( () => {
         GroupChatInstance.addCallbacks(
            this.setMessages.bind( this ),
            this.addGroupMessage.bind( this ),
         )
      } )

      if ( this.props.match.params.username ) {
         await this.props
                   .initMessage( this.props.match.params.username )
                   .then( res => {
                      this.setState( {
                         activeGroup: res.data.id,
                         groupName: res.data.title,
                         loading: true,
                      }, () => this.fetchGroupMessages( () => {
                         this.setState( { loading: false } )
                      } ) )
                   } )
                   .catch( err => console.error( err ) )
      }
      this.props.getMessageFriend()
   }

   setMessagesEnd = ( messagesEnd ) => this.messagesEnd = messagesEnd

   setMessage = ( message ) => this.setState( { message: this.state.message + message } )

   handleMessageCardClick = ( groupID, chatTitle ) => {
      this.setState( {
         activeUser: chatTitle,
         activeGroup: groupID,
         groupName: chatTitle,
         loading: true,
         messages: [],
      } )
      this.fetchGroupMessages( () => {
         this.setState( { loading: false } )
      } )
   }

   //connect to group-chat-websocket
   waitForGroupChatConnection = ( callback ) => {
      let loopCount = 1
      const component = this
      setTimeout( () => {
         // Check if websocket state is OPEN
         if ( GroupChatInstance.state() === 1 ) {
            callback()
         } else {
            loopCount++
            component.waitForGroupChatConnection( callback )
         }
      }, 100 * loopCount ** 2 ) // wait 100 milliseconds for the connection...
   }

   //set messages from websocket
   setMessages = ( messages ) => {
      if ( messages ) {
         this.setState( { messages: [ ...new Set( messages.reverse() ) ] } )
      }
   }

   addGroupMessage = ( message ) => {
      if ( this.state.activeGroup === message.group ) {
         this.setState( {
            messages: [ ...this.state.messages, message ],
         } )
      }
   }

   //view message form in pop up model
   viewImage = ( modalState, img ) => this.setState( {
      imageModal: modalState,
      img: img,
   } )

   //message text field changer
   messageChangeHandler = ( e ) => this.setState( {
      message: e.target.value,
   } )

   //send message handler
   sendMessageHandler = ( e, message ) => {
      e.preventDefault()

      if ( message !== null ) {
         GroupChatInstance.newChatMessage( {
            groupID: this.state.activeGroup,
            content: message,
         } )
         this.setState( {
            message: "",
         } )
      }
   }

   //handle image select
   handleSendAttachmentModal = () => {
      this.setState( {
         sendAttachmentModal: !this.state.sendAttachmentModal,
         images: [],
      } )
   }

   handleAttachmentChange = ( attachments ) => {
      this.setState( { attachments: attachments } )
   }

   handleClearAttachment = ( i ) => {
      this.setState( { attachments: this.state.attachments.filter( ( attachment, index ) => i !== index ) } )
   }

   // handle send videos
   handleAttachmentSend = ( e ) => {
      for ( const attachment of this.state.attachments ) {
         let formData = new FormData()
         formData.append( "to_user", this.state.activeFriend.username )
         formData.append( "attachment", attachment, attachment.name )

         axios
         .post( `/api/messages/${ this.state.activeGroup }}/attachments/`, formData )
         .then( ( res ) => {
            this.sendMessageHandler( e, res.data.instance.content )
         } )
         .catch( ( err ) => {
            console.log( err )
         } )
      }
      this.setState( { attachments: [] } )
   }

   // Group Chat
   handleDropChange = ( e, { value } ) => this.setState( { participants: value } )

   handleNameChange = ( e ) => this.setState( { [e.target.name]: e.target.value } )
   //handleGroupChatModel
   handleGroupChatModel = () => {
      // this.fetchAllFriends();
      this.setState( {
         groupName: "",
         participants: [],
         groupChatModal: !this.state.groupChatModal,
      } )
   }

   fetchGroupMessages = async ( callback ) => {
      let promise = new Promise( ( resolve, reject ) => {
         try {
            GroupChatInstance.initChat( this.state.activeGroup )
            setTimeout( () => {
               GroupChatInstance.fetchMessages( this.state.activeGroup )
               resolve()
            }, 1000 )
         } catch ( err ) {
            reject( `error occurred: ${ err }` )
         }
      } )
      await promise
      callback()
      return
   }

   handleGroupChat = ( e ) => {
      e.preventDefault()
      let formData = new FormData()
      formData.append( "groupName", this.state.groupName )
      formData.append( "participants", this.state.participants )

      Axios.post( "/api/messages/group-message/create/", formData )
           .then( ( res ) => {
              this.setState( { groupChatModal: false } )
              this.props.getGroupChatList()
              // Alert.success(res.data.success, {
              //   position: "bottom-left",
              //   effect: "jelly",
              //   timeout: 2000,
              // });
           } )
           .catch( ( err ) => {
              this.setState( { groupChatModal: false } )
              // Alert.error(err.response.error, {
              //   position: "bottom-left",
              //   effect: "jelly",
              //   timeout: 2000,
              // });
           } )
   }

   getGroupChats = () => this.state.groupChats.length ? this.state.groupChats.map( ( groupChat ) => (
         <List.Item
            name={ groupChat.name }
            active={ this.state.activeUser === groupChat.name }
            onClick={ () =>
               this.handleGroupClick( {
                  name: groupChat.name,
                  id: groupChat.id,
               } )
            }
            key={ groupChat.id }
            style={ {
               cursor: "pointer",
               clear: "none",
            } }
         >
            {/* <Image avatar src={namaste} /> */ }
            <List.Content>
               <Header>
                  <Header.Content>
                     { groupChat.name }
                     <Header.Subheader>
                    <span
                       style={ {
                          color: "gray",
                          fontSize: "12px",
                          float: "left",
                          fontWeight: "lighter",
                       } }
                    >
                      Message
                    </span>
                     </Header.Subheader>
                  </Header.Content>
               </Header>
            </List.Content>
            <List.Content floated="right">
               <Icon
                  name="info circle"
                  color="blue"
                  link={ true }
                  onClick={ () => this.handleGroupInfoModal( groupChat.id ) }
               />
               {/* {moment(data.created_at).fromNow()} */ }
            </List.Content>
         </List.Item>
      ) )
      : "No Groups Yet"

   setInfoBoxState = ( viewOption ) => {
      this.setState( {
         infoBoxVisible: !this.state.infoBoxVisible,
         sideViewOption: viewOption,
      } )
   }

   render() {
      const {
         activeItem,
         groupChatModal,
         messages,
         imageModal,
         sendAttachmentModal,
      } = this.state
      const activeUser = ""

      const currentUser = this.props.auth.user && this.props.auth.user.username

      const { messageFriends, friendLists, groupChatList } = this.props
      const _friendsList = friendLists.results.map( ( res ) => ( {
         key: res.id,
         text: res.username,
         value: res.username,
      } ) )

      return (
         <Grid style={ {
            height: "100%",
            background: "#f0f0f0",
         } }>
            <Grid.Row columns={ 3 } style={ { height: "100%" } }>
               <Grid.Column mobile={ 16 } computer={ 4 } style={ { background: "white" } }>
                  <Grid>
                     <Grid.Row>
                        <Grid.Column>
                           <Divider horizontal>
                              <Header as='h4'>
                                 <Icon name='mail'/>
                                 Messages
                              </Header>
                           </Divider>

                        </Grid.Column>
                     </Grid.Row>
                     <Grid.Row>
                        <Grid.Column style={ { padding: 0 } }>
                           <List divided relaxed>
                              { messageFriends.results &&
                              messageFriends.results.map( ( messageCard ) => (
                                 <MessageFriendListCard
                                    messageCard={ messageCard }
                                    handleMessageCardClick={ this.handleMessageCardClick }
                                 />
                              ) ) }
                           </List>
                        </Grid.Column>
                     </Grid.Row>
                  </Grid>
               </Grid.Column>

               <Grid.Column
                  computer={ this.state.infoBoxVisible ? 8 : 12 }
                  mobile={ 16 }
                  className={ activeUser !== "" ? "_box" : "messages" }
                  style={ {
                     background: "white",
                     borderRight: "solid 2px #f0f0f0",
                     borderLeft: "solid 2px #f0f0f0",
                  } }
               >
                  <MessageBody
                     setMessagesEnd={ this.setMessagesEnd }
                     activeUser={ activeUser }
                     loading={ this.state.loading }
                     messages={ messages }
                     messageChangeHandler={ this.messageChangeHandler }
                     message={ this.state.message }
                     sendSeenStatus={ this.sendSeenStatus }
                     messageType={ this.state.messageType }
                     setMessage={ this.setMessage }
                     sendMessageHandler={ this.sendMessageHandler }
                     currentUser={ currentUser }
                     activeFriend={ this.state.activeFriend }
                     groupName={ this.state.groupName }
                     handleSendImageModal={ this.handleSendAttachmentModal }
                     handleImageSend={ this.handleImageSend }
                     handleAttachmentSend={ this.handleAttachmentSend }
                     clearAllImages={ this.state.clearAllImages }
                     setInfoBoxState={ this.setInfoBoxState }
                     handleAttachmentChange={ this.handleAttachmentChange }
                     attachmentsState={ this.state.attachments }
                     handleClearAttachment={ this.handleClearAttachment }
                  />
               </Grid.Column>

               { this.state.infoBoxVisible && (
                  <Grid.Column
                     computer={ 4 }
                     style={ {
                        background: "#f0f0f0",
                     } }
                  >
                     <Grid>
                        <Grid.Row>
                           <Grid.Column>
                              { this.state.sideViewOption === "chat info" ? (
                                 <MessageRightUserInfo
                                    activeFriend={ this.state.activeFriend }
                                    friend={ this.state.activeFriend }
                                 />
                              ) : (
                                 <StickersList/>
                              ) }
                           </Grid.Column>
                        </Grid.Row>
                     </Grid>
                  </Grid.Column>
               ) }

               <Modal
                  open={ imageModal }
                  size="huge"
                  closeIcon
                  onClose={ () => this.viewImage( false, "" ) }
                  style={ {
                     padding: 0,
                     borderRadius: 0,
                  } }
               >
                  <Image
                     src={ this.state.img }
                     size="huge"
                     fluid
                     style={ {
                        padding: 0,
                        borderRadius: 0,
                     } }
                  />
               </Modal>

               <Modal
                  open={ groupChatModal }
                  onClose={ this.handleGroupChatModel }
                  closeIcon
               >
                  <Modal.Header>Group Chat</Modal.Header>
                  <Modal.Content>
                     <Form onSubmit={ this.handleGroupChat }>
                        <Form.Field>
                           <Form.Input
                              fluid
                              type="text"
                              placeholder="Group name"
                              name="groupName"
                              onChange={ this.handleNameChange }
                              value={ this.state.groupName }
                           />
                        </Form.Field>
                        <Form.Field>
                           <Dropdown
                              placeholder="Friends"
                              fluid
                              multiple
                              search
                              selection
                              options={ _friendsList }
                              value={ this.state.participants }
                              name="participants"
                              onChange={ this.handleDropChange }
                           />
                        </Form.Field>

                        <Button fluid primary className="mt">
                           <Icon name="plus"/> Create Group
                        </Button>
                     </Form>
                  </Modal.Content>
               </Modal>

               {/* Send Image */ }
               <Modal
                  open={ sendAttachmentModal }
                  onClose={ this.handleSendAttachmentModal }
                  closeIcon
                  size="mini"
               >
                  <Modal.Content scrolling>
                     <Image.Group size="tiny">
                        { this.state.images.map( ( imagePreviewUrl ) => (
                           <Image
                              key={ imagePreviewUrl }
                              size="huge"
                              alt="previewImg"
                              src={ imagePreviewUrl }
                           />
                        ) ) }
                     </Image.Group>
                     <Form>
                        <Form.Field>
                           <Form.Input
                              fluid
                              type="file"
                              name="images"
                              onChange={ this.handleImageChange }
                              className="upload"
                              accept="image/*"
                              multiple
                           />
                        </Form.Field>
                        <Button.Group fluid>
                           <Button
                              className="mt"
                              basic
                              negative
                              onClick={ this.clearSelection }
                           >
                              <Icon name="delete"/> clear
                           </Button>
                           <Button
                              primary
                              className="mt"
                              onClick={ () => this.handleImageSend( "friends" ) }
                           >
                              <Icon name="send"/> Send
                           </Button>
                        </Button.Group>
                     </Form>
                  </Modal.Content>
               </Modal>
            </Grid.Row>
         </Grid>
      )
   }
}

const mapStateToProps = ( state ) => ( {
   messageFriends: state.message.messageSathiLists,
   groupChatList: state.message.groupChatList,
   friendLists: state.sathi.sathiLists,
   auth: state.auth,
} )

const mapDispatchToProps = ( dispatch ) => ( {
   getMessageFriend: () => dispatch( getChatList() ),
   getGroupChatList: () => dispatch( getGroupChatList() ),
   getSathiLists: () => dispatch( getSathiLists() ),
   sendAttachment: ( formData ) => dispatch( sendAttachment( formData ) ),
   initMessage: ( username ) => dispatch( initMessage( username ) ),
} )

export default connect( mapStateToProps, mapDispatchToProps )( Message )
