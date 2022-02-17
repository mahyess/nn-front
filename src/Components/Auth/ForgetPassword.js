import Axios from "axios"
import React, { Component } from "react"
import { Link } from "react-router-dom"
import {
   Button,
   Form,
   Grid,
   Header,
   Icon,
   Input,
   Message,
   Segment,
} from "semantic-ui-react"
import isEmpty from "../../validation/is-empty"

class ForgetPassword
   extends Component {
   constructor() {
      super()
      this.state = {
         email: "",
         token: "",
         new_password: "",
         errors: {},
         formState: 1,
         loading: false,
      }
   }

   onChange = ( e ) => {
      this.setState( { [e.target.name]: e.target.value } )
   }

   onStateOneSubmit = ( e ) => {
      this.setState( { loading: true, errors: {} } )
      let formData = new FormData()
      formData.append( "email", this.state.email )
      Axios.post( "/api/password-reset/", formData )
           .then( ( res ) => {
              if ( !isEmpty( res.data ) ) {
                 this.setState( { formState: 2, loading: false } )
              }
           } )
           .catch( ( err ) => {
              this.setState( { errors: err.response.data, loading: false } )
           } )
   }

   onStateTwoSubmit = ( e ) => {
      this.setState( { loading: true, errors: {} } )

      let formData = new FormData()
      formData.append( "token", this.state.token )
      formData.append( "password", this.state.new_password )

      Axios.post( "/api/password-reset/confirm/", formData )
           .then( ( res ) => {
              if ( !isEmpty( res.data ) ) {
                 this.setState( { formState: 3, loading: false } )
              }
           } )
           .catch( ( err ) => {
              this.setState( { errors: err.response.data, loading: false } )
           } )
   }

   getFormState = () => {
      const { formState } = this.state
      if ( formState === 1 ) {
         return (
            <Form onSubmit={ this.onStateOneSubmit }>
               <Form.Field
                  label="Email"
                  required
                  icon="user"
                  iconPosition="left"
                  placeholder="enter your email"
                  control={ Input }
                  name="email"
                  onChange={ this.onChange }
                  value={ this.state.email }
               />

               <Button
                  fluid
                  animated
                  primary
                  type="submit"
                  loading={ this.state.loading }
                  style={ { marginTop: "3pc" } } //pc  also works as like px . Here it in this case px is not working so pc is used //
               >
                  <Button.Content visible>Continue</Button.Content>
                  <Button.Content hidden>
                     <Icon name="arrow right"/>
                  </Button.Content>
               </Button>
            </Form>
         )
      } else if ( formState === 2 ) {
         return (
            <React.Fragment>
               <Message
                  icon="info"
                  header="Check your email"
                  content="You have received an email. Please check the token and paste it in
              the field."
               />

               <Form onSubmit={ this.onStateTwoSubmit }>
                  <Form.Field
                     label="token"
                     icon="chain"
                     required
                     iconPosition="left"
                     placeholder="enter your token"
                     control={ Input }
                     name="token"
                     onChange={ this.onChange }
                     value={ this.state.token }
                  />
                  <Form.Field
                     label="new password"
                     type="password"
                     icon="lock"
                     required
                     iconPosition="left"
                     placeholder="enter your new password"
                     control={ Input }
                     name="new_password"
                     onChange={ this.onChange }
                     value={ this.state.new_password }
                  />
                  <Form.Group>
                     <Button.Group fluid>
                        <Button
                           animated
                           primary
                           type="submit"
                           loading={ this.state.loading }
                        >
                           <Button.Content visible>Continue</Button.Content>
                           <Button.Content hidden>
                              <Icon name="arrow right"/>
                           </Button.Content>
                        </Button>
                        <Button
                           animated
                           onClick={ () => this.setState( { formState: 1 } ) }
                        >
                           <Button.Content visible>go back</Button.Content>
                           <Button.Content hidden>
                              <Icon name="arrow left"/>
                           </Button.Content>
                        </Button>
                     </Button.Group>
                  </Form.Group>
               </Form>
            </React.Fragment>
         )
      } else if ( formState === 3 ) {
         return (
            <Segment>
               <Header as="h3">Mission complete !!</Header>
               Please <Link to="/login/">login</Link> with the new password to
               continue.
            </Segment>
         )
      } else {
         return <Segment>What did you do???????? Go Home!!</Segment>
      }
   }

   render() {
      const { errors } = this.state
      return (
         <Grid stackable centered style={ { paddingTop: 8 } }>
            <Grid.Row>
               <Grid.Column width={ 6 }>
                  <Segment>
                     <Header as="h3" dividing>
                        Reset your password
                     </Header>
                     { !isEmpty( errors ) ? (
                        <Message
                           negative
                           onDismiss={ () => this.setState( { errors: {} } ) }
                           header="There was an error!"
                           list={ Object.values( errors ) }
                        />
                     ) : (
                        ""
                     ) }
                     { this.getFormState() }
                     <Message
                        icon="question"
                        header="Not sure what you are doing?"
                        content="Get help from us or go back to Login"
                     />
                  </Segment>
               </Grid.Column>
            </Grid.Row>
         </Grid>
      )
   }
}

export default ForgetPassword
