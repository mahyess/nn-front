import { Comment } from "semantic-ui-react"
import React, { Component } from "react"

import InfiniteScroll from "react-infinite-scroll-component"
import { connect } from "react-redux"
import { addReplyComment } from "src/actions/postActions"
import {
   getComments,
   getMoreComments,
   handleCommentDownvote,
   handleCommentUpvote,
   handleAddComment,
} from "src/actions/commentActions"

import "./postcomment.css"
import CommentCard from "./CommentCard"
import PostCommentInput from "./PostCommentInput"


class PostComment
   extends Component {
   constructor( props ) {
      super( props )
      this.state = {
         currentState: false,
         replyShown: false,
         parentComment: "",
         currentCommentId: "",
      }
   }

   fetchMoreComments = () => {
      this.props.post.comments.next &&
      this.props.getMoreComments(
         this.props.post.comments.next,
         this.props.post.pid,
      )
   }

   handleCommentUpvote = ( pid, cid ) => {
      this.props.handleCommentUpvote( pid, cid )
   }

   handleCommentDownVote = ( pid, cid ) => {
      this.props.handleCommentDownvote( pid, cid )
   }

   handleAddComment = ( pid, comment ) => {
      this.props.handleAddComment( pid, comment )
      this.setState( { currentState: true } )
   }

   handleAddReplyComment = ( postId, comment ) => {
      const { parentComment } = this.state
      console.log( postId, parentComment, comment )
      this.props.addReplyComment( postId, comment, parentComment )
      this.toggleReplyVisibility( parentComment )
      this.setState( { parentComment: "" } )
   }

   handleReplyCommentChange = ( e ) => {
      this.setState( {
         parentComment: e.target.value,
      } )
   }

   toggleReplyVisibility = ( commentId ) => {
      const { replyShown } = this.state
      if ( this.state.currentCommentId === commentId ) {
         this.setState( {
            replyShown: !replyShown,
         } )
      } else {
         this.setState( {
            replyShown: true,
            currentCommentId: commentId,
         } )
      }
   }

   render() {
      return (
         <React.Fragment>
            { this.props.post.comments && (
               <InfiniteScroll
                  dataLength={ this.props.post.comments.results.length }
                  next={ this.fetchMoreComments }
                  hasMore={ !!this.props.post.comments.next }
                  height={ 300 }
                  loader={ <h4>Loading.....</h4> }
                  style={ {
                     marginTop: 8,
                     marginBottom: 8,
                  } }
               >
                  <Comment.Group size="large">
                     <Comment
                        style={ {
                           marginTop: 8,
                           marginBottom: 16,
                           minHeight: "10vh",
                           maxHeight: "35vh",
                        } }
                     >
                        { this.props.post.comments
                           ? this.props.post.comments.results.map( ( comment, i ) => (
                              <div>
                                 <CommentCard
                                    username={ comment.user.username }
                                    avatar={ comment.user.profile.avatar }
                                    comment={ comment.comment }
                                    userPointColor={ comment.user.points.color_code }
                                    timeStamp={ comment.timestamp }
                                    totalVote={ comment.total_votes }
                                    commentId={ comment.id }
                                    postId={ this.props.post.pid }
                                    voteStatus={ comment.user_vote_status }
                                    handleCommentUpvote={ this.handleCommentUpvote }
                                    handleCommentDownvote={ this.handleCommentDownVote }
                                    handleAddReplyComment={ this.handleAddReplyComment }
                                    handleReplyCommentChange={ this.handleReplyCommentChange }
                                 />
                                 { comment.replies &&
                                 comment.replies.length !== 0 &&
                                 comment.replies.map( ( commentReply, i ) => (
                                    <Comment.Group>
                                       <Comment>
                                          <CommentCard
                                             username={ commentReply.user.username }
                                             avatar={ commentReply.user.profile.avatar }
                                             comment={ commentReply.comment }
                                             parentId={ commentReply.comment.id }
                                             userPointColor={ commentReply.user.points.color_code }
                                             timeStamp={ commentReply.timestamp }
                                             totalVote={ commentReply.total_votes }
                                             commentId={ commentReply.id }
                                             postId={ this.props.post.pid }
                                             voteStatus={ commentReply.user_vote_status }
                                             handleCommentUpvote={ this.handleCommentUpvote }
                                             handleCommentDownvote={ this.handleCommentDownVote }
                                             handleAddReplyComment={ this.handleAddReplyComment }
                                             handleReplyCommentChange={ this.handleReplyCommentChange }
                                             state={ this.props.post.comments }
                                          />
                                       </Comment>
                                    </Comment.Group>
                                 ) ) }
                              </div>
                           ) )
                           : "" }
                     </Comment>
                  </Comment.Group>
               </InfiniteScroll>
            ) }
            <PostCommentInput
               placeHolderText="Add your comment"
               handleAddComment={ this.handleAddComment }
               postId={ this.props.post.pid }
               state={ this.props.post.comments }
            />
         </React.Fragment>
      )
   }
}

const mapStateToProps = ( state ) => {
   return {
      user: state.auth.user,
   }
}

const mapDispatchToProps = ( dispatch ) => {
   return {
      getComments: ( pid ) => dispatch( getComments( pid ) ),
      getMoreComments: ( url, pid ) => dispatch( getMoreComments( url, pid ) ),
      handleCommentDownvote: ( pid, cid ) =>
         dispatch( handleCommentDownvote( pid, cid ) ),
      handleCommentUpvote: ( pid, cid ) => dispatch( handleCommentUpvote( pid, cid ) ),
      handleAddComment: ( pid, comment ) =>
         dispatch( handleAddComment( pid, comment ) ),
      addReplyComment: ( pid, comment, parentId ) =>
         dispatch( addReplyComment( pid, comment, parentId ) ),
   }
}

export default connect( mapStateToProps, mapDispatchToProps )( PostComment )
