import React, { Component } from "react"
import {
   Grid,
   Segment,
   Header,
   Image,
   GridColumn,
   List,
   Responsive,
   Container,
} from "semantic-ui-react"
import logo from "../../../img/static/img/logo_1.png"
import AuthLogin from "./AuthLogin"
import Signup from "./Signup"
import { connect } from "react-redux"

class Login
   extends Component {
   render() {
      return (
         <Container fluid style={ { backgroundColor: "#f0f0f0", height: "90vh" } }>
            <Container className="grid-padding">
               <Grid>
                  <Grid.Row style={ { marginTop: "50px" } } centered>
                     <GridColumn
                        as={ Responsive }
                        { ...Responsive.onlyComputer }
                        computer={ 6 }
                     >
                        <Segment piled>
                           <Image centered src={ logo } size="tiny"/>
                           <Header as="h1" dividing textAlign="center">
                              NamasteNepal
                              <Header.Subheader style={ { padding: "9px" } }>
                                 Connect With Your Community
                              </Header.Subheader>
                           </Header>
                           <List relaxed="very">
                              <List.Item>
                                 <List.Icon name="users" size="big" color="blue"/>
                                 <List.Content>
                                    Meet all peoples from all over the world
                                 </List.Content>
                              </List.Item>
                              <List.Item>
                                 <List.Icon name="newspaper" size="big" color="grey"/>
                                 <List.Content>
                                    Get Connected with Communities
                                 </List.Content>
                              </List.Item>
                              <List.Item>
                                 <List.Icon name="share" size="big" color="orange"/>
                                 <List.Content>
                                    Share your thoughts and knowledge with others .
                                 </List.Content>
                              </List.Item>
                              <List.Item>
                                 <List.Icon name="heart" size="big" color="red"/>
                                 <List.Content>
                                    Make a good relationship with peoples
                                 </List.Content>
                              </List.Item>
                              <List.Item>
                                 <List.Icon name="star" size="big" color="yellow"/>
                                 <List.Content>
                                    Earn badges for the events and points for the good
                                    deeds.
                                 </List.Content>
                              </List.Item>
                           </List>
                        </Segment>
                        {
                           //   this.props.page === "signup" ? (
                           //   <Message warning icon size="small">
                           //     <Icon name="question circle" />
                           //     <Message.Content>
                           //       Missed your earlier phone verification?{" "}
                           //       <Link to="/phone-verify/">verify</Link>
                           //     </Message.Content>
                           //   </Message>
                           // ) : null
                        }
                     </GridColumn>

                     <GridColumn computer={ 7 } mobile={ 16 }>
                        <Segment style={ { padding: 0 } }>
                           { this.props.page === "login" ? <AuthLogin/> : <Signup/> }
                        </Segment>
                     </GridColumn>
                  </Grid.Row>
               </Grid>
            </Container>
         </Container>
      )
   }
}

const mapStateToProps = ( state ) => ( {
   page: state.misc.page,
} )
// const mapDispatchToProps = (dispatch) => ({
//   changeAuthPage: (page) => dispatch(changeAuthPage(page)),
// });

export default connect( mapStateToProps, null )( Login )
