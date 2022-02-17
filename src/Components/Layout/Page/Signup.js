import React, { Component } from "react"
import {
   Divider,
   Responsive,
   Message,
   Icon,
   Step,
   Grid,
} from "semantic-ui-react"
import isEmpty from "../../../validation/is-empty"

import General from "../../Auth/steps/General"
import Profile from "../../Auth/steps/Profile"
import Confirm from "../../Auth/steps/Confirm"
import { Validator } from "../../Auth/Validator"
import Axios from "axios"
import Success from "../../Auth/steps/Success"
import { registerUser } from "../../../actions/authActions"
import { connect } from "react-redux"

class Signup
   extends Component {
   constructor() {
      super()
      this.state = {
         errors: {},
         success: {},
         step: 1,
         email_or_phone: "",
         username: "",
         password: "",
         password2: "",
         first_name: "",
         last_name: "",
         hometown: "",
         gender: "",
         birth_date: "",
         country: "",
         city: "",
         loading: false,
         btnDisabled: false,
      }
   }

   componentDidMount() {
   }

   nextStep = () => {
      const { step, username, password, password2, email_or_phone } = this.state
      const values = { username, password, password2, email_or_phone }
      let validation = Validator( values )
      if ( validation.status ) {
         this.setState( { step: step + 1, errors: {} } )
      } else {
         this.setState( { errors: validation.message } )
      }
   }

   prevStep = () => {
      const { step } = this.state
      this.setState( { step: step - 1 } )
   }

   onChange = ( input ) => ( e ) => {
      this.setState( { [input]: e.target.value } )
   }

   handleChange = ( e, { name, value } ) => this.setState( { [name]: value } )

   onSubmit = ( e ) => {
      this.setState( { loading: true, errors: {}, btnDisabled: true } )

      const {
         first_name,
         last_name,
         gender,
         username,
         email_or_phone,
         password,
         country,
         city,
         hometown,
         birth_date,
      } = this.state
      const formData = new FormData()

      formData.append( "username", username )
      formData.append( "email_or_phone", email_or_phone )
      formData.append( "password", password )
      formData.append( "gender", gender )
      formData.append( "first_name", first_name )
      formData.append( "last_name", last_name )
      formData.append( "country", country )
      formData.append( "city", city )
      formData.append( "hometown", hometown )

      formData.append( "birth_date", birth_date )
      setTimeout( () => {
         this.registerUser( formData )
      }, 1500 )
   }

   registerUser = ( data ) => {
      Axios.post( "/api/register/", data )
           .then( ( res ) =>
              this.setState( {
                 step: 4,
                 loading: false,
                 success: res.data,
                 btnDisabled: false,
              } ),
           )
           .catch( ( err ) =>
              this.setState( {
                 errors: err.response,
                 loading: false,
                 btnDisabled: false,
              } ),
           )
   }
   onDismiss = () => {
      this.setState( { errors: {} } )
   }

   render() {
      const { step, errors, loading, btnDisabled } = this.state
      const {
         first_name,
         last_name,
         gender,
         username,
         email_or_phone,
         password,
         password2,
         country,
         city,
         hometown,
         birth_date,
      } = this.state
      const values = {
         first_name,
         last_name,
         gender,
         username,
         email_or_phone,
         password,
         password2,
         country,
         city,
         hometown,
         birth_date,
      }
      const getSteps = () => {
         switch ( step ) {
            case 1:
               return (
                  <General
                     nextStep={ this.nextStep }
                     onChange={ this.onChange }
                     values={ values }
                     errors={ errors }
                  />
               )
            case 2:
               return (
                  <Profile
                     nextStep={ this.nextStep }
                     prevStep={ this.prevStep }
                     onChange={ this.onChange }
                     handleChange={ this.handleChange }
                     values={ values }
                     errors={ errors }
                  />
               )
            case 3:
               return (
                  <Confirm
                     prevStep={ this.prevStep }
                     onSubmit={ this.onSubmit }
                     values={ values }
                     errors={ errors }
                     loading={ loading }
                     btnDisabled={ btnDisabled }
                  />
               )
            case 4:
               return <Success success={ this.state.success }/>
            default:
         }
      }

      return (
         <div>
            <Grid>
               <Grid.Row>
                  <Grid.Column computer={ 16 }>
                     { !isEmpty( errors ) ? (
                        <Message onDismiss={ this.onDismiss } negative icon>
                           <Icon name="info"/>
                           <Message.Content>
                              <Message.Header>Error!!</Message.Header>
                              { Object.values( errors ) }
                           </Message.Content>
                        </Message>
                     ) : (
                        ""
                     ) }

                     <Step.Group
                        fluid
                        size="tiny"
                        stackable="tablet"
                        as={ Responsive }
                        { ...Responsive.onlyComputer }
                     >
                        <Step
                           active={ step === 1 ? true : false }
                           onClick={ () => this.setState( { step: 1 } ) }
                        >
                           <Icon name="address card outline"/>
                           <Step.Content>
                              <Step.Title>General Info</Step.Title>
                              <Step.Description/>
                           </Step.Content>
                        </Step>

                        <Step
                           active={ step === 2 ? true : false }
                           onClick={ () => this.setState( { step: 2 } ) }
                        >
                           <Icon name="user"/>
                           <Step.Content>
                              <Step.Title>Profile Info</Step.Title>
                              <Step.Description/>
                           </Step.Content>
                        </Step>

                        <Step
                           active={ step === 3 ? true : false }
                           onClick={ () => this.setState( { step: 3 } ) }
                        >
                           <Icon name="info"/>
                           <Step.Content>
                              <Step.Title>Confirm</Step.Title>
                           </Step.Content>
                        </Step>
                     </Step.Group>
                     <Divider horizontal>Signup</Divider>
                     {/* steps goes here */ }
                     { getSteps() }
                  </Grid.Column>
               </Grid.Row>
            </Grid>
         </div>
      )
   }
}

const mapStateToProps = ( state ) => ( {
   user: state.auth.user,
} )
const mapDispatchToProps = ( dispatch ) => ( {
   registerUser: ( data ) => dispatch( registerUser( data ) ),
} )

export default connect( mapStateToProps, mapDispatchToProps )( Signup )
