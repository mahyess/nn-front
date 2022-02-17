import React from "react"
import { Placeholder, Card } from "semantic-ui-react"


const PlaceholderExampleParagraph = () => (

   <Card.Group>
      <Card fluid style={ { padding: 8 } }>
         <Placeholder fluid>
            <Placeholder.Header image>
               <Placeholder.Line/>
               <Placeholder.Line/>
            </Placeholder.Header>
            <Placeholder.Paragraph>
               <Placeholder.Line/>
               <Placeholder.Line/>
            </Placeholder.Paragraph>

            <Placeholder.Image style={ { height: 160 } }/>
            <Placeholder.Image style={ { height: 60, marginTop: 4 } }/>
         </Placeholder>
      </Card>
   </Card.Group>


)

export default PlaceholderExampleParagraph
