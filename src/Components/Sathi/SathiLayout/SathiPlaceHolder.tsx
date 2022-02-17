import React from "react"
import { Card, Placeholder, Image } from "semantic-ui-react"

const SathiCardPlaceHolder = () => {
   return (
      <Card.Group>
         <Card>
            <Placeholder>
               <Placeholder.Image style={ { height: "120px" } }/>
               <Placeholder.Image
                  square
                  style={ {
                     position: "absolute",
                     height: "72px",
                     width: "72px",
                     borderRadius: 60,
                     backgroundColor: "white",
                     padding: 0,
                     top: 80,
                     left: 8,
                  } }
               />
            </Placeholder>
            <Card.Content>
               <Placeholder>
                  <Placeholder.Header>
                     <Placeholder.Line length="large" style={ { marginLeft: 16 } }/>
                     <Placeholder.Line length="large"/>
                     <Placeholder.Line length="large"/>
                  </Placeholder.Header>
                  <Placeholder.Paragraph>
                     <Placeholder.Line length="short"/>
                     <Placeholder.Line length="short"/>
                  </Placeholder.Paragraph>
                  <Placeholder.Paragraph>
                     <Placeholder.Line
                        length="large"
                        style={ { height: "28px", background: "#dedede" } }
                     />
                  </Placeholder.Paragraph>
               </Placeholder>
            </Card.Content>
         </Card>
      </Card.Group>
   )
}

export default SathiCardPlaceHolder
