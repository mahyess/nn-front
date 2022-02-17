import React, { Component } from "react"
import { Placeholder, Card } from "semantic-ui-react"

export default class ProfileBannerPlaceHolder
   extends Component {
   render() {
      return (
         <Card.Group style={ { borderRadius: "none", border: "none" } }>
            <Card
               fluid
               style={ {
                  borderRadius: "unset",
                  boxShadow: "none",
                  border: "none",
                  margin: 0,
               } }
            >
               <Placeholder fluid>
                  <Placeholder.Image style={ { height: "180px" } }/>

                  <Placeholder.Image
                     square
                     style={ {
                        position: "absolute",
                        height: "125px",
                        width: "100px",
                        borderRadius: 60,
                        backgroundColor: "white",
                        padding: 0,
                        top: 124,
                        left: 24,
                        border: "2px solid lightgrey",
                     } }
                  />
               </Placeholder>
               <Card.Content>
                  <div style={ { paddingLeft: 129 } }>
                     <Placeholder>
                        <Placeholder.Header>
                           <Placeholder.Line length="large"/>
                           <Placeholder.Line length="large"/>
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                           <Placeholder.Line length="short"/>
                           <Placeholder.Line length="short"/>
                        </Placeholder.Paragraph>
                     </Placeholder>
                  </div>
               </Card.Content>
            </Card>
         </Card.Group>
      )
   }
}
