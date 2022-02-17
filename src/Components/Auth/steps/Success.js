import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Segment } from "semantic-ui-react"
import PhoneVerify from "../PhoneVerify"

export default class Success
   extends Component {
   render() {
      const { success } = this.props
      return (
         <React.Fragment>
            { success.verification_method === "phone_number" ? (
               <PhoneVerify phone_number={ success.email_or_phone }/>
            ) : (
               <Segment textAlign="center">
                  <h3>
                     A verification link has been sent to you on your email
                     <i>{ success.email }</i>
                  </h3>
                  <h4>
                     please verify and <b>login </b> to continue .
                  </h4>
               </Segment>
            ) }
         </React.Fragment>
      )
   }
}
