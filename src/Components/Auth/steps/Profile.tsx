import React, { Component } from "react"
import { Form, Icon, Button, Input, Dropdown } from "semantic-ui-react"
import { DateInput } from "semantic-ui-calendar-react"
import classnames from "classnames"
import { countries } from "./countries"

export default class Profile
   extends Component {
   continue = ( e ) => {
      e.preventDefault()
      this.props.nextStep()
   }

   back = ( e ) => {
      e.preventDefault()
      this.props.prevStep()
   }

   render() {
      const { values, onChange, handleChange, errors } = this.props
      const genderOptions = [
         { key: "Male", text: "Male", value: "male" },
         { key: "Female", text: "Female", value: "female" },
      ]

      return (
         <Form>
            <Form.Group widths="equal">
               <Form.Field
                  required
                  label="First Name"
                  icon="user"
                  iconPosition="left"
                  placeholder="First Name"
                  control={ Input }
                  name="first_name"
                  onChange={ onChange( "first_name" ) }
                  value={ values.first_name }
                  className={ classnames( { error: errors.first_name } ) }
               />

               <Form.Field
                  required
                  label="Last Name"
                  icon="user outline"
                  iconPosition="left"
                  placeholder="Last Name"
                  control={ Input }
                  name="last_name"
                  onChange={ onChange( "last_name" ) }
                  value={ values.last_name }
                  className={ classnames( { error: errors.last_name } ) }
               />
            </Form.Group>

            <Form.Group widths="equal">
               <Form.Field
                  required
                  control={ Dropdown }
                  search
                  placeholder="Gender"
                  label="Gender"
                  options={ genderOptions }
                  selection
                  name="gender"
                  onChange={ handleChange }
                  value={ values.gender }
                  fluid
                  className={ classnames( "dropPadFix", { error: errors.gender } ) }
               />
               <Form.Field
                  required
                  label="Birth Date"
                  control={ DateInput }
                  dateFormat="YYYY-MM-DD"
                  clearable
                  clearIcon={ <Icon name="remove" color="red"/> }
                  icon="calendar"
                  iconPosition="left"
                  placeholder="YYYY-MM-DD"
                  name="birth_date"
                  onChange={ handleChange }
                  value={ values.birth_date }
                  className={ classnames( { error: errors.birth_date } ) }
               />
            </Form.Group>
            <Form.Group widths="equal">
               <Form.Field
                  required
                  control={ Dropdown }
                  search
                  placeholder="Country"
                  label="country"
                  options={ countries }
                  selection
                  name="country"
                  onChange={ handleChange }
                  value={ values.country }
                  fluid
                  className={ classnames( "dropPadFix", { error: errors.country } ) }
               />
               <Form.Field
                  required
                  label="Current City"
                  icon="home"
                  iconPosition="left"
                  placeholder="Current city.."
                  control={ Input }
                  name="city"
                  onChange={ onChange( "city" ) }
                  value={ values.city }
                  className={ classnames( { error: errors.city } ) }
               />
            </Form.Group>

            <Form.Field
               required
               label="Hometown"
               icon="home"
               iconPosition="left"
               placeholder="your hometown.."
               control={ Input }
               name="hometown"
               onChange={ onChange( "hometown" ) }
               value={ values.hometown }
               className={ classnames( { error: errors.hometown } ) }
            />

            <Button.Group fluid>
               <Button animated primary onClick={ this.continue }>
                  <Button.Content visible>Continue</Button.Content>
                  <Button.Content hidden>
                     <Icon name="arrow right"/>
                  </Button.Content>
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
         </Form>
      )
   }
}
