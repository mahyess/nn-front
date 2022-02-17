import React, { Component } from "react"

import SidebarMenu from "../Layout/Sidebar"
import { Grid } from "semantic-ui-react"

import "../../static/style.css"
import Sidebar from "react-sidebar"
import Navbar from "../Layout/Navbar"
import setAuthToken from "../../utils/setAuthToken"

const mql = window.matchMedia( `(min-width: 800px)` )
export default function ( ComposedComponent ) {
   if ( localStorage.getItem( "token" ) ) {
      setAuthToken( localStorage.getItem( "token" ) )
   }

   class Authentication
      extends Component {
      constructor( props ) {
         super( props )
         this.state = {
            valid: true,
            sidebarDocked: mql.matches,
            sidebarOpen: false,
         }
         this.mediaQueryChanged = this.mediaQueryChanged.bind( this )
         this.onSetSidebarOpen = this.onSetSidebarOpen.bind( this )
         this.changeSidebarStatus = this.changeSidebarStatus.bind( this )
      }

      componentDidMount() {
         const token = localStorage.getItem( "token" )

         if ( token ) {
         } else {
            this.props.history.push( "/" )
         }
      }

      componentWillMount() {
         mql.addListener( this.mediaQueryChanged )
      }

      componentWillUnmount() {
         mql.removeListener( this.mediaQueryChanged )
      }

      changeSidebarStatus() {
         const sidebarStatus = this.state.sidebarOpen
         this.setState( { sidebarOpen: !sidebarStatus } )
      }

      onSetSidebarOpen( open ) {
         this.setState( { sidebarOpen: open } )
      }

      mediaQueryChanged() {
         this.setState( { sidebarDocked: mql.matches, sidebarOpen: false } )
      }

      render() {
         return (
            <React.Fragment>
               <Sidebar
                  sidebar={ <SidebarMenu/> }
                  open={ this.state.sidebarOpen }
                  docked={ this.state.sidebarDocked }
                  onSetOpen={ this.onSetSidebarOpen }
                  style={ { boxShadow: "none", padding: "0px 16px" } }
               >
                  <Grid>
                     <Grid.Row columns={ 1 }>
                        <Grid.Column computer={ 16 } tablet={ 16 } mobile={ 16 }>
                           <Navbar
                              sidebarOpen={ this.state.sidebarOpen }
                              changeSidebarStatus={ this.changeSidebarStatus }
                           />
                        </Grid.Column>
                     </Grid.Row>
                     <Grid.Row columns={ 1 }>
                        <Grid.Column width={ 16 }>
                           { this.state.valid && <ComposedComponent { ...this.props } /> }
                        </Grid.Column>
                     </Grid.Row>
                  </Grid>
               </Sidebar>
               {/* </Container> */ }
            </React.Fragment>
         )
      }
   }

   return Authentication
}
