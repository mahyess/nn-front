import React from "react"
import { Card, Icon, Grid, Divider } from "semantic-ui-react"
import { getComments } from "src/actions/commentActions"
import { postLike } from "src/actions/postActions"
import { handlePinnedPost } from "src/actions/samajActions"
import { connect } from "react-redux"
// import styles from "./post.module.css";

import PostComment from "./PostComment/PostComment"
import PostHeader from "./PostBody/PostHeader"
import PostBody from "./PostBody/PostBody"
import PostControls from "./PostBody/PostControls"

const CommentsComponent = ( { props } ) => (
   <>
      <Divider style={ { margin: 0, marginTop: 8, padding: 0 } }/>
      <Grid>
         <Grid.Row>
            <Grid.Column width={ 10 } style={ { padding: 0 } }>
               <p>
                  TOP CHALFAL
                  <span>
              <Icon style={ { marginLeft: 10 } } name="caret down"/>
            </span>
               </p>
            </Grid.Column>
            <Grid.Column width={ 6 } textAlign="right">
               <Icon style={ { marginLeft: 10 } } name="refresh"/>
            </Grid.Column>
         </Grid.Row>
      </Grid>
      <PostComment { ...props } />
   </>
)

/**
 * @param {{
 * total_likes: number
 * likes: Array
 * }} data
 */

class Post
   extends React.Component {
   constructor( props ) {
      super( props )
      this.state = {
         showComments: false,
         postIsLiked: null,
      }
   }

   handleLikeClick = ( pid, userId ) => {
      this.props.postLike( pid, userId )
   }

   handlePinnedPost = ( post ) => {
      this.props.handlePinnedPost( post )
   }

   handleShowCommentsClick = ( pid ) => {
      this.props.getComments( pid )
      this.setState( ( prevState ) => ( {
         showComments: !prevState.showComments,
      } ) )
   }

   render() {
      const { post, contentFrom, user } = this.props
      const { showComments } = this.state
      return (
         <Card fluid>
            <Card.Header style={ { padding: 8 } }>
               <PostHeader
                  { ...this.props }
                  handlePinnedPost={ this.handlePinnedPost }
                  samajAdmin={ this.props.samajDetail }
                  user={ user }
               />
            </Card.Header>

            <Card.Content>
               <PostBody
                  { ...this.props }
                  likesCount={ post.total_likes }
                  handleShowCommentsClick={ this.handleShowCommentsClick }
               />

               { contentFrom !== "share" && (
                  <PostControls
                     { ...this.props }
                     handleShowCommentsClick={ this.handleShowCommentsClick }
                     handleLikeClick={ this.handleLikeClick }
                     userId={ user && user.id }
                     postIsLiked={ user && post.likes.includes( user.id ) }
                  />
               ) }
               { showComments && <CommentsComponent props={ this.props }/> }
            </Card.Content>
         </Card>
      )
   }
}

const mapStateToProps = ( state ) => ( {
   user: state.auth.user,
   samajDetail: state.samaj.samajDetail,
} )

const mapDispatchToProps = ( dispatch ) => ( {
   getComments: ( id ) => dispatch( getComments( id ) ),
   postLike: ( pid, userId ) => dispatch( postLike( pid, userId ) ),
   handlePinnedPost: ( postId ) => dispatch( handlePinnedPost( postId ) ),
   // getPinnedPost: (samajId) => dispatch(getPinnedPost(samajId)),
} )

export default connect( mapStateToProps, mapDispatchToProps )( Post )
export { CommentsComponent }
