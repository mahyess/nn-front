import React, { Component } from "react"
import { Card, Grid, Button, Image } from "semantic-ui-react"
import { Link } from "react-router-dom"
import {
   acceptIncomingRequest,
   cancelOutgoingRequest,
   rejectIncomingRequest,
   sendFriendRequest,
} from "src/actions/sathiActions"
import { connect } from "react-redux"

class SathiCard
   extends Component {
   suggestedFriendButton() {
      return (
         <div className="ui two buttons">
            <Button
               style={ { width: "60%" } }
               color="green"
               onClick={ () => this.props.sendFriendRequest( this.props.sathi ) }
               // loading={this.props.toUser === this.props.username ? true : false}
            >
               {/* onClick={() =>
              this.sendFrienduser(user.username)
            } */ }
               Send Request
            </Button>
            <Button
               style={ { width: "40%" } }
               as={ Link }
               to={ `/profile/${ this.props.sathi.username }` }
            >
               View
            </Button>
         </div>
      )
   }

   friendRequestSentButton() {
      return (
         <Button
            color="red"
            fluid
            onClick={ () => this.props.cancelOutgoingRequest( this.props.sathi ) }
         >
            Cancel request
         </Button>
      )
   }

   receivedFriendRequest() {
      return (
         <div className="ui two buttons">
            <Button
               onClick={ () => this.props.rejectIncomingRequest( this.props.sathi ) }
            >
               Cancel
            </Button>
            <Button
               color="green"
               onClick={ () => this.props.acceptIncomingRequest( this.props.sathi ) }
            >
               Accept
            </Button>
         </div>
      )
   }

   render() {
      const {
         first_name: firstName,
         last_name: lastName,
         username,
      } = this.props.sathi
      const { avatar, coverpic, bio } = this.props.sathi.profile
      const { color_code: userPointColor } = this.props.sathi.points
      return (
         <Card
            style={ {
               overflow: "hidden",
            } }
            fluid
         >
            <Card.Header>
               <Image
                  src={ coverpic }
                  style={ {
                     width: "fit-content",
                     height: "120px",
                     objectFit: "cover",
                     background: "",
                  } }
               />
               <div style={ { display: "flex" } }>
                  <Image
                     src={ avatar }
                     avatar
                     style={ {
                        border: "2px solid " + userPointColor,
                        marginTop: "-24px",
                        marginLeft: 15,
                        borderRadius: "50%",
                        background: "white",
                        width: 72,
                        height: 72,
                        objectFit: "cover",
                     } }
                  />
                  <p
                     style={ {
                        marginLeft: 4,
                        fontSize: 16,
                        fontWeight: "bolder",
                     } }
                  >
                     { firstName } { lastName }
                     <br/>@{ username }
                  </p>
               </div>
               <p></p>
            </Card.Header>
            <Card.Content>
               <Card.Meta style={ { marginLeft: 0 } }></Card.Meta>
               <Card.Description
                  style={ { fontWeight: "bold" } }
                  className="giveMeEllipsis"
               >
                  { bio ? bio : "No Bio" }
               </Card.Description>
               <Grid columns={ 1 } style={ { marginTop: 8 } }>
                  <Grid.Column width={ 16 } style={ { overflow: "hidden" } }>
                     <Card.Content extra></Card.Content>
                     { ( this.props.isTypeOf === "suggestedFriends" &&
                        this.props.sathi.requestSent === undefined ) ||
                     this.props.sathi.cancelledRequest ||
                     this.props.sathi.requestDeclined ? (
                        this.suggestedFriendButton()
                     ) : this.props.isTypeOf === "friendsRequestSend" ||
                     this.props.sathi.requestSent === true ? (
                        this.friendRequestSentButton()
                     ) : this.props.isTypeOf === "friendsRequestReceived" &&
                     !this.props.sathi.requestAccepted ? (
                        this.receivedFriendRequest()
                     ) : (
                        <Button
                           fluid
                           as={ Link }
                           to={ `/profile/${ this.props.sathi.username }` }
                        >
                           View Profile
                        </Button>
                     ) }
                  </Grid.Column>
               </Grid>
            </Card.Content>
         </Card>
      )
   }
}

const mapDispatchToProps = ( dispatch ) => ( {
   sendFriendRequest: ( user ) => dispatch( sendFriendRequest( user ) ),
   cancelOutgoingRequest: ( user ) => dispatch( cancelOutgoingRequest( user ) ),
   rejectIncomingRequest: ( user ) => dispatch( rejectIncomingRequest( user ) ),
   acceptIncomingRequest: ( user ) => dispatch( acceptIncomingRequest( user ) ),
} )

export default connect( null, mapDispatchToProps )( SathiCard )
