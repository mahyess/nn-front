import React from 'react'
import { Card, Divider, Grid } from "semantic-ui-react"
import * as PropTypes from "prop-types"

const ChautariNoPostMessage = ( { activeItem } ) => {

   // console.log(this.props.currentTab,"tab cheec")
   return (

      <Grid>
         <Grid.Row>
            <Grid.Column>
               <Card fluid>
                  <Card.Content textAlign="center">
                     <Card.Header>Oops Sorry </Card.Header>
                     <Divider/>
                     <Card.Description>
                        <h1> No Post </h1>
                        <h3>
                           { activeItem === "Hot" ? "No posts in hot"
                              : activeItem === "Trending" ? "No posts in trending"
                                 : activeItem === "Sathi" && "No post from friends" }
                        </h3>

                     </Card.Description>
                  </Card.Content>
               </Card>
            </Grid.Column>
         </Grid.Row>
      </Grid>
   )

}

ChautariNoPostMessage.propTypes = {
   activeItem: PropTypes.string.isRequired,
}

export default ChautariNoPostMessage




