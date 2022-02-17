import React, { Component } from "react"
import {
   Card,
   Dimmer,
   Divider,
   Grid,
   Loader,
   Segment,
} from "semantic-ui-react"
import {
   getMoreSathiLists,
   getSathiLists,
   getSathiProfile,
} from "src/actions/sathiActions"
import { connect } from "react-redux"

import InfiniteScroll from "react-infinite-scroll-component"
import SathiCard from "./SathiLayout/SathiCard"
import SathiCardPlaceHolder from "./SathiLayout/SathiPlaceHolder"
import isEmpty from "../../validation/is-empty"

class MySathiList
   extends Component {
   componentDidMount() {
      this.props.getSathiLists()
   }

   handleSathiProfile = ( uid ) => {
      this.props.getSathiProfile( uid )
   }

   viewFriendListComponent() {
      const { sathiLists } = this.props
      if ( !isEmpty( sathiLists.results ) ) {
         return (
            sathiLists.results &&
            sathiLists.results.map( ( sathi ) => (
               <Grid.Column computer={ 4 } mobile={ 16 }>
                  <InfiniteScroll
                     dataLength={
                        this.props.sathiLists && this.props.sathiLists.results
                           ? this.props.sathiLists.results.length
                           : 0
                     }
                     next={ () => this.props.getMoreSathiLists( sathiLists.next ) }
                     hasMore={ this.props.sathiLists && this.props.sathiLists.next }
                     loader={
                        <Segment>
                           <Dimmer active inverted>
                              <Loader inverted/>
                           </Dimmer>
                        </Segment>
                     }
                  >
                     <SathiCard sathi={ sathi } isTypeOf="friends"/>
                  </InfiniteScroll>
               </Grid.Column>
            ) )
         )
      } else {
         return (
            <Card>
               <Card.Content textAlign="center">
                  <Card.Header>No Friends Added</Card.Header>
                  <Divider/>
                  <Card.Description>
                     You havenot Added Any Friends in your List.
                  </Card.Description>
               </Card.Content>
            </Card>
         )
      }
   }

   render() {
      return (
         <React.Fragment>
            <Grid>
               { this.props.isLoading ? (
                  <Grid.Row columns={ 4 }>
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
                  <Grid.Row columns={ 4 } style={ { background: "#f5f5f5" } }>
                     { this.viewFriendListComponent() }
                  </Grid.Row>
               ) }
            </Grid>
         </React.Fragment>
      )
   }
}

export const mapStateToProps = ( state ) => {
   return {
      sathiLists: state.sathi.sathiLists,
      isLoading: state.sathi.isLoading,
   }
}

export const mapDispatchToProps = ( dispatch ) => {
   return {
      getMoreSathiLists: ( url ) => dispatch( getMoreSathiLists( url ) ),
      getSathiLists: () => dispatch( getSathiLists() ),
      getSathiProfile: ( uid ) => dispatch( getSathiProfile( uid ) ),
   }
}

export default connect( mapStateToProps, mapDispatchToProps )( MySathiList )
