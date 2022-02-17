import React, { Component } from "react"
import {
   Button,
   Card,
   Container,
   Divider,
   Grid,
   Image,
   List,
   Segment,
} from "semantic-ui-react"
import pubg from "../../img/pubg.jpg"
import RegisterFormPubg from "./RegisterFormPubg"

class PubgEvent
   extends Component {
   constructor() {
      super()
      this.state = {
         open: false,
      }
   }

   changeModalState = ( modalState ) => this.setState( { open: modalState } )

   render() {
      return (
         <React.Fragment>
            <Segment>
               <h4>Events</h4>
               <List divided relaxed>
                  <List.Item
                     style={ { cursor: "pointer" } }
                     onClick={ () => this.changeModalState( true ) }
                  >
                     <Image src={ pubg } size="small" floated="left"/>
                     <List.Header>Pubg Event</List.Header>
                     <p>
                        Earn free skins by watching PCS3! Link your PUBG and YouTube
                        accounts, enable drops, then tune in live during the PCS3
                        broadcast on YouTube.
                     </p>
                  </List.Item>

                  <List.Item style={ { cursor: "pointer" } }>
                     <Image src={ pubg } size="small" floated="left"/>
                     <List.Header>Pubg Event</List.Header>
                     <p>
                        Earn free skins by watching PCS3! Link your PUBG and YouTube
                        accounts, enable drops, then tune in live during the PCS3
                        broadcast on YouTube.
                     </p>
                  </List.Item>
               </List>
            </Segment>
            <RegisterFormPubg
               modalState={ this.state.open }
               changeModalState={ this.changeModalState }
            />
         </React.Fragment>
      )
   }
}

export default PubgEvent
