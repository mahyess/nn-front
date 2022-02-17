import React, { Component } from "react"

import { Container, Grid } from "semantic-ui-react"
import Chautari from "../../Chautari/Chautari"

export default class HomePage
   extends Component {
   constructor( props ) {
      super( props )
      this.state = {
         username: "",
         password: "",
         errors: {},
         buttonDisabled: false,
         page: "login",
      }
   }

   render = () => (
      <React.Fragment>
         <Grid>
            <Grid.Row>
               <Grid.Column>
                  <Container>
                     <Chautari/>
                  </Container>
               </Grid.Column>
            </Grid.Row>
         </Grid>

      </React.Fragment>
   )
}
