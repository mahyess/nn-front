import React, { Component } from "react"
import { connect } from "react-redux"
import { Card, Grid, Image, Button, Popup } from "semantic-ui-react"
import { joinSamaj, getSamajList } from "src/actions/samajActions"

class SamajRightBar
   extends Component {
   componentDidMount() {
      this.props.getSamajList()
   }

   render() {
      return (
         <Grid className="center" style={ { padding: 10 } }>
            {/* <Card.Header className="center"> */ }
            <h3 style={ { paddingBottom: 20 } }>Featured Samaj</h3>
            {/* </Card.Header> */ }
            { this.props.samajList.map( ( samaj ) => (
               <Card key={ samaj.id } className="center no-borderRadius">
                  <Card.Content>
                     <Grid>
                        <Grid.Column
                           width={ 4 }
                           style={ { paddingRight: 0, marginRight: 0 } }
                        >
                           <Image
                              avatar
                              size="huge"
                              style={ { objectFit: "cover" } }
                              src={ samaj.icon }
                           />
                        </Grid.Column>
                        <Grid.Column
                           width={ 8 }
                           style={ { paddingRight: 0, marginRight: 0, paddingLeft: 0 } }
                           className="center"
                        >
                           <span>{ samaj.name }</span>
                        </Grid.Column>

                        <Grid.Column
                           width={ 4 }
                           style={ { paddingRight: 0, marginRight: 0, paddingLeft: 0 } }
                           className="center"
                        >
                           <Popup
                              trigger={
                                 <Button
                                    icon="plus"
                                    color="facebook"
                                    circular
                                    toggle
                                    style={ { background: "red" } }
                                    onClick={ () =>
                                       this.props.joinSamaj( samaj.id, this.props.user )
                                    }
                                 />
                              }
                              content="Join Samaj"
                              position="top center"
                           />
                        </Grid.Column>
                     </Grid>
                  </Card.Content>
               </Card>
            ) ) }
         </Grid>
      )
   }
}

export const mapStateToProps = ( state ) => {
   return {
      samajList: state.samaj.samajs,
      user: state.auth.user,
   }
}

const mapDispatchToProps = ( dispatch ) => {
   return {
      getSamajList: () => dispatch( getSamajList() ),
      joinSamaj: ( samajId, user ) => dispatch( joinSamaj( samajId, user ) ),
   }
}

export default connect( mapStateToProps, mapDispatchToProps )( SamajRightBar )
