import React, { Component } from "react"
import { Grid, Container, Card, Button } from "semantic-ui-react"
import InfiniteScroll from "react-infinite-scroll-component"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { getHashTagLists } from "src/actions/hashTagAction"

class HashTagList
   extends Component {
   componentDidMount() {
      this.props.getHashTagLists()
   }

   render() {
      return (
         <React.Fragment>
            <Container>
               <Grid style={ { marginRight: 0 } } className="no-margin no-padding">
                  <Grid.Column
                     computer={ 16 }
                     tablet={ 16 }
                     mobile={ 16 }
                     className="no-padding no-margin"
                  >
                     <InfiniteScroll
                        dataLength={ this.props.hashTagLists.length }
                        height="86vh"
                        style={ { padding: 15 } }
                     >
                        <Grid stackable className="no-padding">
                           { this.props.hashTagLists &&
                           this.props.hashTagLists.map( ( hashtag ) => (
                              <Grid.Row
                                 style={ {
                                    margin: "0px",
                                    marginBottom: "4vh",
                                    padding: 0,
                                 } }
                              >
                                 <Card.Group>
                                    <Card>
                                       <Card.Content>
                                          <Card.Header>{ hashtag.title }</Card.Header>
                                       </Card.Content>
                                       <Card.Content extra>
                                          <div className="ui two buttons">
                                             <Button
                                                basic
                                                color="green"
                                                as={ Link }
                                                to={ `/hashtag/${ hashtag.title }/` }
                                             >
                                                View
                                             </Button>
                                          </div>
                                       </Card.Content>
                                    </Card>
                                 </Card.Group>
                              </Grid.Row>
                           ) ) }
                        </Grid>
                     </InfiniteScroll>
                     <Grid.Column width={ 16 }> </Grid.Column>
                     <Grid.Column width={ 16 }></Grid.Column>
                  </Grid.Column>
               </Grid>
            </Container>
         </React.Fragment>
      )
   }
}

export const mapStateToProps = ( state ) => {
   return {
      hashTagLists: state.hash.hashTagLists,
   }
}

export const mapDispatchToProps = ( dispatch ) => {
   return {
      getHashTagLists: () => dispatch( getHashTagLists() ),
   }
}

export default connect( mapStateToProps, mapDispatchToProps )( HashTagList )
