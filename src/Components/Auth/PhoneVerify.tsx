import React, { Component } from "react"
import { Segment, Icon, Message, Form, Button, Card } from "semantic-ui-react"
import { withRouter } from "react-router-dom"

import Axios from "axios"
import Alert from "react-s-alert"

class PhoneVerify
   extends Component {
   constructor() {
      super()
      this.state = {
         verification_code: "",
      }
   }

   onSubmit = ( e ) => {
      e.preventDefault()
      let formData = new FormData()
      formData.append( "phone_number", this.props.phone_number )

      formData.append( "verification_code", this.state.verification_code )

      Axios.post( "/api/auth/phone-activation-verify/", formData )
           .then( ( res ) => {
              Alert.success( res.data.success, {
                 position: "bottom-left",
                 effect: "jelly",
                 timeout: 2000,
              } )
              this.props.history.push( "/login/" )
           } )
           .catch( ( err ) => {
              Alert.error( err.response.error, {
                 position: "bottom-left",
                 effect: "jelly",
                 timeout: 2000,
              } )
           } )
   }
   onChange = ( e ) => {
      this.setState( { [e.target.name]: e.target.value } )
   }

   render() {
      const { phone_number } = this.props

      return (
         <Card centered>
            <Segment>
               <Message info icon>
                  <Icon name="info circle"/>
                  <Message.Content>
                     Enter the verification code you received on{ " " }
                     <code>{ phone_number }</code>
                  </Message.Content>
               </Message>
               <Form onSubmit={ this.onSubmit }>
                  <Form.Input
                     label="Verification Code"
                     type="number"
                     placeholder="xxxxxx"
                     name="verification_code"
                     onChange={ this.onChange }
                     value={ this.state.verification_code }
                  />
                  <Button fluid primary>
                     Verify
                  </Button>
               </Form>
            </Segment>
         </Card>
      )
   }
}

export default withRouter( PhoneVerify )
