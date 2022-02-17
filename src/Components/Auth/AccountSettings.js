import React, { Component } from "react"
import { Button, Form, Grid, Menu, Message, Segment } from "semantic-ui-react"
import isEmpty from "../../validation/is-empty"
import { withRouter } from "react-router-dom"
import { passwordChange, deactivateAccount } from "../../actions/authActions"
import { connect } from "react-redux"

class AccountSettings
   extends Component {
   state = {
      activeItem: "change password",
      new_password: "",
      password: "",
      confirm_password: "",
      current_password: "",
   }
   componentDidUpdate = ( prevProps ) => {
      if ( this.props.user !== prevProps.user && !this.props.user ) {
         window.location.reload()
         // this.props.history.push("/");
      }
   }

   handlePasswordChange = () => {
      let formData = new FormData()
      formData.append( "current_password", this.state.current_password )
      formData.append( "new_password", this.state.new_password )
      formData.append( "confirm_password", this.state.confirm_password )
      this.props.passwordChange( formData )
      this.setState( {
         current_password: "",
         new_password: "",
         confirm_password: "",
      } )
   }

   handleDeactivate = ( formData ) => {
      if ( !isEmpty( this.state.password ) ) {
         const formData = new FormData()
         formData.append( "password", this.state.password )
         this.props.deactivateAccount( formData )
      }
   }

   onChange = ( e ) => {
      this.setState( { [e.target.name]: e.target.value } )
   }

   handleItemClick = ( e, { name } ) => this.setState( { activeItem: name } )

   render() {
      const {
         activeItem,
         password,
         confirm_password,
         new_password,
         current_password,
      } = this.state

      return (
         <Grid columns={ 2 } className="panel-container" stackable>
            <Grid.Column className="mt">
               <Menu attached="top" tabular>
                  <Menu.Item
                     name="change password"
                     active={ activeItem === "change password" }
                     onClick={ this.handleItemClick }
                  >
                     Change password
                  </Menu.Item>
                  <Menu.Item
                     name="deactivate"
                     active={ activeItem === "deactivate" }
                     onClick={ this.handleItemClick }
                  >
                     Deactivate account
                  </Menu.Item>
               </Menu>
               { activeItem === "change password" ? (
                  <Segment attached="bottom">
                     <Form onSubmit={ this.handlePasswordChange }>
                        <Form.Field>
                           <label>Current password</label>
                           <input
                              placeholder="Current password"
                              required
                              name="current_password"
                              type="password"
                              value={ current_password }
                              onChange={ this.onChange }
                           />
                        </Form.Field>
                        <Form.Field>
                           <label>New password</label>
                           <input
                              placeholder="New password"
                              required
                              type="password"
                              name="new_password"
                              value={ new_password }
                              onChange={ this.onChange }
                           />
                        </Form.Field>
                        <Form.Field>
                           <label>Confirm new password</label>
                           <input
                              placeholder="Confirm new password"
                              name="confirm_password"
                              required
                              type="password"
                              value={ confirm_password }
                              onChange={ this.onChange }
                           />
                        </Form.Field>

                        <Button type="submit" fluid primary>
                           Change password
                        </Button>
                     </Form>
                  </Segment>
               ) : (
                  <Segment attached="bottom">
                     <Form onSubmit={ ( formData ) => this.handleDeactivate( formData ) }>
                        <Form.Field>
                           <label>Enter your password</label>
                           <input
                              placeholder="Your password"
                              required
                              type="password"
                              name="password"
                              value={ password }
                              onChange={ this.onChange }
                           />
                        </Form.Field>

                        <Message
                           header="Note!"
                           content="After Deactiavting Account you will loose all the data. DO you still want to Deactivate the Account"
                        />
                        <Button type="submit" fluid primary>
                           Deactivate
                        </Button>
                     </Form>
                  </Segment>
               ) }
            </Grid.Column>
         </Grid>
      )
   }
}

export const mapStateToProps = ( state ) => {
   return {
      user: state.auth.user,
   }
}

const mapDispatchToProps = ( dispatch ) => {
   return {
      passwordChange: ( formData ) => dispatch( passwordChange( formData ) ),
      deactivateAccount: ( formData ) => dispatch( deactivateAccount( formData ) ),
   }
}
export default withRouter(
   connect( mapStateToProps, mapDispatchToProps )( AccountSettings ),
)
