import React, { Component } from "react"
import { Form, Popup, Icon, Button, Input } from "semantic-ui-react"
import classnames from "classnames"

export default class General
   extends Component {
   continue = ( e ) => {
      e.preventDefault()
      this.props.nextStep()
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

   render() {
      const { values, onChange, errors } = this.props

      return (
         <Form>
            <Popup
               trigger={
                  <Form.Field
                     required
                     label="Username"
                     icon="user"
                     iconPosition="left"
                     placeholder="Username"
                     control={ Input }
                     name="username"
                     onChange={ onChange( "username" ) }
                     value={ values.username }
                     className={ classnames( { error: errors.username } ) }
                  />
               }
               content="Username is case sensitive and should be unique."
               on="focus"
               wide
               position="top left"
            />
            <Popup
               wide="very"
               trigger={
                  <Form.Field
                     required
                     label="Email"
                     icon="check"
                     iconPosition="left"
                     placeholder="Email"
                     control={ Input }
                     name="email_or_phone"
                     onChange={ onChange( "email_or_phone" ) }
                     value={ values.email_or_phone }
                     className={ classnames( { error: errors.email_or_phone } ) }
                  />
               }
            >
               <Popup.Header>Note:</Popup.Header>
               <Popup.Content>
                  You can either use your valid{ " " }
                  <span className="primary"> Email</span> or a
                  <span className="primary"> Phone Number</span> to verify the
                  namastenepal account.
               </Popup.Content>
               <Popup.Content>
                  <strong>Phone number format: </strong>+[country_code] [phone_number]
               </Popup.Content>
            </Popup>

            <Popup
               trigger={
                  <Form.Field
                     required
                     label="Password"
                     type="password"
                     id="password"
                     icon={
                        <Icon name="eye" onClick={ this.passwordVisible } link="true"/>
                     }
                     iconPosition="left"
                     placeholder="Password"
                     control={ Input }
                     name="password"
                     onChange={ onChange( "password" ) }
                     value={ values.password }
                     className={ classnames( { error: errors.password } ) }
                  />
               }
               content="Password must be 8 character long and must contain capital letter and numbers."
               on="focus"
               wide
               position="top left"
            />
            <Form.Field
               required
               label="Re-Enter Password"
               type="password"
               icon="lock"
               iconPosition="left"
               placeholder="Re-Enter Password"
               control={ Input }
               name="password"
               onChange={ onChange( "password2" ) }
               value={ values.password2 }
               className={ classnames( { error: errors.password2 } ) }
            />

            <Button
               fluid
               animated
               primary
               type="submit"
               onClick={ this.continue }
               // loading={this.props.auth.loading}
            >
               <Button.Content visible>Continue</Button.Content>
               <Button.Content hidden>
                  <Icon name="arrow right"/>
               </Button.Content>
            </Button>
         </Form>
      )
   }
}
