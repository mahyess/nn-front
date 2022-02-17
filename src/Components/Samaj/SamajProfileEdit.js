import React, { Component } from "react"
import {
   Header,
   Form,
   Button,
   Segment,
   List,
   Image,
   Icon,
} from "semantic-ui-react"
import { updateSamajDescription, kickUser } from "src/actions/samajActions"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

class SamajProfileEdit
   extends Component {
   constructor( props ) {
      super( props )
      this.state = {
         description: "",
      }
   }

   handleDismiss = () => {
      this.setState( { errors: {} } )
   }

   handleChange = ( e ) => {
      this.setState( { [e.target.name]: e.target.value } )
   }

   handleSubmit = () => {
      let formData = new FormData()

      formData.append( "id", this.props.samajid )

      formData.append( "descriptions", this.state.description )
      this.props.updateSamajDescription( formData )
   }

   handleUserKick = ( uid ) => {
      let formData = new FormData()

      formData.append( "id", this.props.samajid )
      formData.append( "uid", uid )
      this.props.kickUser( formData )
   }

   render() {
      return (
         <React.Fragment>
            <Form onSubmit={ () => this.handleSubmit() }>
               <Form.TextArea
                  value={ this.props.samaj.details.description }
                  label="Current descriptions"
                  disabled
               />
               <Form.TextArea
                  placeholder="Descriptions"
                  name="description"
                  value={ this.state.description }
                  onChange={ ( e ) => this.handleChange( e ) }
                  className="commentArea"
                  label="New descriptions"
               />

               <Form.Field>
                  <Button type="submit" fluid primary>
                     Update
                  </Button>
               </Form.Field>
            </Form>
            <Header as="h3" dividing>
               Samaj Subscribers
            </Header>
            <Segment
               className="pad-0"
               basic
               style={ { height: "200px", overflow: "auto" } }
            >
               <List divided verticalAlign="middle" size="big">
                  { this.props.samaj.details.subscribers.map( ( subscriber ) => (
                     <List.Item>
                        <Link
                           to={ "/profile/" + subscriber.username }
                           style={ { color: "black" } }
                        />
                        <Image avatar src={ subscriber.profile.avatar }/>
                        { subscriber.first_name } { subscriber.last_name }
                        <Icon
                           link
                           name="close"
                           style={ { float: "right", color: "red" } }
                           onClick={ () => this.handleUserKick( subscriber.uid ) }
                        />
                     </List.Item>
                  ) ) }
               </List>
            </Segment>
         </React.Fragment>
      )
   }
}

export const mapDispatchToProps = ( dispatch ) => {
   return {
      updateSamajDescription: ( formData ) =>
         dispatch( updateSamajDescription( formData ) ),
      kickUser: ( formData ) => dispatch( kickUser( formData ) ),
   }
}

export default connect( null, mapDispatchToProps )( SamajProfileEdit )
