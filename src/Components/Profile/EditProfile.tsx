import React, { Component } from "react"
import {
   Form,
   Button,
   Segment,
   Dropdown,
   Message,
   Header,
   Image,
} from "semantic-ui-react"
import { connect } from "react-redux"
import { countries } from "../Auth/steps/countries"

import Alert from "react-s-alert"
import Axios from "axios"
// import PhoneVerify from "../Auth/PhoneVerify";
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { updateUserProfile } from "../../actions/profileActions"

class EditProfile
   extends Component {
   constructor( props ) {
      super( props )

      this.state = {
         first_name: "",
         last_name: "",
         country: "",
         city: "",
         phone_number: "",
         bio: "",
         errors: {},
         visible: false,
         verifyModal: false,
         verification_code: "",
      }
   }

   componentDidMount() {
      const { first_name, last_name, phone_number } = this.props.auth.user
      const { country, city, bio } = this.props.auth.user.profile

      this.setState( { first_name, last_name, country, city, bio, phone_number } )
   }

   handleDismiss = () => {
      this.setState( { errors: {} } )
   }

   onChange = ( e ) => {
      this.setState( { [e.target.name]: e.target.value } )
   }

   verifyCode = ( e ) => {
      e.preventDefault()
      let formData = new FormData()
      formData.append( "phone_number", this.state.phone_number )

      formData.append( "verification_code", this.state.verification_code )

      Axios.post( "/api/auth/phone-verify/", formData )
           .then( ( res ) => {
              Alert.success( res.data.success, {
                 position: "bottom-left",
                 effect: "jelly",
                 timeout: 2000,
              } )
           } )
           .catch( ( err ) => {
              Alert.error( err.response.error, {
                 position: "bottom-left",
                 effect: "jelly",
                 timeout: 2000,
              } )
           } )
   }
   // toaster for bio update//
   notify = () => {
      toast.configure()
      toast( " Profile has been update", {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         type: "error",
      } )
   }
   // toaster for bio update ends here
   handleChange = ( e, { name, value } ) => this.setState( { [name]: value } )

   // handleVerification = () => {
   //   if (!isEmpty(this.state.phone_number)) {
   //     if (this.state.phone_number !== this.props.auth.user.phone_number) {
   //       Axios.get(`/api/auth/phone-verify/request/${this.state.phone_number}/`)
   //         .then((res) => {
   //           Alert.success(res.data.success, {
   //             position: "bottom-left",
   //             effect: "jelly",
   //             timeout: 5000,
   //           });
   //           this.setState({ verifyModal: true });
   //         })
   //         .catch((err) =>
   //           Alert.error(err.response.error, {
   //             position: "bottom-left",
   //             effect: "jelly",
   //             timeout: 5000,
   //           })
   //         );
   //     } else {
   //       Alert.info("number already verified", {
   //         position: "bottom-left",
   //         effect: "jelly",
   //         timeout: 5000,
   //       });
   //     }
   //   } else {
   //     Alert.error("number required", {
   //       position: "bottom-left",
   //       effect: "jelly",
   //       timeout: 5000,
   //     });
   //   }
   // };

   onSubmit = async ( e ) => {
      e.preventDefault()
      let formData = new FormData()
      formData.append( "first_name", this.state.first_name )
      formData.append( "last_name", this.state.last_name )
      formData.append( "country", this.state.country )
      formData.append( "city", this.state.city )
      formData.append( "bio", this.state.bio )

      await this.props.updateUserProfile( formData, this.props.username )

      this.props.changeEditModal()
   }

   render() {
      const { user } = this.props.auth
      const {
         first_name,
         last_name,
         country,
         city,
         visible,
         bio,
         phone_number,
      } = this.state

      return (
         <React.Fragment>
            <Header as="h3">
               <Image
                  circular
                  src={ user.profile.avatar }
                  avatar
                  style={ {
                     height: 36,
                     width: 36,
                     padding: 4,
                     background: "white",
                  } }
               />{ " " }
               @{ user.username }
            </Header>
            <Segment basic>
               { visible ? (
                  <Message onDismiss={ this.handleDismiss } info>
                     <Message.Content>asd</Message.Content>
                  </Message>
               ) : (
                  ""
               ) }
               <Form onSubmit={ this.onSubmit }>
                  <Form.Group widths="equal">
                     <Form.Field>
                        <label>First Name</label>
                        <input
                           placeholder="First Name"
                           value={ first_name }
                           name="first_name"
                           onChange={ this.onChange }
                        />
                     </Form.Field>
                     <Form.Field>
                        <label>Last Name</label>
                        <input
                           placeholder="Last Name"
                           name="last_name"
                           value={ last_name }
                           onChange={ this.onChange }
                        />
                     </Form.Field>
                  </Form.Group>
                  <Form.Group widths="equal">
                     <Form.Field
                        control={ Dropdown }
                        search
                        placeholder="country"
                        label="Country"
                        options={ countries }
                        selection
                        name="country"
                        onChange={ this.handleChange }
                        value={ country }
                        fluid
                     />
                     <Form.Field>
                        <label>City</label>
                        <input
                           placeholder="City"
                           value={ city }
                           name="city"
                           onChange={ this.onChange }
                        />
                     </Form.Field>
                  </Form.Group>
                  {/*<Segment>
              <Header>Phone Verification</Header>

              <Form.Group>
                <Form.Field width="12">
                  <label>Phone Number</label>
                  <Popup
                    trigger={
                      <Input
                        placeholder="Phone number"
                        name="phone_number"
                        value={phone_number}
                        onChange={this.onChange}
                      />
                    }
                    header="Format"
                    content="+9779840000000"
                  />
                </Form.Field>
                <Form.Field width="4">
                  <Label
                    as="a"
                    size="medium"
                    style={{ marginTop: "20px", padding: "14px" }}
                    icon
                    onClick={() => this.handleVerification()}
                  >
                    <Icon name="check" />
                    verify
                  </Label>
                </Form.Field>
              </Form.Group>
                  </Segment>*/ }

                  <Form.Field>
                     <label>Bio</label>
                     <Form.TextArea
                        placeholder="Bio"
                        name="bio"
                        value={ bio }
                        onChange={ this.onChange }
                     />
                  </Form.Field>
                  <Button type="submit" primary onClick={ () => this.notify() }>
                     Update profile
                  </Button>
               </Form>
            </Segment>

            {
               //   <Modal
               //   open={this.state.verifyModal}
               //   onClose={() => this.setState({ verifyModal: false })}
               //   closeIcon
               //   basic
               // >
               //   <Modal.Content>
               //     <Segment>
               //       <Message info icon>
               //         <Icon name="info circle" />
               //         <Message.Content>
               //           Enter the verification code you received on
               //           <code>{phone_number}</code>
               //         </Message.Content>
               //       </Message>
               //       <Form onSubmit={this.verifyCode}>
               //         <Form.Input
               //           label="Verification Code"
               //           type="number"
               //           placeholder="xxxxxx"
               //           name="verification_code"
               //           onChange={this.onChange}
               //           value={this.state.verification_code}
               //         />
               //         <Button fluid primary>
               //           Verify
               //         </Button>
               //       </Form>
               //     </Segment>
               //   </Modal.Content>
               // </Modal>
            }
         </React.Fragment>
      )
   }
}

const mapStateToProps = ( state ) => ( {
   auth: state.auth,
} )

const mapDispatchToProps = ( dispatch ) => ( {
   updateUserProfile: ( formData, username ) =>
      dispatch( updateUserProfile( formData, username ) ),
   // changeEditModal: () => dispatch(changeEditModal())
} )
export default connect( mapStateToProps, mapDispatchToProps )( EditProfile )
