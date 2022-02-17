import {
   Grid,
   Modal,
   Segment,
   Header,
   List,
   Loader,
   Dimmer,
} from "semantic-ui-react"
import React, { Component } from "react"
import { connect } from "react-redux"
import InfiniteScroll from "react-infinite-scroll-component"
import Post from "./Post/Post"
import { getMorePosts, clearPost } from "src/actions/postActions"

class PostFeed
   extends Component {

   handleGetMorePosts = () => {
      this.props.getMorePosts( this.props.posts.next )
   }

   removePost = () => {
      this.props.clearPost()
   }

   render() {
      const { pinnedPost, posts, post } = this.props
      return (
         <React.Fragment>
            { post && (
               <Modal open={ post } closeIcon onClose={ () => this.removePost() }>
                  <Modal.Content>
                     <Post post={ post }/>
                  </Modal.Content>
               </Modal>
            ) }
            { posts && posts.results && (
               <InfiniteScroll
                  dataLength={ posts.results.length }
                  next={ () => this.handleGetMorePosts() }
                  hasMore={ posts && posts.next }
                  loader={
                     <Segment>
                        <Dimmer active inverted>
                           <Loader inverted/>
                        </Dimmer>
                     </Segment>
                  }
                  height="100vh"
               >
                  <div className="grid-padding">
                     <Grid>
                        { pinnedPost && pinnedPost.pid && (
                           <Grid.Row>
                              <Grid.Column style={ { padding: 0 } }>
                                 <Segment style={ { padding: 0 } }>
                                    <Header
                                       style={ {
                                          paddingLeft: 8,
                                          paddingTop: 8,
                                       } }
                                    >
                                       <List>
                                          <List.Item>
                                             <List.Icon name="pin"/>
                                             <List.Content>Pinned Post</List.Content>
                                          </List.Item>
                                       </List>
                                    </Header>
                                    <Post post={ pinnedPost }/>
                                 </Segment>
                              </Grid.Column>
                           </Grid.Row>
                        ) }

                        { posts &&
                        posts.results &&
                        posts.results.map( ( post, i ) => (
                           <Grid.Row key={ i }>
                              <Grid.Column style={ { padding: 0, paddingBottom: 8 } }>


                                 <Post post={ post } index={ i }/>

                              </Grid.Column>
                           </Grid.Row>
                        ) ) }
                     </Grid>
                  </div>
               </InfiniteScroll>
            ) }
         </React.Fragment>
      )
   }
}

const mapStateToProps = ( state ) => ( {
   posts: state.posts.posts,
   post: state.posts.post,
} )

const mapDispatchToProps = ( dispatch ) => ( {
   getMorePosts: ( url ) => dispatch( getMorePosts( url ) ),
   clearPost: () => dispatch( clearPost() ),
} )

export default connect( mapStateToProps, mapDispatchToProps )( PostFeed )
