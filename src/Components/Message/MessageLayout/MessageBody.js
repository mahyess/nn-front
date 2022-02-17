import React, { Component } from "react"
import {
   Segment,
   Grid,
   Icon,
   Form,
   Input,
   Image,
   Button,
   Popup, Label,
} from "semantic-ui-react"
import ReactPlayer from "react-player"
import { MdSend } from "react-icons/md"
import EmojiPicker from "emoji-picker-react"

import logo from "../../../img/static/img/logo.png"
import MessageBubble from "./MessageBubble"

class MessageBody
   extends Component {
   state = {
      isMessageReceived: false,
      images: [],
      videos: [],
      playingVideo: null,
   }

   componentDidMount() {
      this.scrollToBottom()
   }

   componentDidUpdate = ( prevProps ) => {
      if ( prevProps !== this.props ) {
         if ( this.props.messages.length > 0 ) {
            this.scrollToBottom()
         }

         if ( this.props.clearAllImages ) {
            this.clearAllImages()
         }
      }
   }

   handleVideoPlayPause = ( messageWithVideoID ) => {
      this.setState( { playingVideo: messageWithVideoID } )
   }

   scrollToBottom = () => {
      const chat = this.messagesEnd
      const scrollHeight = chat.scrollHeight
      const height = chat.clientHeight
      const maxScrollTop = scrollHeight - height
      chat.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
   }

   handleChange = ( e, emojiObject ) => {
      console.log( emojiObject )
      this.props.setMessage( emojiObject.emoji )
   }

   clearAllImages = () => {
      this.setState( {
         images: [],
      } )
   }

   viewImage = ( state, img ) => {
      this.setState( { imageModal: state, img: img } )
   }

   handleImageChange = ( e ) => {
      e.preventDefault()
      if ( e.target.files.length > 3 ) {
         alert( "you can select max 3 files." )
      } else {
         let files = Array.from( e.target.files )

         files.map( ( file ) => {
            let reader = new FileReader()

            reader.onloadend = async () => {
               let temp

               // temp = await downscaleImage(reader.result, file.type, 300, 0.5);

               this.setState( {
                  images: [ ...this.state.images, reader.result ],
               } )
            }
            this.setState( {
               images: [ ...this.state.images ],
            } )
            reader.readAsDataURL( file )
         } )
      }
   }

   handleAttachmentChange = ( e ) => {
      e.preventDefault()
      var files = e.target.files
      if ( files.length > 3 ) {
         alert( "you can select max 3 files." )
      } else {
         let files = Array.from( e.target.files )
         console.log( files )

         this.props.handleAttachmentChange( files )

         // files.map((file) => {
         //   let reader = new FileReader();
         //   reader.loadend = function () {};
         //
         //   reader.onload = async (e) => {
         //     console.log(reader.result);
         //     this.setState({
         //       videos: [...this.state.videos, file],
         //     });
         //   };
         //   this.setState({
         //     videos: [...this.state.videos],
         //   });
         //   // reader.readAsDataURL(file);
         //   reader.readAsDataURL(file);
         // });
      }
   }

   render() {
      console.log(this.props)
      const {
         activeUser,
         messages,
         activeFriend,
         groupName,
      } = this.props
      // console.log(this.props.currentUser,"body chek");
      // console.log(this.props.messages,"messagechek");
      // console.log(this.props.activeFriend,"messagechek");
      return (
         <React.Fragment>
            <div>
               <Segment
                  style={ {
                     padding: 8,
                     paddingLeft: 16,
                     border: "solid 1px rgba(207,207,207,0.23)",
                     borderRadius: "0px",
                     mozBoxShadow: "  0px 10px 11px -1px rgba(207,207,207,0.23)",
                     webkitBoxShadow: " 0px 10px 11px -1px rgba(207,207,207,0.23)",
                     boxShadow: " 0px 10px 11px -7px rgba(207,207,207,0.23)",
                  } }
               >
                  <Grid>
                     <Grid.Row>
                        <Grid.Column>
                           <Grid>
                              <Grid.Row columns={ 2 }>
                                 <Grid.Column computer={ 1 }>
                                    <Image
                                       onClick={ () =>
                                          this.props.setInfoBoxState( "chat info" )
                                       }
                                       src={
                                          activeFriend === null
                                             ? logo
                                             : ""
                                       }
                                       circular
                                       style={ { height: 32, width: 32, objectFit: "cover" } }
                                    />
                                 </Grid.Column>
                                 <Grid.Column computer={ 8 }>
                                    <h4
                                       style={ {
                                          padding:
                                             activeFriend === null || groupName !== "" ? 8 : 0,
                                          margin: 0,
                                       } }
                                    >
                                       { activeFriend === null && groupName === ""
                                          ? "Namaste Nepal Messenger"
                                          : groupName === ""
                                             ? activeFriend.first_name +
                                             " " +
                                             activeFriend.last_name
                                             : groupName }
                                    </h4>
                                    <p>
                                       { activeFriend !== null && groupName === ""
                                          ? "@" + activeFriend.username
                                          : "" }
                                    </p>
                                 </Grid.Column>
                              </Grid.Row>
                           </Grid>
                        </Grid.Column>
                     </Grid.Row>
                  </Grid>
               </Segment>
               { activeUser !== "" ? (
                     ""
                  ) : // <Image src={GIF} />
                  this.props.loading ? (
                     // <Updater />
                     ""
                  ) : (
                     <ul
                        style={ { paddingLeft: 8, paddingRight: 8 } }
                        className="_conversations"
                        ref={ ( el ) => {
                           this.messagesEnd = el
                        } }
                     >
                        { messages.map( ( message, i ) => (
                           <li>
                              <MessageBubble
                                 key={ i }
                                 currentUser={ this.props.currentUser }
                                 message={ message }
                                 logo={ logo }
                                 activeFriend={ this.props.activeFriend }
                                 handleVideoPlayPause={ this.handleVideoPlayPause }
                                 playingVideo={ this.state.playingVideo }
                              />
                           </li>
                        ) ) }
                     </ul>
                  ) }
            </div>
            { activeUser !== "" ? (
               ""
            ) : (
               <Segment
                  style={ {
                     border: "unset",
                     borderRadius: "0px",
                     position: "absolute",
                     bottom: 0,
                     // height: 80,
                     right: 0,
                     left: 0,
                     // maxHeight: 80,
                     mozBoxShadow: " 3px 3px 5px 6px #ccc",
                     webkitBoxShadow: "3px 3px 5px 6px #ccc",
                     boxShadow: " 0px -3px 11px -1px rgba(207,207,207,0.56)",
                  } }
                  className="messageForm"
               >
                  <Grid>
                     <Grid.Row>
                        <Grid.Column>
                           { this.state.videos.map( ( imagePreviewUrl, index ) => {
                              return (
                                 <div
                                    style={ {
                                       width: 100,
                                       position: "relative",
                                       float: "left",
                                    } }
                                 >
                                    <Icon
                                       name="close"
                                       color="black"
                                       size="small"
                                       onClick={ () => {
                                          this.handleClearImage( index )
                                       } }
                                       style={ { position: "absolute", right: 0, top: 16 } }
                                    />
                                    <ReactPlayer
                                       url={ imagePreviewUrl }
                                       height={ 80 }
                                       width={ 160 }
                                       controls
                                    />
                                 </div>
                              )
                           } ) }
                        </Grid.Column>
                     </Grid.Row>

                     <Grid.Row>
                        <Grid.Column>
                           { this.props.attachmentsState.map( ( attachment, index ) => {
                              return (
                                 <div
                                    style={ {
                                       width: 100,
                                       position: "relative",
                                       float: "left",
                                    } }
                                 >
                                    <Icon
                                       name="close"
                                       color="black"
                                       size="small"
                                       onClick={ () =>
                                          this.props.handleClearAttachment( index )
                                       }
                                       style={ { position: "absolute", right: 0, top: 16 } }
                                    />

                                    { attachment.type.includes( "image" ) ? (
                                       <Image
                                          key={ attachment }
                                          size="huge"
                                          alt="previewImg"
                                          style={ {
                                             objectFit: "cover",
                                             height: 100,
                                             width: "auto",
                                          } }
                                          src={ URL.createObjectURL( attachment ) }
                                       />
                                    ) : attachment.type.includes( "video" ) ? (
                                       <video
                                          // type={"file"}
                                          src={ URL.createObjectURL( attachment ) }
                                          style={ {
                                             objectFit: "cover",
                                             height: 100,
                                             width: "auto",
                                          } }
                                       />
                                    ) : (
                                       <Icon
                                          name="user"
                                          color="blue"
                                          size="huge"
                                          src={ URL.createObjectURL( attachment ) }
                                          style={ {
                                             objectFit: "cover",
                                             height: 100,
                                             width: "auto",
                                          } }
                                       />
                                    ) }
                                 </div>
                              )
                           } ) }
                        </Grid.Column>
                     </Grid.Row>
                     <Grid.Row>
                        <Grid.Column computer={ 16 } mobile={ 16 }>
                           <Form
                              size="small"
                              onSubmit={ ( e ) => {
                                 if ( this.props.attachmentsState.length > 0 ) {
                                    this.props.handleAttachmentSend( e, "friends" )
                                 } else {
                                    this.props.sendMessageHandler(
                                       e,
                                       this.props.message,
                                       "friends",
                                    )
                                 }
                              } }
                              className="form"
                           >
                              <Grid>
                                 <Grid.Row columns={ 2 }>
                                    <Grid.Column computer={ 14 }>
                                       <Input
                                          circular
                                          fluid
                                          float="right"
                                          onChange={ this.props.messageChangeHandler }
                                          value={ this.props.message }
                                          name="message"
                                          placeholder="type a message..."
                                          // required
                                          // onFocus={ () =>
                                          //    this.props.sendSeenStatus( this.props.messageType )
                                          // }
                                       >
                                          <input
                                             style={ {
                                                border: "unset",
                                                // borderBottom: "solid 1px #e0e1e2",
                                                borderRadius: 0,
                                                minHeight: 40,
                                             } }
                                          />
                                       </Input>
                                    </Grid.Column>
                                    <Grid.Column computer={ 2 }>
                                       <Button
                                          fluid
                                          style={ {
                                             borderRadius: 0,
                                             minHeight: 40,
                                             background: "white",
                                          } }
                                       >
                                          <h2>
                                             <MdSend/>
                                          </h2>
                                       </Button>
                                    </Grid.Column>
                                 </Grid.Row>
                              </Grid>
                           </Form>
                        </Grid.Column>
                     </Grid.Row>
                     <Grid.Row style={ { padding: 0 } }>
                        <h3 style={ { margin: 0, padding: 0, paddingLeft: 8 } }>
                           <Icon
                              name="paperclip"
                              color="red"
                              onClick={ this.handleSendImageModal }
                           />
                        </h3>
                        <h3 style={ { margin: 0, padding: 0, paddingLeft: 8 } }>
                           <Label for="image-upload" class="custom-file-upload">
                              <Icon name="image" color="red"/>
                           </Label>
                           <input
                              style={ { display: "none" } }
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={ this.handleAttachmentChange }
                           />
                        </h3>
                        <h3 style={ { margin: 0, padding: 0, paddingLeft: 8 } }>
                           <Label for="video-upload" class="custom-file-upload">
                              <Icon name="video" color="red"/>
                           </Label>
                           <input
                              style={ { display: "none" } }
                              className="message_input"
                              id="video-upload"
                              type="file"
                              accept="video/*, image/*"
                              multiple
                              onChange={ this.handleAttachmentChange }
                           />
                        </h3>
                        <h3 style={ { margin: 0, padding: 0, paddingLeft: 8 } }>
                           <Popup
                              on="click"
                              pinned
                              position="top center"
                              trigger={ <Icon name="smile" color="red"/> }
                              style={ { padding: 0 } }
                           >
                              <EmojiPicker
                                 preload
                                 onEmojiClick={ ( e, emojiObject ) =>
                                    this.handleChange( e, emojiObject )
                                 }
                              />
                           </Popup>
                        </h3>
                        <h3 style={ { margin: 0, padding: 0, paddingLeft: 8 } }>
                           <Icon
                              onClick={ () => this.props.setInfoBoxState( "emoji" ) }
                              name="smile"
                              color="red"
                           />
                        </h3>
                     </Grid.Row>
                  </Grid>
               </Segment>
            ) }
         </React.Fragment>
      )
   }
}

export default MessageBody
