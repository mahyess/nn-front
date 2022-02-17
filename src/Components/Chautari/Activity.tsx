import React, { Component } from "react"
import { Card, Image, Feed } from "semantic-ui-react"
import { Link } from "react-router-dom"

import moment from "moment"
import { connect } from "react-redux"
import { getPost } from "src/actions/postActions"

class Activity
   extends Component {
   handleUserActivityClick = ( slug ) => {
      this.props.getPost( slug )
   }

   render() {
      return (
         <React.Fragment>
            <Card.Content>
               <Feed>
                  <Feed.Event>
                     <Image
                        src={ this.props.activitiesItem.user.profile.avatar }
                        style={ {
                           height: 32,
                           width: 32,
                           borderRadius: 32,
                           objectFit: "cover",
                           border:
                              "2px solid " +
                              this.props.activitiesItem.user.points.color_code,
                        } }
                     />
                     <Feed.Content style={ { marginTop: 0, paddingLeft: 8 } }>
                        <Feed.Summary>
                           { this.props.activitiesItem.user ? "You" : "" }
                           {
                              //  : this.props.user.username
                           }
                           <a
                              as={ Link }
                              onClick={ () =>
                                 this.handleUserActivityClick(
                                    this.props.activitiesItem.slug,
                                 )
                              }
                              style={ { color: "blue", paddingLeft: 3 } }
                           >
                              { this.props.activitiesItem.action }
                           </a>
                        </Feed.Summary>
                        <Feed.Date
                           style={ { paddingTop: 8 } }
                           content={ moment(
                              this.props.activitiesItem.timestamp,
                           )
                           .fromNow() }
                        />
                     </Feed.Content>
                  </Feed.Event>
               </Feed>
            </Card.Content>
         </React.Fragment>
      )
   }
}

export const mapStateToProps = ( state ) => {
   return {
      user: state.auth.user,
   }
}
export const mapDispatchToProps = ( dispatch ) => {
   return {
      getPost: ( slug ) => dispatch( getPost( slug ) ),
   }
}

export default connect( null, mapDispatchToProps )( Activity )
