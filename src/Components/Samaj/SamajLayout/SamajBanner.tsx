import React, { Component } from "react"
import {
   Image,
   Grid,
   Button,
   Responsive,
   List,
   Popup,
   Modal,
} from "semantic-ui-react"

import { connect } from "react-redux"
import { blockUser } from "src/actions/profileActions"
import SamajBackgroundUpdater from "../../Profile/SamajBackgroundUpdater"
import SamajIconUpdater from "../../Profile/SamajIconUpdater"
import { Link } from "react-router-dom"
import { leaveSamaj, joinSamaj } from "src/actions/samajActions"

class SamajBanner
   extends Component {
   state = {
      screenWidth: 0,
   }

   handleSamajLeave = ( samajId, slug ) => {
      this.props.leaveSamaj( samajId, slug )
   }
   handleSamajSubscribe = ( samajId ) => {
      this.props.joinSamaj( samajId, this.props.user )
   }

   imageForSamajCover = () => (
      <Image
         src={ this.props.samajDetail && this.props.samajDetail.background }
         style={ { height: "240px", width: "100%", objectFit: "cover" } }
      />
   )

   // components used in render
   coverContainer = () => (
      <div>
         {/*  Modal for  coverpic triggered on click starts  here */ }
         <Modal trigger={ { ...this.imageForSamajCover() } } size="mini">
            {/* image for modal content when clicked on the coverpic starts here */ }
            <Modal.Content>
               <Image
                  src={ this.props.samajDetail && this.props.samajDetail.background }
               />
            </Modal.Content>
            {/* image for modal content when clicked on the coverpic ends here */ }
         </Modal>
         {/*  Modal for  coverpic ends here */ }

         {/* change samaj cover, available if user is samaj admin */ }
         { this.props.samajDetail &&
         this.props.samajDetail.admin &&
         this.props.user &&
         this.props.samajDetail.admin.filter(
            ( adminUser ) => adminUser.username === this.props.user.username,
         ).length > 0 && (
            <div
               style={ {
                  cursor: "pointer",
                  float: "right",
                  color: "rgb(10, 9, 9)",
                  position: "relative",
                  marginTop: -25,
                  background: "white",

                  width: 125,
                  marginRight: 5,
                  borderRadius: 2,
               } }
            >
               <SamajBackgroundUpdater
                  samajId={ this.props.samajDetail.id }
                  slug={ this.props.samajDetail.slug }
               />
            </div>
         ) }
      </div>
   )

   samajAvatar = () => (
      <Image
         src={ this.props.samajDetail && this.props.samajDetail.icon }
         size="small"
         circular
         style={ {
            marginTop: "-56px",
            // border: "2px solid white ",
            background: "white",
            height: 132,
            width: 132,
            objectFit: "cover",
         } }
      />
   )

   avatarContainer = () => (
      <div>
         { this.props.samajDetail &&
         this.props.samajDetail.admin &&
         this.props.user &&
         this.props.samajDetail.admin.filter(
            ( adminUser ) => adminUser.username === this.props.user.username,
         ).length > 0 ? (
            <Popup
               on="click"
               pinned
               position="bottom center"
               trigger={ this.samajAvatar() }
            >
               <List>
                  <List.Item m style={ { padding: 8, cursor: "pointer" } }>
                     <List.Icon name="eye"/>
                     <Modal
                        trigger={ <List.Content>View Samaj Avatar</List.Content> }
                        size="mini"
                     >
                        <Modal.Content>
                           <Image
                              src={ this.props.samajDetail && this.props.samajDetail.icon }
                           />
                        </Modal.Content>
                     </Modal>
                  </List.Item>

                  <List.Content>
                     <SamajIconUpdater
                        samajId={ this.props.samajDetail.id }
                        slug={ this.props.samajDetail.slug }
                     />
                  </List.Content>
               </List>
            </Popup>
         ) : (
            this.samajAvatar()
         ) }
      </div>
   )

   bannerDetails = () => {
      let name = ""
      if ( this.props.samajDetail ) name = this.props.samajDetail.name

      return (
         <div
            style={ {
               // marginTop: "8px",
               color: "black",
            } }
         >
            <h3>{ name }</h3>
            { this.props.samajDetail && this.props.samajDetail.description }
         </div>
      )
   }

   bannerSettings = () => {
      // samaj related buttons
      if ( this.props.samajDetail ) {
         return (
            <Link to="/samaj">
               <Button
                  color={ this.props.isSubscribed ? "red" : "green" }
                  fluid
                  onClick={ () =>
                     this.props.isSubscribed
                        ? this.handleSamajLeave(
                        this.props.samajDetail.id,
                        this.props.samajDetail.slug,
                        )
                        : this.handleSamajSubscribe( this.props.samajDetail.id )
                  }
               >
                  { this.props.isSubscribed ? "Leave" : "Subscribe" }
               </Button>
            </Link>
         )
      }
   }

   render() {
      const { screenWidth } = this.state

      return (
         <Grid>
            <Grid.Row>
               <Grid.Column>{ this.coverContainer() }</Grid.Column>
            </Grid.Row>
            <Grid.Row>
               <Grid.Column computer={ 16 } mobile={ 16 }>
                  <Grid.Row columns={ 2 }>
                     <Grid.Column computer={ 8 } mobile={ 16 }>
                        <Grid>
                           <Grid.Row columns={ 3 }>
                              <Grid.Column computer={ 2 } mobile={ 7 } style={ { padding: 0 } }>
                                 { this.avatarContainer() }
                              </Grid.Column>
                              <Grid.Column
                                 computer={ 11 }
                                 mobile={ 9 }
                                 style={ { padding: 0 } }
                              >
                                 <Grid>
                                    <Grid.Row columns={ 2 } style={ { padding: 0 } }>
                                       <Grid.Column computer={ 4 } mobile={ 16 }>
                                          { this.bannerDetails() }
                                       </Grid.Column>
                                       <Grid.Column
                                          computer={ 8 }
                                          mobile={ 16 }
                                          style={ {
                                             padding: 0,
                                             marginLeft:
                                                screenWidth >= Responsive.onlyComputer.minWidth
                                                   ? "0px"
                                                   : "8px",
                                             marginBottom: 8,
                                          } }
                                       ></Grid.Column>
                                    </Grid.Row>
                                 </Grid>
                              </Grid.Column>
                              <Grid.Column
                                 computer={ 3 }
                                 mobile={ 16 }
                                 style={ { padding: 8 } }
                              >
                                 { this.bannerSettings() }
                              </Grid.Column>
                           </Grid.Row>
                        </Grid>
                     </Grid.Column>
                  </Grid.Row>
               </Grid.Column>
            </Grid.Row>
         </Grid>
      )
   }
}

const mapStateToProps = ( state ) => {
   return {
      user: state.auth.user,
   }
}

const mapDispatchToProps = ( dispatch ) => {
   return {
      // for samaj actions
      joinSamaj: ( samajId, user ) => dispatch( joinSamaj( samajId, user ) ),
      leaveSamaj: ( samajId, slug ) => dispatch( leaveSamaj( samajId, slug ) ),

      // for profile actions
      blockUser: ( uid ) => dispatch( blockUser( uid ) ),
   }
}
export default connect( mapStateToProps, mapDispatchToProps )( SamajBanner )
