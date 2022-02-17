import React, { Component } from "react"

import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
import {
   Grid,
   Label,
   Container,
   Segment,
   Dimmer,
   Loader,
} from "semantic-ui-react"

import isEmpty from "../../validation/is-empty"
import SathiCard from "./SathiLayout/SathiCard"
import SathiCardPlaceHolder from "./SathiLayout/SathiPlaceHolder"
import InfiniteScroll from "react-infinite-scroll-component"
import {
   fetchSuggestedRequests,
   getMoreSuggestedFriends,
   sendFriendRequest,
} from "../../actions/sathiActions"
import { connect } from "react-redux"

class SuggestedFriends
   extends Component {
   state = {
      // toUser: "",
      errors: {},
      loading: false,
   }

   componentDidMount() {
      this.props.fetchSuggestedRequests()
   }

   // handleGetMoreSuggestedFriends = () => {

   // };
   sendFriendRequest = ( user ) => {
      this.props.sendFriendRequest( user )
   }

   viewSuggestedFriendsInChautari() {
      return (
         <Container>
            <Grid>
               <Grid.Row>
                  <Grid.Column>
                     <Carousel
                        autoPlay
                        infiniteLoop
                        showIndicators={ false }
                        showStatus={ false }
                        showThumbs={ false }
                     >
                        { this.viewSuggestedFriends() }
                     </Carousel>
                  </Grid.Column>
               </Grid.Row>
            </Grid>
         </Container>
      )
   }

   viewSuggestedFriends = () => {
      const { suggestedFriends } = this.props
      if ( !isEmpty( suggestedFriends.results ) ) {
         return suggestedFriends.results.map( ( suggestedFriend, i ) => (
            <Grid.Column
               style={ { background: "#f5f5f5" } }
               computer={ this.props.pageCalledFrom === "chautari" ? 16 : 4 }
               mobile={ 16 }
               tablet={ 4 }
               key={ i }
            >
               <InfiniteScroll
                  style={ { overflow: "none" } }
                  dataLength={ suggestedFriends.results.length }
                  next={ () =>
                     this.props.getMoreSuggestedFriends( suggestedFriends.next )
                  }
                  hasMore={ suggestedFriends.next }
                  loader={
                     <Segment>
                        <Dimmer active inverted>
                           <Loader inverted/>
                        </Dimmer>
                     </Segment>
                  }
               >
                  <SathiCard sathi={ suggestedFriend } isTypeOf="suggestedFriends"/>
               </InfiniteScroll>
            </Grid.Column>
         ) )
      } else {
         return <Label style={ { marginLeft: 35 } }>"No suggested friends"</Label>
      }
   }

   render() {
      const { loading } = this.state
      const { pageCalledFrom, suggestedFriends } = this.props
      return (
         <React.Fragment>
            <Grid style={ { background: "#f5f5f5" } }>
               { loading ? (
                  <Grid.Row columns={ pageCalledFrom === "chautari" ? 1 : 4 }>
                     <Grid.Column computer={ 4 } mobile={ 16 }>
                        <SathiCardPlaceHolder/>
                     </Grid.Column>
                     <Grid.Column computer={ 4 } mobile={ 16 }>
                        <SathiCardPlaceHolder/>
                     </Grid.Column>
                     <Grid.Column computer={ 4 } mobile={ 16 }>
                        <SathiCardPlaceHolder/>
                     </Grid.Column>
                     <Grid.Column computer={ 4 } mobile={ 16 }>
                        <SathiCardPlaceHolder/>
                     </Grid.Column>
                  </Grid.Row>
               ) : (
                  <Grid.Row columns={ pageCalledFrom === "chautari" ? 1 : 4 }>
                     { pageCalledFrom !== "chautari"
                        ? this.viewSuggestedFriends()
                        : this.viewSuggestedFriendsInChautari() }
                  </Grid.Row>
               ) }
            </Grid>
         </React.Fragment>
      )
   }
}

const mapStateToProps = ( state ) => ( {
   suggestedFriends: state.sathi.suggestedFriends,
} )

const mapDispatchToProps = ( dispatch ) => ( {
   getMoreSuggestedFriends: ( url ) => dispatch( getMoreSuggestedFriends( url ) ),
   fetchSuggestedRequests: () => dispatch( fetchSuggestedRequests() ),
   sendFriendRequest: ( user ) => dispatch( sendFriendRequest( user ) ),
} )

export default connect( mapStateToProps, mapDispatchToProps )( SuggestedFriends )
