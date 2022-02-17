import moment from "moment"
import React, { Component } from "react"
import { Embed, Icon, Image, Modal } from "semantic-ui-react"
import VideoPlayer from "./VideoPlayer"

export default class MessageBubble
   extends Component {
   state = {
      key: "",
      imageModal: false,
   }

   viewImage = ( state, img ) => {
      this.setState( { imageModal: state, img: img } )
   }

   handleMessageClick = ( key ) => {
      if ( this.state.key === key ) {
         this.setState( {
            key: "",
         } )
      } else {
         this.setState( {
            key: key,
         } )
      }
   }

   render() {
      console.log( this.props, "bubble check" )
      const { message, logo } = this.props

      const isAttachment = message.content.substring( 0, 15 ) === "[[ATTACHMENT]]:"

      let attachmentType = "",
         attachmentSrc = ""
      if ( isAttachment ) {
         [ , , attachmentType, attachmentSrc ] = message.content.match(
            /(\[\[\w+]]):(\[\[\w+]]):(.+)/,
         )
      }

      return (
         <div>
            { console.log( "current user", this.props.currentUser ) }
            { console.log( "props", this.props.message ) }
            { this.props.currentUser !== ( this.props.message.author && this.props.message.author.username ) ? (
               <div className="message-received">
                  <ul className="message-block">
                     <li>
                        <Image
                           src={
                              this.props.message && this.props.message.author && this.props.message.author.profile && this.props.message.author.profile.avatar
                           }
                           circular

                           style={
                              this.props.message && this.props.message.author && this.props.message.author.profile_color && {
                                 border: `2px solid ${ this.props.message.author.profile_color }`,
                                 height: 24,
                                 width: 24,
                                 objectFit: "cover",
                                 marginRight: 8,
                              }
                           }

                        />
                     </li>
                     <li>
                <span>
                  { isAttachment ? (
                     attachmentType === "[[IMAGE]]" ? (
                        <Image
                           style={ { background: "white" } }
                           src={ attachmentSrc }
                           onClick={ () => this.viewImage( true, attachmentSrc ) }
                        />
                     ) : attachmentType === "[[VIDEO]]" ? (
                        <Embed
                           icon="right circle arrow"
                           url={ "localhost:3000".concat( attachmentSrc ) }
                        />
                     ) : (
                        <div
                           className="content"
                           onClick={ () => this.handleMessageClick( message.id ) }

                        >
                           { attachmentSrc }
                        </div>
                     )
                  ) : (
                     <div
                        className="content"
                        onClick={ () => this.handleMessageClick( message.id ) }
                     >
                        { message.content }
                        {
                           //   <small className="seenStatus ">
                           //   {message.seen ? <Icon name="checkmark" /> : ""}
                           // </small>
                        }
                     </div>
                  ) }
                </span>
                     </li>
                  </ul>

                  <p
                     style={ {
                        fontSize: 12,
                        paddingLeft: 24,
                        display: this.state.key === message.id ? "block" : "none",
                     } }
                  >
                     { moment( message.created_at )
                     .fromNow() }
                  </p>
               </div>
            ) : (
               <div>
                  <div className="message-sent">
                     <ul>
                        <li>
                  <span color="white">
                    { isAttachment ? (
                       attachmentType === "[[IMAGE]]" ? (
                          <Image
                             style={ { background: "white", objectFit: "contain" } }
                             src={ attachmentSrc }
                             onClick={ () => this.viewImage( true, attachmentSrc ) }
                          />
                       ) : attachmentType === "[[VIDEO]]" ? (
                          // <Embed
                          //     icon='right circle arrow'
                          //     placeholder={attachmentSrc}
                          //     url={attachmentSrc}
                          // />
                          // <video src={attachmentSrc} style={{objectFit: "cover", height: 200, width: "auto"}}/>
                          <VideoPlayer
                             messageID={ message.id }
                             src={ attachmentSrc }
                             handleVideoPlayPause={ this.props.handleVideoPlayPause }
                             playingVideo={ this.props.playingVideo }
                          />
                       ) : (
                          <div
                             className="content"
                             onClick={ () => this.handleMessageClick( message.id ) }
                          >
                             { attachmentSrc }
                          </div>
                       )
                    ) : (
                       <div
                          className="content"
                          onClick={ () => this.handleMessageClick( message.id ) }
                       >
                          { message.content }
                          { message.seen && (
                             <small className="seenStatus ">
                                <Icon name="checkmark"/> : ""
                             </small>
                          ) }
                       </div>
                    ) }
                  </span>
                        </li>
                     </ul>
                     <p
                        style={ {
                           fontSize: 12,
                           display: this.state.key === message.id ? "block" : "none",
                        } }
                     >
                        { moment( message.created_at )
                        .fromNow() }
                     </p>
                  </div>
                  <div style={ { clear: "both" } }></div>
               </div>
            ) }

            <Modal
               open={ this.state.imageModal }
               size="huge"
               closeIcon
               onClose={ () => this.viewImage( false, "" ) }
               style={ { padding: 0, borderRadius: 0 } }
            >
               <Image
                  src={ this.state.img }
                  size="huge"
                  fluid
                  style={ { padding: 0, borderRadius: 0 } }
               />
            </Modal>
         </div>
      )
   }
}
