import React, { Component } from "react"
import {
   Modal,
   Image,
   Card,
   Grid,
   Feed,
   Divider,
   Container,
} from "semantic-ui-react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { getAllNotifications } from "src/actions/allNotificationsActions"
import { getPost, clearPost } from "src/actions/postActions"
import Post from "../Posts/Post/Post"
import NotificationsPlaceHolder from "./NotificationsPlaceHolder"
import moment from "moment"
import { getComments } from "src/actions/commentActions"

class Notifications
   extends Component {
   componentDidMount() {
      this.props.getAllNotifications()

   }

   handleUserNotificationPostClick = ( slug ) => {
      this.props.getPost( slug )

   }

   handleUserNotificationCommentClick = ( pid ) => {
      this.props.getPost( pid )
      // this.props.getComments(this.props.pid);
   }

   removePost = () => {
      this.props.clearPost()
   }

   render() {
      return (
         <React.Fragment>
            { this.props.post && (
               <Modal


                  open={ this.props.post }
                  closeIcon
                  onClose={ () => this.removePost() }


               >
                  <Modal.Content>
                     <Post post={ this.props.post }/>
                  </Modal.Content>
               </Modal>
            ) }

            { this.props.isLoading ? (
               <NotificationsPlaceHolder/>
            ) : (
               <Grid>
                  <Grid.Row>
                     <Grid.Column
                        computer={ 8 }
                        mobile={ 16 } // style={{ paddingLeft: 10, paddingTop: 5 }}
                        tablet={ 8 }
                     >
                        <Container fluid>
                           <Card
                              fluid
                              style={ {
                                 overflowY: "scroll",
                                 margin: "0 auto",

                                 top: 10,
                                 height: "fit-contain",
                                 position: "relative",
                              } }
                           >
                              <Card.Content>
                                 <Card.Header>All Notifications</Card.Header>
                                 <Divider/>

                                 { this.props.allNotifications &&
                                 this.props.allNotifications.results &&
                                 this.props.allNotifications.results.map(
                                    ( notification, index ) => (
                                       <Feed>
                                          <Feed.Event>
                                             <Image
                                                src={
                                                   notification &&
                                                   notification.user &&
                                                   notification.user.profile.avatar
                                                }
                                                style={ {
                                                   height: 32,
                                                   width: 32,
                                                   borderRadius: 32,
                                                   objectFit: "cover",
                                                   border:
                                                      "2px solid " +
                                                      notification && notification.user
                                                      && notification.user.points && notification.user.points.color_code,
                                                } }
                                             />
                                             <Feed.Content
                                                style={ { marginTop: 0, paddingLeft: 8 } }
                                             >
                                                <Feed.Summary>
                                                   <Feed.User
                                                      as={ Link }
                                                      to={ `/profile/${ notification && notification.user && notification.user.username }` }
                                                   >
                                                      { notification && notification.user && notification.user.first_name +
                                                      " " + notification.user.last_name }


                                                   </Feed.User>
                                                   { notification && notification.details && notification.details.category === "Like"
                                                      ?
                                                      <Link
                                                         style={ { marginLeft: 5 } }
                                                         onClick={ () =>
                                                            this.handleUserNotificationPostClick(
                                                               notification && notification.details && notification.details.post_slug,
                                                            )
                                                         }
                                                      >
                                                         { notification.action }
                                                      </Link>
                                                      : notification && notification.details
                                                      && notification.details.category === "Request Accept" ?
                                                         <Link
                                                            style={ { marginLeft: 5 } }
                                                            as={ Link }
                                                            to={ `/profile/${ notification && notification.user && notification.user.username }` }
                                                         >
                                                            { notification.action }
                                                         </Link>
                                                         : notification && notification.details
                                                         && notification.details.category === "Tag" ?
                                                            <Link
                                                               style={ { marginLeft: 5 } }
                                                               onClick={ () =>
                                                                  this.handleUserNotificationCommentClick(
                                                                     notification && notification.details && notification.details.post_slug,
                                                                  )
                                                               }
                                                            >
                                                               { notification.action }
                                                            </Link>
                                                            : "" }
                                                   <Feed.Date
                                                      content={ moment(
                                                         notification.timestamp,
                                                      )
                                                      .fromNow() }
                                                   />
                                                </Feed.Summary>
                                             </Feed.Content>
                                          </Feed.Event>
                                          <Divider/>
                                       </Feed>
                                    ),
                                 ) }
                              </Card.Content>
                           </Card>
                        </Container>
                     </Grid.Column>
                  </Grid.Row>
               </Grid>
            ) }
         </React.Fragment>
      )
   }
}

export const mapStateToProps = ( state ) => {
   return {
      allNotifications: state.notifications.allNotifications,
      post: state.posts.post,
      isLoading: state.notifications.isLoading,
   }
}

export const mapDispatchToProps = ( dispatch ) => {
   return {
      getAllNotifications: () => dispatch( getAllNotifications() ),
      getPost: ( slug ) => dispatch( getPost( slug ) ),
      getComments: ( pid ) => dispatch( getComments( pid ) ),
      clearPost: () => dispatch( clearPost() ),
   }
}

export default connect( mapStateToProps, mapDispatchToProps )( Notifications )
