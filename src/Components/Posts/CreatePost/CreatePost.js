import React, { Component } from "react"
import { Modal, Image, Form, Button, TextArea, Input } from "semantic-ui-react"

import ImageUploadComponent from "../../Common/ImageUploadComponent"

export default class CreatePost
   extends Component {
   constructor( props ) {
      super( props )

      this.state = {
         form: {
            images: [],
            media: null,
            title: "",
            body: "",
         },
      }
   }

   render() {
      return (
         <Modal
            open={ this.props.modalOpen }
            closeIcon
            onClose={ this.props.handleClose }
            size="tiny"
         >
            <Modal.Header>
               <Image
                  src={
                     this.props.user &&
                     this.props.user.profile &&
                     this.props.user.profile.avatar
                  }
                  avatar
                  style={ {
                     height: 36,
                     width: 36,
                     padding: 4,
                     background: "white",
                  } }
               />
               Whats on your mind?
            </Modal.Header>
            <Modal.Content>
               <Form onSubmit={ () => this.handleSubmit() }>
                  <ImageUploadComponent
                     uploadImageToState={ this.uploadImageToState }
                  />
                  <Input
                     placeholder="Title..."
                     fluid
                     name="title"
                     value={ this.state.form.title }
                     onChange={ ( e ) => this.handleChange( e ) }
                     style={ { paddingTop: 5 } }
                  />
                  <TextArea
                     placeholder="Tell us more..."
                     style={ {
                        minHeight: 100,
                        width: "100%",
                        border: "1px solid lightgrey",
                        marginTop: 10,
                        padding: 10,
                     } }
                     name="body"
                     value={ this.state.form.body }
                     onChange={ ( e ) => this.handleChange( e ) }
                  />
                  <Button fluid color="blue" style={ { marginTop: 5 } }>
                     Add
                  </Button>
                  { }
               </Form>
            </Modal.Content>
         </Modal>
      )
   }
}
