import React, { Component } from "react"

import { Card, Grid, Divider } from "semantic-ui-react"
import isEmpty from "../../validation/is-empty"

import {
   acceptIncomingRequest,
   rejectIncomingRequest,
   cancelOutgoingRequest,
   fetchIncomingRequests,
   fetchOutgoingRequests,
} from "../../actions/sathiActions"
import { connect } from "react-redux"
import SathiCard from "./SathiLayout/SathiCard"
import SathiCardPlaceHolder from "./SathiLayout/SathiPlaceHolder"

class FriendRequests
   extends Component {
   state = { requests: [], errors: {}, loading: false, temp: "" }

   componentDidMount() {
      if ( this.props.request === "request_send" ) {
         this.props.fetchOutgoingRequests()
      } else if ( this.props.request === "request_received" ) {
         this.props.fetchIncomingRequests()
      }
   }

   viewOutgoingRequests = () => {
      const { requests } = this.props
      if ( !isEmpty( requests.outgoing.results ) ) {
         return requests.outgoing.results.map( ( requestReceiver ) => (
            <Grid.Column computer={ 4 } mobile={ 16 }>
               <SathiCard sathi={ requestReceiver } isTypeOf="friendsRequestSend"/>
            </Grid.Column>
         ) )
      } else {
         let content

         // content = <ListPlaceholder />;
         content = (
            <Card fluid>
               <Card.Content textAlign="center">
                  <Card.Header>No Requests Sent yet</Card.Header>
                  <Divider/>
                  <Card.Description>
                     You havenot sent any requests yet.
                  </Card.Description>
               </Card.Content>
            </Card>
         )
         return content
      }
   }

   viewIncommingRequests = () => {
      const { requests } = this.props
      if ( !isEmpty( requests.incoming.results ) ) {
         return requests.incoming.results.map( ( sendingUser ) => (
            <Grid.Column computer={ 4 } mobile={ 16 }>
               { console.log( sendingUser ) }
               <SathiCard sathi={ sendingUser } isTypeOf="friendsRequestReceived"/>
            </Grid.Column>
         ) )
      } else {
         let content
         content = (

            <Card fluid>
               <Card.Content textAlign="center">
                  <Card.Header>No Requests Received yet</Card.Header>
                  <Divider/>
                  <Card.Description>
                     You dont have any pending friend requests.
                  </Card.Description>
               </Card.Content>
            </Card>

         )
         return content
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
                  <Grid.Row
                     columns={ 4 }
                     style={ { background: "#f5f5f5", paddingTop: 4 } }
                  >
                     { this.props.request === "request_send"
                        ? this.viewOutgoingRequests()
                        : this.viewIncommingRequests() }
                  </Grid.Row>
               ) }
            </Grid>
         </React.Fragment>
      )
   }
}

const mapStateToProps = ( state ) => {
   return {
      requests: state.sathi.requests,
      isLoading: state.sathi.isLoading,
   }
}

const mapDispatchToProps = ( dispatch ) => {
   return {
      acceptIncomingRequest: ( user ) => dispatch( acceptIncomingRequest( user ) ),
      rejectIncomingRequest: ( user ) => dispatch( rejectIncomingRequest( user ) ),
      cancelOutgoingRequest: ( user ) => dispatch( cancelOutgoingRequest( user ) ),
      fetchIncomingRequests: () => dispatch( fetchIncomingRequests() ),
      fetchOutgoingRequests: () => dispatch( fetchOutgoingRequests() ),
   }
}

export default connect( mapStateToProps, mapDispatchToProps )( FriendRequests )
