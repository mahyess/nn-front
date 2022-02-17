import React, { Component } from "react"
import { Card, Divider, Grid, Header } from "semantic-ui-react"
import { connect } from "react-redux"
import { getHashTagPosts } from "../../actions/hashTagAction"
import PostFeed from "../Posts/PostFeed"
import PlaceHolder from "../PlaceHolder/PlaceHolder"

class HashTag
   extends Component {
   componentDidMount() {
      this.props.getHashTagPosts( this.props.match.params.hashtag )
   }

   render() {
      return (
         <React.Fragment>
            <Grid
               className="no-margin"
               style={ { background: "#f5f5f5", padding: 0 } }
            >
               <Grid.Row>
                  <Grid.Column computer={ 8 } mobile={ 16 }>
                     <Grid.Row>
                        <Header
                           as="h3"
                           dividing
                           style={ {
                              textAlign: "center",
                              marginTop: "5px",
                              background: "#ffff",
                              height: "39px",
                              lineHeight: "32px",
                           } }
                        >
                           #{ this.props.match.params.hashtag }
                        </Header>
                        { this.props.isLoading ? <PlaceHolder/> : <PostFeed/> }
                     </Grid.Row>
                  </Grid.Column>
               </Grid.Row>
            </Grid>
         </React.Fragment>
      )
   }
}

const mapStateToProps = ( state ) => {
   return {
      // user: state.auth.user,
      posts: state.posts.posts,
      isLoading: state.posts.isLoading,
   }
}

const mapDispatchToProps = ( dispatch ) => {
   return {
      getHashTagPosts: ( hashtag ) => dispatch( getHashTagPosts( hashtag ) ),
   }
}
export default connect( mapStateToProps, mapDispatchToProps )( HashTag )
