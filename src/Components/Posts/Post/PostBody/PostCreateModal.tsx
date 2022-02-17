import React, { Component } from "react"
import { Button, Icon, Modal, Image, Form, TextArea } from "semantic-ui-react"
import logo from "../../../../img/static/img/logo_1.png"

export default class NestedModal
   extends Component {
   state = { open: false, form: { title: "" } }

   handleOpen = () => this.setState( { open: true } )
   handleClose = () => this.setState( { open: false } )

   render() {
      const { open } = this.state

      return (
         <Modal
            open={ open }
            onOpen={ this.handleOpen }
            onClose={ this.handleClose }
            size="small"
            trigger={
               <Button size="mini" style={ { width: "180px" } }>
                  {/* Proceed <Icon name="right chevron" /> */ }
                  <Image src={ logo } avatar/> Share
               </Button>
            }
         >
            <Modal.Header>Share this post</Modal.Header>
            <Modal.Content>
               <Form>
                  <Form.Field
                     control={ TextArea }
                     placeholder="Whats on your mind..."
                     style={ {
                        minHeight: 100,
                        width: "100%",
                        border: "1px solid lightgrey",
                        marginTop: 10,
                        padding: 10,
                     } }
                     name="title"
                     value={ this.state.form.title }
                     onChange={ ( e ) => this.handleChange( e ) }
                  />
                  <Button fluid color="blue" onClick={ () => this.handleSubmit() }>
                     Share Post
                  </Button>
               </Form>
            </Modal.Content>
            <Modal.Actions>
               <Button icon="check" content="All Done" onClick={ this.handleClose }/>
            </Modal.Actions>
         </Modal>
      )
   }
}
