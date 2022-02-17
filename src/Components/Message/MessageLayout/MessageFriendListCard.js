import React, { Component } from "react"
import { List, Image, Grid, Icon } from "semantic-ui-react"
import isMessageActivity from "src/Components/Message/validation/isMessageActivity"

import isImage from "../validation/is-Image"
import moment from "moment"

class MessageFriendListCard
   extends Component {
   render() {
      return (
         <List.Item
            style={ { padding: 8 } }
            onClick={ () => this.props.handleMessageCardClick( this.props.messageCard.id, this.props.messageCard.title ) }
         >
            <div style={ { float: "left", paddingRight: 8 } }>
               <Image
                  style={ { float: "left", height: 32, width: 32 } }
                  avatar
                  src={ this.props.messageCard.icon }
               />
            </div>

            <List.Content>
               <List.Header as="a">
                  { this.props.messageCard.title }
                  <div
                     style={ {
                        backgroundColor: "green",
                        height: 8,
                        width: 8,
                        borderRadius: 8,
                        float: "right",
                     } }
                  />
               </List.Header>
               <List.Description style={ { paddingTop: 4 } }>
                  <Grid>
                     <Grid.Row columns={ 2 }>
                        <Grid.Column computer={ 12 }>

                           { isImage( this.props.messageCard.last_message.content ) ? (
                                 <>
                                    <Icon name="image" verticalAlign="middle"/>
                                    { this.props.messageCard.title } <span> Sent You Photo Image</span>
                                 </>
                              ) :
                              isMessageActivity( this.props.messageCard.last_message.content ) ? ( <>
                                    <Icon name="clipboard" verticalAlign="middle"/>
                                    <span>{ this.props.messageCard.last_message.content.replace( '[[ACTIVITY]]:', '' ) }</span>
                                 </> ) :
                                 ( <div
                                       style={ {
                                          whiteSpace: "nowrap",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          maxWidth: "160px",
                                          float: "left",
                                       } }
                                    >
                                       { this.props.messageCard.last_message.content }
                                    </div>
                                 )
                           }
                        </Grid.Column>
                        <Grid.Column computer={ 4 }>
                           <p style={ { fontSize: 12 } }>
                              {
                                 moment( this.props.messageCard.last_message.created_at )
                                 .format( "HH:mm" )
                              }
                           </p>
                        </Grid.Column>
                     </Grid.Row>
                  </Grid>
               </List.Description>
            </List.Content>
         </List.Item>
      )
   }
}

export default MessageFriendListCard
