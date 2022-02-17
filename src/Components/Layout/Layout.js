import Navbar from "./Navbar"

import React, { Component } from "react"

import SidebarMenu from "./Sidebar"
import { Grid } from "semantic-ui-react"
import { BrowserRouter } from "react-router-dom"
import "../../static/style.css"
import Sidebar from "react-sidebar"

const mql = window.matchMedia( `(min-width: 800px)` )

class Layout
   extends Component {
   constructor( props ) {
      super( props )
      this.state = {
         sidebarDocked: mql.matches,
         sidebarOpen: true,
      }


   }

   componentWillMount() {
      mql.addListener( this.mediaQueryChanged )
   }

   componentWillUnmount() {
      mql.removeListener( this.mediaQueryChanged )
   }

   changeSidebarStatus = () => {
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
            <BrowserRouter>
               <Sidebar
                  sidebar={ <SidebarMenu/> }
                  open={ this.state.sidebarOpen }
                  docked={ this.state.sidebarDocked }
                  onSetOpen={ this.onSetSidebarOpen }
               >
                  <Grid>
                     <Grid.Column
                        computer={ 16 }
                        tablet={ 16 }
                        mobile={ 16 }
                        className="no-padding no-margin"
                     >
                        <Grid.Column width={ 16 }>
                           <Navbar
                              sidebarOpen={ this.state.sidebarOpen }
                              changeSidebarStatus={ this.changeSidebarStatus }
                           />
                        </Grid.Column>

                        {/*<Grid.Column width={16}></Grid.Column>*/ }
                     </Grid.Column>
                  </Grid>
               </Sidebar>
               {/* </Container> */ }
            </BrowserRouter>
         </React.Fragment>
      )
   }
}

export default Layout
