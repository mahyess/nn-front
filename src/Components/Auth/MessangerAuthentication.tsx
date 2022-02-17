import React, { Component } from "react"
import { Grid } from "semantic-ui-react"
import Navbar from "../Layout/Navbar"

export default function ( ComposedComponent ) {
   class MessengerAuthentication
      extends Component {
      constructor( props ) {
         super( props )
         this.state = {
            valid: true,
            page: "message",
            sidebarOpen: false,
         }
      }

      componentDidMount() {
         const token = localStorage.getItem( "token" )

         if ( token ) {
         } else {
            this.props.history.push( "/" )
         }
      }

      changeSidebarStatus = () => {
         const sidebarStatus = this.state.sidebarOpen
         this.setState( { sidebarOpen: !sidebarStatus } )
      }

      render() {
         return (
            <React.Fragment>
               <Grid style={ {} }>
                  <Grid.Row columns={ 1 } style={ {} }>
                     <Grid.Column computer={ 16 } tablet={ 16 } mobile={ 16 }>
                        <Navbar
                           sidebarOpen={ this.state.sidebarOpen }
                           changeSidebarStatus={ this.changeSidebarStatus }
                        />
                     </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={ 1 } style={ { height: "90vh" } }>
                     <Grid.Column width={ 16 }>
                        { this.state.valid && <ComposedComponent { ...this.props } /> }
                     </Grid.Column>
                  </Grid.Row>
               </Grid>

               {/* </Container> */ }
            </React.Fragment>
         )
      }
   }

   return MessengerAuthentication
}
