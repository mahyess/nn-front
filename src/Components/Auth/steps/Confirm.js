import React, { Component } from "react"
import { Grid, Segment, Icon, Button } from "semantic-ui-react"

export default class Confirm
   extends Component {
   back = ( e ) => {
      e.preventDefault()
      this.props.prevStep()
   }

   render() {
      const { values, onSubmit, loading, btnDisabled } = this.props

      return (
         <Segment>
            <Grid columns={ 2 } divided padded>
               <Grid.Row>
                  <Grid.Column>
                     <strong>First Name:</strong> { values.first_name }{ " " }
                  </Grid.Column>
                  <Grid.Column>
                     <strong>Last Name:</strong> { values.last_name }
                  </Grid.Column>
               </Grid.Row>
               <Grid.Row>
                  <Grid.Column>
                     <strong>Username:</strong> { values.username }{ " " }
                  </Grid.Column>
                  <Grid.Column>
                     <strong>Email/Phone:</strong> { values.email_or_phone }
                  </Grid.Column>
               </Grid.Row>
               <Grid.Row>
                  <Grid.Column>
                     <strong>Gender:</strong> { values.gender }
                  </Grid.Column>
                  <Grid.Column>
                     <strong>Country:</strong> { values.country }
                  </Grid.Column>
               </Grid.Row>

               <Grid.Row>
                  <Grid.Column>
                     <strong>Birth Date:</strong> { values.birth_date }
                  </Grid.Column>
                  <Grid.Column>
                     <strong>Current City:</strong> { values.city }
                  </Grid.Column>
               </Grid.Row>
               <Grid.Row>
                  <Grid.Column>
                     <strong>Hometown:</strong> { values.hometown }
                  </Grid.Column>
               </Grid.Row>

               <Segment textAlign="center" basic>
                  <Icon name="check" color="green"/> By signing up, you agree to our
                  <a href="/legal/terms-conditions/"> Terms & conditions, </a>
                  <a hred="/about/storage-tech/"> Storage technology </a>
                  and <a href="/about/privacy-policy/"> Privacy policy.</a>
               </Segment>
            </Grid>
            <Button.Group fluid>
               <Button
                  positive
                  onClick={ onSubmit }
                  icon
                  loading={ loading }
                  disabled={ btnDisabled }
               >
                  Signup
               </Button>
               <Button
                  animated
                  onClick={ this.back }
                  // loading={this.props.auth.loading}
               >
                  <Button.Content visible>Back</Button.Content>
                  <Button.Content hidden>
                     <Icon name="arrow left"/>
                  </Button.Content>
               </Button>
            </Button.Group>
         </Segment>
      )
   }
}
