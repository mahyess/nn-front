import React, { Component } from 'react'
import { Card, Divider, Grid } from "semantic-ui-react"

class NoPostMessage
   extends Component {
   render() {

      return (
         this.props.CurrentTab === "samajPosts" ?
            <Grid>
               <Grid.Row>
                  <Grid.Column>
                     <Card fluid>
                        <Card.Content textAlign="center">
                           <Card.Header>Opps Sorry ...</Card.Header>
                           <Divider/>
                           <Card.Description>
                              <h1> No Post </h1>
                              <h3>
                                 {
                                    this.props.user === this.props.profileUser.username
                                       ? "you"
                                       : ( this.props.profileUser.first_name )
                                 } have not post in any Samaj.
                              </h3>

                           </Card.Description>
                        </Card.Content>
                     </Card>
                  </Grid.Column>
               </Grid.Row>
            </Grid>
            : this.props.CurrentTab === "taggedPosts" ?
            <Grid>
               <Grid.Row>
                  <Grid.Column>
                     <Card fluid>
                        <Card.Content textAlign="center">
                           <Card.Header>Opps Sorry ...</Card.Header>
                           <Divider/>
                           <Card.Description>
                              <h1> No Post </h1>
                              <h3>
                                 {
                                    this.props.user === this.props.profileUser.username
                                       ? "you"
                                       : ( this.props.profileUser.first_name )
                                 } have not been tagged in any Post.
                              </h3>

                           </Card.Description>
                        </Card.Content>
                     </Card>
                  </Grid.Column>
               </Grid.Row>
            </Grid>
            : this.props.CurrentTab === "personalPosts" &&
            <Grid>
               <Grid.Row>
                  <Grid.Column>
                     <Card fluid>
                        <Card.Content textAlign="center">
                           <Card.Header>Opps Sorry ...</Card.Header>
                           <Divider/>
                           <Card.Description>
                              <h1> No Post </h1>
                              <h3>
                                 {
                                    this.props.user === this.props.profileUser.username
                                       ? "you"
                                       : ( this.props.profileUser.first_name )
                                 } have not Created any Post.
                              </h3>

                           </Card.Description>
                        </Card.Content>
                     </Card>
                  </Grid.Column>
               </Grid.Row>
            </Grid>
      )
   }
}

export default NoPostMessage




