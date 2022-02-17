import React, { Component } from "react"
import { Card, Popup, Image, Button, Grid } from "semantic-ui-react"
import { connect } from "react-redux"
import {
   joinSamaj,
   leaveSamaj,
   getSamajDetails,
   getSamajPosts,
   getPinnedPost,
} from "src/actions/samajActions"
import { Link } from "react-router-dom"

import "../../static/button.css"

class EachSamaj
   extends Component {
   handleSamajSubscribe = ( samajId ) => {
      this.props.joinSamaj( samajId, this.props.user )
   }
   handleSamajLeave = ( samajId ) => {
      this.props.leaveSamaj( samajId )
   }
   handleViewSamaj = ( samajId, slug ) => {
      this.props.getSamajDetails( samajId, slug )
      this.props.getSamajPosts( samajId, slug )
      this.props.getPinnedPost( samajId )
   }

   render() {
      const { samaj } = this.props
      let isSubscribed =
         samaj.subscribers.filter(
            ( subscriber ) => subscriber.uid === this.props.user.uid,
         ).length > 0

      return (
         <React.Fragment>
            <Card style={ { borderRadius: 0 } } fluid>
               <Card.Header>
                  <Image
                     src={ samaj.background }
                     style={ {
                        width: "100%",
                        height: "120px",
                        objectFit: "cover",
                        background: "grey",
                     } }
                  />
                  <Image
                     src={ samaj.icon }
                     avatar
                     style={ {
                        border: "5px solid white",
                        marginTop: "-40px",
                        marginLeft: 15,
                        borderRadius: "50%",
                        width: 72,
                        height: 72,
                        objectFit: "cover",
                     } }
                  />
                  <span style={ { marginLeft: 4, fontSize: 16, fontWeight: "bolder" } }>
              { samaj.name }
            </span>
                  { !isSubscribed && (
                     <Popup
                        trigger={
                           <Button
                              icon="plus"
                              color="facebook"
                              circular
                              toggle
                              // size="mini"
                              style={ {
                                 background: "#DC143C",
                                 float: "right",
                                 marginTop: "2px",
                                 height: "24px",
                                 width: "24px",
                                 padding: "0px",
                              } }
                              onClick={ () => this.handleSamajSubscribe( samaj.id ) }
                           />
                        }
                        content="Join Samaj"
                        position="top center"
                     />
                  ) }
               </Card.Header>
               <Card.Content style={ { borderTop: "1px solid lightgrey" } }>
                  <Card.Meta style={ { marginLeft: 0 } }>
                     { samaj.subscribers.length } Subscribers
                  </Card.Meta>
                  {/* giveMeEllipsis class reduces total lines to max 3... */ }
                  <Card.Description
                     style={ { fontWeight: "bold" } }
                     className="giveMeEllipsis"
                  >
                     { samaj.description }
                  </Card.Description>
                  <Grid>
                     <Grid.Column style={ { marginTop: 8 } }>
                        {
                           <Link to={ "/samaj/" + samaj.id + "/" + samaj.slug }>
                              <Button fluid>View</Button>
                           </Link>
                        }
                     </Grid.Column>
                  </Grid>
               </Card.Content>
            </Card>
         </React.Fragment>
      )
   }
}

export const mapStateToProps = ( state ) => {
   return {
      user: state.auth.user,
   }
}
const mapDispatchToProps = ( dispatch ) => {
   return {
      joinSamaj: ( samajId, user ) => dispatch( joinSamaj( samajId, user ) ),
      leaveSamaj: ( samajId ) => dispatch( leaveSamaj( samajId ) ),
      getSamajDetails: ( samajId, slug ) =>
         dispatch( getSamajDetails( samajId, slug ) ),
      getSamajPosts: ( samajId, slug ) => dispatch( getSamajPosts( samajId, slug ) ),
      getPinnedPost: ( samajId ) => dispatch( getPinnedPost( samajId ) ),
   }
}

export default connect( mapStateToProps, mapDispatchToProps )( EachSamaj )
