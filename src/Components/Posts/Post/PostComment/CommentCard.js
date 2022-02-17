import React, { Component } from "react"
import { Comment, Image, Grid, Label, Icon } from "semantic-ui-react"

import moment from "moment"

import "./commentcard.css"
import PostCommentInput from "./PostCommentInput"

class CommentCard
   extends Component {
   state = {
      isShowReplyForm: false,
   }

   toggleReplyForm = () => {
      this.setState( {
         isShowReplyForm: !this.state.isShowReplyForm,
      } )
   }

   render() {
      const {
         username,
         avatar,
         userPointColor,
         totalVote,
         timeStamp,
         comment,
         commentId,
         postId,
         voteStatus,
      } = this.props
      return (
         <Comment className="comment-avatar" style={ {} }>
            <Grid>
               <Grid.Row columns={ 2 } style={ { padding: 0 } }>
                  <Grid.Column computer={ 1 } mobile={ 2 } style={ { padding: 0 } }>
                     <Image src={ avatar } style={ { borderColor: userPointColor, position: "relative" } }/>
                  </Grid.Column>
                  <Grid.Column style={ { paddingBottom: "5px" } } className="comment-text"
                  >
                     <Label
                        className="comment-text"
                        style={ {
                           background: "#f7f7f7",
                           borderRadius: "16px",


                        } }
                     >
                        <Comment.Content>
                           <Comment.Author as="a" style={ { padding: 0 } }>
                              { username }
                           </Comment.Author>

                           <Comment.Metadata>
                    <span style={ { color: "#969696" } }>
                      { moment( timeStamp )
                      .fromNow() }
                       <Icon
                          name="star"
                          color="green"
                          style={ { paddingLeft: 8, paddingRight: 10 } }
                       />
                       { totalVote } Votes
                    </span>
                           </Comment.Metadata>


                           <Comment.Text
                           >
                              { comment }
                           </Comment.Text>


                           <Comment.Actions style={ { color: "#969696" } }>
                              <Comment.Action
                                 style={ {
                                    color: voteStatus === 1 ? "blue" : "#969696",
                                 } }
                                 onClick={ () =>
                                    this.props.handleCommentUpvote( postId, commentId )
                                 }
                              >
                                 <Icon name="arrow alternate circle up " color=""/>
                                 UpVote
                              </Comment.Action>
                              <Comment.Action
                                 style={ {
                                    color: voteStatus === -1 ? "red" : "#969696",
                                 } }
                                 onClick={ () =>
                                    this.props.handleCommentDownvote( postId, commentId )
                                 }
                              >
                                 <Icon name="arrow alternate circle down" color=""/>
                                 DownVote
                              </Comment.Action>
                              <span onClick={ this.toggleReplyForm }>Reply</span>
                           </Comment.Actions>
                        </Comment.Content>
                     </Label>
                  </Grid.Column>
               </Grid.Row>
               { this.state.isShowReplyForm && (
                  <Grid.Row
                     style={ {
                        paddingLeft: "32px",
                        paddingRight: 32,
                        paddingTop: 8,
                        paddingBottOm: 0,
                     } }
                  >
                     <Grid.Column>
                        <PostCommentInput
                           placeHolderText={ "Reply Comment" }
                           handleAddComment={ this.props.handleAddReplyComment }
                           postId={ this.props.postId }
                           state={ this.props.state }
                           parentId={ this.props.commentId }
                        />
                     </Grid.Column>
                  </Grid.Row>
               ) }
            </Grid>
         </Comment>
      )
   }
}

export default CommentCard
