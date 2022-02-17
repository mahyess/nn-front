import React, { Component } from "react"
import { getUserActivities } from "../../actions/authActions"
import { Grid, Card, Icon, Transition, Divider } from "semantic-ui-react"
import Activity from "./Activity"
import { connect } from "react-redux"

import SuggestedFriends from "../Sathi/SuggestedFriends"
import PubgEvent from "../Events/PubgEvent"

class RightBar
   extends Component {
   state = {
      visible: true, // for transition effect of refresh button
      suggested_friends: [],
      toUser: "",
   }

   componentDidMount() {
      this.props.getUserActivities()
   }

   toggleVisibility = () => {
      this.setState( ( prevState ) => ( { visible: !prevState.visible } ) )
      return true
   }

   // suggested friends//

   //suggested friends ends here//
   render() {
      return (
         <React.Fragment>
            <Grid style={ { height: "100vh", overflowY: "scroll" } }>
               {/* <Grid.Row>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>
                    Recent Activity
                    <Transition
                      animation="jiggle"
                      duration={500}
                      visible={this.state.visible}
                    >
                      <Icon
                        name="refresh"
                        size="small"
                        style={{
                          float: "right",
                        }}
                        onClick={() =>
                          this.toggleVisibility() && this.componentDidMount()
                        }
                      />
                    </Transition>
                  </Card.Header>
                </Card.Content>

                {this.props.activities &&
                  this.props.activities.map((activitiesItem, index) => (
                    <Activity key={index} activitiesItem={activitiesItem} />
                  ))}
              </Card>
            </Grid.Column>
          </Grid.Row>*/ }
               <Grid.Row>
                  <Grid.Column width={ 10 }>
                     <PubgEvent/>
                  </Grid.Column>
               </Grid.Row>
               <Grid.Row style={ { marginBottom: "250px" } }>
                  <Grid.Column width={ 10 }>
                     <Card fluid>
                        <Card.Content>
                           <h4>Suggested Friends</h4>
                        </Card.Content>
                        <Divider/>
                        <SuggestedFriends pageCalledFrom="chautari"/>
                     </Card>
                  </Grid.Column>
               </Grid.Row>
            </Grid>
         </React.Fragment>
      )
   }
}

export const mapStateToProps = ( state ) => {
   return {
      activities: state.auth.activities,
   }
}

export const mapDispatchToProps = ( dispatch ) => {
   return {
      getUserActivities: () => dispatch( getUserActivities() ),
   }
}

export default connect( mapStateToProps, mapDispatchToProps )( RightBar )
