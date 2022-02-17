import React, { Component } from "react"
import { Button, Header, Icon, Modal } from "semantic-ui-react"

class RegisterFormPubg
   extends Component {
   render() {
      const { modalState, changeModalState } = this.props
      return (
         <React.Fragment>
            <Modal
               closeIcon
               open={ modalState }
               onClose={ () => changeModalState( false ) }
               onOpen={ () => changeModalState( true ) }
            >
               <Header content="Pubg Tournament"/>
               <Modal.Content>
                  <p>
                     Under Construction. Please have patience till then. Thankyou 😊{ " " }
                  </p>
               </Modal.Content>
               {
                  //  <Modal.Actions>
                  //     <Button color="red" onClick={() => changeModalState(false)}>
                  //       <Icon name="remove" /> Cancel
                  //     </Button>
                  //     <Button color="green" onClick={() => changeModalState(false)}>
                  //       <Icon name="checkmark" /> Submit
                  //     </Button>
                  //   </Modal.Actions>
               }
            </Modal>
         </React.Fragment>
      )
   }
}

export default RegisterFormPubg
