import React, { Component } from "react"
import SuggestedFriends from "./SuggestedFriends"
import FriendRequests from "./FriendRequests"
import { Grid, Menu, Label, Container } from "semantic-ui-react"
import MySathiList from "./MySathiList"
import { connect } from "react-redux"
import {
   fetchOutgoingRequests,
   fetchIncomingRequests,
} from "src/actions/sathiActions"

class Sathi
   extends Component {
   constructor( props ) {
      super( props )
      this.state = {
         activeItem: "my_friends",
      }
   }

   componentDidMount = () => {
      this.props.fetchIncomingRequests()
      this.props.fetchOutgoingRequests()
   }

   handlePostsClick = () => {
      if ( this.state.activeItem === "my_friends" ) {
         return <MySathiList/>
      } else if ( this.state.activeItem === "friend_requests" ) {
         return <FriendRequests request={ "request_received" }/>
      } else if ( this.state.activeItem === "friend_request_send" ) {
         return <FriendRequests request={ "request_send" }/>
      } else if ( this.state.activeItem === "suggested_friends" ) {
         return <SuggestedFriends pageCalledFrom="suggested_friends"/>
      }
   }

   handlePostsTabChange = ( e ) => {
      this.setState( { activeItem: e.target.id }, () => {
         this.handlePostsClick()
      } )
   }

   render() {
      const { activeItem } = this.state
      return (
         <React.Fragment>
            <Container>
               <Grid>
                  <Grid.Row columns={ 4 } centered className="mt">
                     <Grid.Column computer={ 16 } tablet={ 16 } mobile={ 16 }>
                        <Menu secondary pointing widths={ 4 } className="sathi-text">
                           <Menu.Item
                              id="my_friends"
                              name="my_friends"
                              onClick={ ( e ) => this.handlePostsTabChange( e ) }
                              active={ activeItem === "my_friends" }
                           >
                              My Friends
                           </Menu.Item>
                           <Menu.Item
                              id="friend_requests"
                              name="friend_requests"
                              onClick={ ( e ) => this.handlePostsTabChange( e ) }
                              active={ activeItem === "friend_requests" }
                           >
                              Friend Requests
                              <Label color="red" pointing="left">
                                 { this.props.requests &&
                                 this.props.requests.incoming.count }
                              </Label>
                           </Menu.Item>
                           <Menu.Item
                              id="friend_request_send"
                              name="friend_request_send"
                              onClick={ ( e ) => this.handlePostsTabChange( e ) }
                              active={ activeItem === "friend_request_send" }
                           >
                              Friend Request Send
                           </Menu.Item>
                           <Menu.Item
                              id="suggested_friends"
                              name="suggested_friends"
                              onClick={ ( e ) => this.handlePostsTabChange( e ) }
                              active={ activeItem === "suggested_friends" }
                           >
                              Suggested Friends
                           </Menu.Item>
                        </Menu>
                     </Grid.Column>
                  </Grid.Row>
                  <Grid.Column
                     computer={ 16 }
                     style={ { background: "#f5f5f5", height: "auto" } }
                  >
                     <div className="grid-padding">
                        <Grid.Row>{ this.handlePostsClick() }</Grid.Row>
                     </div>
                  </Grid.Column>
               </Grid>
            </Container>
         </React.Fragment>
      )
   }
}

const mapStateToProps = ( state ) => {
   return {
      requests: state.sathi.requests,
   }
}
const mapDispatchToProps = ( dispatch ) => {
   return {
      fetchOutgoingRequests: () => dispatch( fetchOutgoingRequests() ),
      fetchIncomingRequests: () => dispatch( fetchIncomingRequests() ),
   }
}

export default connect( mapStateToProps, mapDispatchToProps )( Sathi )
