import React, { Component } from "react"
import { Menu, Grid, Container, Card, Divider } from "semantic-ui-react"
import { connect } from "react-redux"
import { getSamajList, getMySamajList } from "src/actions/samajActions"
import EachSamaj from "./EachSamaj"
import SamajRightBar from "./SamajRightBar"
import RequestSamaj from "../Samaj/RequestSamaj"

import SathiCardPlaceHolder from "../Sathi/SathiLayout/SathiPlaceHolder"

class Samaj
   extends Component {
   constructor( props ) {
      super( props )
      this.state = {
         currentTab: "allSamaj",
      }
   }

   componentDidMount() {
      this.props.getSamajList()
   }

   handleTabChangeAllSamaj = () => {
      this.setState( {
         currentTab: "allSamaj",
      } )
   }

   handleTabChangeMySamaj = () => {
      this.setState(
         {
            currentTab: "mySamaj",
         },
         () => this.props.getMySamajList(),
      )
   }
   handleTabChangeRequestSamaj = () => {
      this.setState( {
         currentTab: "requestSamaj",
      } )
   }

   render() {
      let samajdata = ""

      if ( this.state.currentTab === "allSamaj" ) {
         samajdata =
            this.props.user &&
            this.props.samajs &&
            this.props.samajs.map( ( samaj, i ) => (
               <Grid.Column computer={ 5 } mobile={ 16 }>
                  <EachSamaj samaj={ samaj } user={ this.props.user }/>
               </Grid.Column>
            ) )
      } else if ( this.state.currentTab === "mySamaj" ) {
         samajdata =
            this.props.user && this.props.mySamaj.length ? (
               this.props.mySamaj.map( ( samaj ) => (
                  <Grid.Column computer={ 5 } mobile={ 16 } tablet={ 8 }>
                     <EachSamaj samaj={ samaj } userId={ this.props.user.uid }/>
                  </Grid.Column>
               ) )
            ) : (
               <Grid.Row>
                  <Grid.Column>
                     <Card style={ { marginLeft: 20 } }>
                        <Card.Content textAlign="center">
                           <Card.Header>No Samaj Subscribed yet</Card.Header>
                           <Divider/>
                           <Card.Description>
                              Please Subscribe Samaj to your list.
                           </Card.Description>
                        </Card.Content>
                     </Card>
                  </Grid.Column>
               </Grid.Row>
            )
      } else {
         samajdata = <RequestSamaj/>
      }
      return (
         <React.Fragment>
            <Container>
               <Grid>
                  <Grid.Row>
                     <Grid.Column computer={ 12 } tablet={ 12 } mobile={ 16 }>
                        <Grid>
                           <Grid.Row>
                              <Grid.Column>
                                 <Menu
                                    pointing
                                    secondary
                                    style={ { border: 0, background: "white" } }
                                    widths={ 3 }
                                    color="red"
                                 >
                                    <Menu.Item
                                       name="Sabai Samaj"
                                       active={ this.state.currentTab === "allSamaj" }
                                       onClick={ this.handleTabChangeAllSamaj }
                                    >
                                       Sabai Samaj
                                    </Menu.Item>
                                    <Menu.Item
                                       name="Mero Samaj"
                                       active={ this.state.currentTab === "mySamaj" }
                                       onClick={ this.handleTabChangeMySamaj }
                                    ></Menu.Item>
                                    <Menu.Item
                                       name="Request New Samaj"
                                       active={ this.state.currentTab === "requestSamaj" }
                                       onClick={ this.handleTabChangeRequestSamaj }
                                    ></Menu.Item>
                                 </Menu>
                              </Grid.Column>
                           </Grid.Row>
                        </Grid>
                        <div className="grid-padding" style={ { background: "#f5f5f5" } }>
                           <Grid>
                              { this.props.isLoading ? (
                                 <Grid.Row columns={ 3 }>
                                    <Grid.Column computer={ 5 } mobile={ 16 }>
                                       <SathiCardPlaceHolder/>
                                    </Grid.Column>
                                    <Grid.Column computer={ 5 } mobile={ 16 }>
                                       <SathiCardPlaceHolder/>
                                    </Grid.Column>
                                    <Grid.Column computer={ 5 } mobile={ 16 }>
                                       <SathiCardPlaceHolder/>
                                    </Grid.Column>
                                 </Grid.Row>
                              ) : (
                                 <Grid.Row columns={ 3 }>{ samajdata }</Grid.Row>
                              ) }
                           </Grid>
                        </div>
                     </Grid.Column>

                     <Grid.Column
                        only="computer tablet"
                        width={ 4 }
                        className="no-padding no-margin"
                     >
                        <SamajRightBar/>
                     </Grid.Column>
                  </Grid.Row>
               </Grid>
            </Container>
         </React.Fragment>
      )
   }
}

export const mapStateToProps = ( state ) => {
   return {
      samajs: state.samaj.samajs,
      user: state.auth.user,
      mySamaj: state.samaj.mySamaj,
      isLoading: state.samaj.isLoading,
   }
}

export const mapDispatchToProps = ( dispatch ) => {
   return {
      getSamajList: () => dispatch( getSamajList() ),
      getMySamajList: () => dispatch( getMySamajList() ),
   }
}

export default connect( mapStateToProps, mapDispatchToProps )( Samaj )
