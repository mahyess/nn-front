import React, { Component } from "react"
import {
   Grid,
   Form,
   Segment,
   Button,
   Icon,
   Message,
   Divider,
   Input,
   Popup,
} from "semantic-ui-react"
import { Link, withRouter } from "react-router-dom"

import { connect } from "react-redux"
import { login } from "src/actions/authActions"
import isEmpty from "../../../validation/is-empty"
import classnames from "classnames"
// import { connect } from "react-redux";
import { changeAuthPage } from "../../../actions/miscActions"

class Login
   extends Component {
   constructor() {
      super()
      this.state = {
         username: "",
         password: "",
         errors: {},
         buttonDisabled: false,
      }
   }

   onChange = ( e ) => {
      this.setState( { [e.target.name]: e.target.value } )
   }

   passwordVisible = () => {
      let pswd = document.getElementById( "password" )
      if ( pswd.type === "password" ) {
         pswd.type = "text"
         setTimeout( () => {
            pswd.type = "password"
         }, 800 )
      } else {
         pswd.type = "password"
      }
   }

   onSubmit = ( e ) => {
      e.preventDefault()
      const userData = {
         username: this.state.username,
         password: this.state.password,
      }
      this.setState( { errors: {}, buttonDisabled: true } )
      this.props.login( userData )
   }

   componentDidUpdate( prevProps ) {
      if ( this.props.user ) {
         this.props.history.push( "/chautari" )
      }
      if ( prevProps.errors !== this.props.errors ) {
         this.setState( { errors: this.props.errors.data } )
      }
   }

   onDismiss = () => {
      this.setState( { errors: {}, buttonDisabled: false } )
   }

   render() {
      const { errors, buttonDisabled } = this.state
      let err = []
      let _errors
      if ( typeof errors !== "object" ) {
         if ( errors.includes( "Proxy error" ) ) {
            _errors = "There was an Proxy Error"
         }
      } else if ( typeof errors === "object" ) {
         if ( Object.keys( errors )
                    .includes( "non_field_errors" ) ) {
            _errors = Object.values( errors )
         } else if ( Object.keys( errors )
                           .includes( "detail" ) ) {
            _errors = Object.values( errors )
         } else {
            for ( const key in errors ) {
               if ( errors.hasOwnProperty( key ) ) {
                  err.push(
                     <Message.Item key={ key }>
                        { key } : { errors[key] }
                     </Message.Item>,
                  )
               }
            }
            _errors = err
         }
      }

      return (
         <Grid>
            <Grid.Row>
               <Grid.Column>
                  <Segment basic>
                     { !isEmpty( this.state.errors ) ? (
                        <Message onDismiss={ this.onDismiss } negative>
                           <Message.Content>
                              <Message.Header>Error </Message.Header>
                              { _errors }
                           </Message.Content>
                        </Message>
                     ) : (
                        ""
                     ) }

                     <Divider horizontal>Login</Divider>
                     <Form onSubmit={ this.onSubmit } widths="equal">
                        <Popup
                           trigger={
                              <Form.Field
                                 label="Username"
                                 icon="user"
                                 iconPosition="left"
                                 placeholder="Username"
                                 control={ Input }
                                 name="username"
                                 onChange={ this.onChange }
                                 value={ this.state.username }
                                 className={ classnames( { error: errors.username } ) }
                              />
                           }
                           content="Username is case sensitive."
                           on="focus"
                           position="top left"
                        />

                        <Form.Field
                           label="Password"
                           type="password"
                           iconPosition="left"
                           placeholder="Password"
                           id="password"
                           control={ Input }
                           icon={
                              <Icon
                                 name="eye"
                                 onClick={ this.passwordVisible }
                                 link={ true }
                              />
                           }
                           name="password"
                           onChange={ this.onChange }
                           value={ this.state.password }
                           className={ classnames( { error: errors.password } ) }
                        />

                        <div style={ { paddingBottom: "7px" } }>
                           <Link to="/reset-password/">Forgot your password?</Link>
                        </div>

                        <Button
                           fluid
                           animated
                           primary
                           type="submit"
                           // loading={this.props.auth.loading}
                           disabled={ buttonDisabled }
                        >
                           <Button.Content visible>Login</Button.Content>
                           <Button.Content hidden>
                              <Icon name="arrow right"/>
                           </Button.Content>
                        </Button>
                     </Form>
                     <Message attached warning icon size="small">
                        <Icon name="question circle"/>
                        <Message.Content>
                           Dont have an account?{ " " }
                           <Link
                              to="/login/"
                              onClick={ () => this.props.changeAuthPage( "signup" ) }
                           >
                              Signup here instead.
                           </Link>
                        </Message.Content>
                     </Message>
                  </Segment>
               </Grid.Column>
            </Grid.Row>
         </Grid>
      )
   }
}

const mapStateToProps = ( state ) => ( {
   user: state.auth.user,
   errors: state.errors,
} )

const mapDispatchToProps = ( dispatch ) => ( {
   login: ( data ) => dispatch( login( data ) ),
   changeAuthPage: ( page ) => dispatch( changeAuthPage( page ) ),
} )

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( Login ) )
