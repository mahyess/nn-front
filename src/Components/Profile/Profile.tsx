import moment from "moment"
import * as PropTypes from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"

import {
   Button,
   Card,
   Container,
   Divider,
   Dropdown,
   Form,
   Grid,
   Header,
   Icon,
   Image,
   Input,
   List,
   Menu,
   Modal,
   Popup,
   Responsive,
   Segment,
   TextArea,
} from "semantic-ui-react"
import { addPost } from "../../actions/postActions"

import { fetchUserDetails, getUserPosts } from "../../actions/profileActions"
import { getSathiLists } from "../../actions/sathiActions"

import FriendPostForbiddenImage from "../../img/static/img/friend_post_forbidden.png"
import ImageUploadComponent from "../Common/ImageUploadComponent"
import PlaceHolder from "../PlaceHolder/PlaceHolder"
import PostFeed from "../Posts/PostFeed"
import Photos from "../Profile/Photos"
import EditProfile from "./EditProfile"
import NoPostMessage from "./NoPostMessage"
import ProfileBanner from "./profilelayout/ProfileBanner"

class Profile
   extends Component {
   constructor() {
      super()
      this.state = {
         modalOpen: false,
         // modal2Open: false,
         currentTab: "personalPosts",
         editModal: false,
         currentUser: {},
         isUser: false,

         form: {
            attachmnets: [],
            body: "",
            tags: [],
            errors: null,
         },
         sathiLists: [],
         screenWidth: 0,
      }
   }

   componentDidMount() {
      this.props.getSathiLists()

      this.props.fetchUserDetails( this.props.match.params.username )
      if (
         this.props.user &&
         this.props.user.username === this.props.match.params.username
      ) {
         this.setState( { isUser: true } )
         this.fetchPostsByTab()
      } else {
         this.setState( { isUser: false } )
      }
   }

   componentDidUpdate( prevProps ) {
      if ( prevProps.user !== this.props.user ) {
         this.fetchPostsByTab()
         this.props.fetchUserDetails( this.props.match.params.username )
         if (
            this.props.user &&
            this.props.user.username === this.props.match.params.username
         ) {
            this.fetchPostsByTab()
            this.setState( { isUser: true } )
         } else {
            this.setState( { isUser: false } )
         }
      }
      if ( prevProps.match.params.username !== this.props.match.params.username ) {
         this.componentDidMount()
      }

      if (
         prevProps.sathiLists !== this.props.sathiLists &&
         this.props.sathiLists.results.length > 0
      ) {
         this.setState( {
            sathiLists: this.props.sathiLists.results.map( ( sathi ) => ( {
               key: sathi.id,
               text: sathi.first_name + " " + sathi.last_name,
               value: sathi.id,
               image: { avatar: true, src: sathi.profile.avatar },
            } ) ),
         } )
      }
   }

   handleOnUpdateScreen = ( e, { width } ) =>
      this.setState( { screenWidth: width } )

   uploadImageToState = ( fileObj ) => {
      this.setState( {
         ...this.state,
         form: {
            ...this.state.form,
            attachments: fileObj,
         },
      } )
   }

   handleSubmit = () => {
      const { form } = this.state

      let formData = new FormData()
      if ( form.attachments ) {
         for ( const attachments of form.attachments ) {
            formData.append( "attachments", attachments, attachments.name )
         }
      }

      if ( form.tags ) {
         formData.append( "tags", form.tags )
      }

      if ( !form.body.length ) {
         this.setState( {
            form: {
               ...this.state.form,
               errors: {
                  body: {
                     content: "Description cannot be empty",
                     pointing: "below",
                  },
               },
            },
         } )
      } else {
         this.setState( {
            form: {
               ...this.state.form,
               errors: null,
            },
         }, () => {
            formData.append( "body", form.body )

            this.props.addPost( formData )

            this.setState( {
               form: {
                  body: "",
                  attachments: [],
                  tags: [],
                  errors: null,
               },
            } )
            this.handleClose()
         } )
      }

   }
   handleChange = ( e ) => {
      this.setState( {
         form: {
            ...this.state.form,
            [e.target.name]: e.target.value,
            errors: {
               [e.target.name]: null,
            },
         },
      } )
   }
   handleTagUserChange = ( e, { value } ) => {
      this.setState( {
         form: {
            ...this.state.form,
            tags: value,
         },
      } )
   }

   changeEditModal = () => {
      this.setState( { editModal: !this.state.editModal } )
   }

   handleInputFocus = () => {
      this.props.getSathiLists()

      this.setState( { modalOpen: true } )
   }

   handleClose = () => {
      this.setState( { modalOpen: false } )
   }
   //
   // handleModel2Open = () => {
   //   this.setState({ modal2Open: true });
   // };

   fetchPostsByTab = () => {
      if ( this.state.currentTab === "samajPosts" ) {
         this.props.getUserPosts( this.props.match.params.username, "samaj" )
      } else if ( this.state.currentTab === "personalPosts" ) {
         this.props.getUserPosts( this.props.match.params.username, "profile" )
      } else if ( this.state.currentTab === "taggedPosts" ) {

         this.props.getUserPosts( this.props.match.params.username, "tagged" )
      }
   }


   handlePostsTabChange = ( e ) => {
      this.setState( { currentTab: e.target.id }, () => {
         this.fetchPostsByTab()
      } )
   }

   renderPostBody( profileUser ) {

      const { screenWidth } = this.state

      const marginLeftPostContainer =
         screenWidth >= Responsive.onlyComputer.minWidth ? 32 : 0

      return (
         <Responsive fireOnMount onUpdate={ this.handleOnUpdate }>
            <Grid>
               <Grid.Row>
                  {/* //Post status starts here */ }
                  <Grid.Column
                     computer={ 9 }
                     mobile={ 16 }
                     style={ {
                        padding: 0,
                        marginLeft: { marginLeftPostContainer },
                     } }
                  >
                     <Grid.Row>
                        <Grid.Column

                           style={ {
                              padding: "8px 7px 0px 6px",
                              // background: "#f7f7f7",
                           } }
                        >
                           <Card
                              fluid
                              style={ {
                                 boxShadow: "none",
                                 border: "none",
                                 borderRadius: 0,
                              } }
                           >
                              <Card.Content>
                                 <Input style={ { width: "100%" } }>
                                    <Image
                                       src={
                                          profileUser &&
                                          profileUser.profile &&
                                          profileUser.profile.avatar
                                       }
                                       avatar
                                       style={ {
                                          height: 36,
                                          width: 36,
                                          padding: 4,
                                          background: "white",
                                          border: "2px solid ",
                                          borderColor:
                                             profileUser &&
                                             profileUser.points &&
                                             profileUser.points &&
                                             profileUser.points.color_code,
                                       } }
                                    />

                                    <Input
                                       placeholder="whats new... post here..."
                                       onClick={ this.handleInputFocus }
                                       style={ { width: "100%", height: 36 } }
                                    >
                                       <input style={ { borderRadius: "2px" } }/>
                                    </Input>
                                 </Input>
                              </Card.Content>
                           </Card>

                           <Modal
                              open={ this.state.modalOpen }
                              closeIcon
                              onClose={ this.handleClose }
                              size="tiny"
                           >
                              <Modal.Header>Whats on your mind?</Modal.Header>
                              <Modal.Content>
                                 <Form>
                                    <ImageUploadComponent
                                       uploadImageToState={ this.uploadImageToState }
                                    />

                                    <Form.Field
                                       control={ TextArea }
                                       placeholder="Whats on your mind..."
                                       style={ {
                                          minHeight: 100,
                                          width: "100%",
                                          border: "1px solid lightgrey",
                                          marginTop: 10,
                                          padding: 10,
                                       } }
                                       name="body"
                                       error={
                                          this.state.form && this.state.form.errors &&
                                          this.state.form.errors.body
                                       }
                                       value={ this.state.form.body }
                                       onChange={ ( e ) => this.handleChange( e ) }
                                    />
                                    { this.state.sathiLists.length > 0 && (
                                       <Dropdown
                                          placeholder="Select Friend"
                                          fluid
                                          multiple
                                          search
                                          selection
                                          text="Tag friends"
                                          options={ this.state.sathiLists }
                                          name="tags"
                                          value={ this.state.form.tags }
                                          onChange={ ( e, { value } ) =>
                                             this.handleTagUserChange( e, { value } )
                                          }
                                       />
                                    ) }

                                    <Button
                                       fluid
                                       color="blue"
                                       onClick={ () => this.handleSubmit() }
                                       style={ { marginTop: 10, padding: 10 } }
                                    >
                                       Add
                                    </Button>
                                 </Form>
                              </Modal.Content>
                           </Modal>
                        </Grid.Column>
                     </Grid.Row>

                     {/* status posting end here */ }

                     <Grid.Row
                        style={ {
                           border: 0,
                           padding: "2px 7px 4px 6px",
                        } }
                     >
                        <Grid.Column>
                           <Card
                              fluid
                              style={ {
                                 border: "none",
                                 boxShadow: "none",
                                 borderRadius: 0,
                              } }
                           >
                              <Card.Description>
                                 <Menu
                                    pointing
                                    secondary
                                    style={ { border: 0 } }
                                    widths={ 3 }
                                    color="red"
                                 >
                                    <Menu.Item
                                       id="personalPosts"
                                       name="Personal Post"
                                       active={ this.state.currentTab === "personalPosts" }
                                       onClick={ ( e ) => this.handlePostsTabChange( e ) }
                                    > Personal Post</Menu.Item>
                                    <Menu.Item
                                       id="samajPosts"
                                       name="Samaj Post"
                                       active={ this.state.currentTab === "samajPosts" }
                                       onClick={ ( e ) => this.handlePostsTabChange( e ) }
                                    >Samaj Post</Menu.Item>
                                    <Menu.Item
                                       id="taggedPosts"
                                       name="Tagged Post"
                                       active={ this.state.currentTab === "taggedPosts" }
                                       onClick={ ( e ) => this.handlePostsTabChange( e ) }
                                    > Tagged Post</Menu.Item>
                                 </Menu>
                              </Card.Description>
                           </Card>
                        </Grid.Column>
                     </Grid.Row>
                     {/*Post Feed starts here*/ }

                     <Grid.Row style={ { padding: "2px 7px 4px 6px" } }>
                        { ( this.props.user &&
                           this.props.user.username ===
                           this.props.match.params.username ) ||
                        ( this.props.profileUser && this.props.profileUser.is_friend ) ? (
                           this.props.isLoading ? (

                              <PlaceHolder/>


                           ) : this.props.posts.results.length ? (

                                 <PostFeed/>
                              ) :
                              ( <NoPostMessage
                                 user={ this.props.user && this.props.user.username }
                                 profileUser={ this.props.profileUser }
                                 CurrentTab={ this.state.currentTab }

                              /> )

                        ) : (
                           <div>
                              <Image
                                 src={ FriendPostForbiddenImage }
                                 style={ { margin: "auto", marginTop: 60 } }

                                 size="medium"
                              />
                              <span
                                 style={ {
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    marginLeft: "212px",
                                 } }
                              >
                                    You need to be friend to see the post
                                    </span>
                           </div>
                        ) }
                     </Grid.Row>

                     {/*Post Feed Ends here*/ }
                  </Grid.Column>
                  {/* badges starts from here */ }
                  <Grid.Column only={ "computer" }
                               computer={ 6 }


                               style={ {
                                  padding: "8px 7px 0px 6px",
                                  // background: "#f7f7f7",
                               } }
                  >
                     <Segment>
                        <Grid>
                           <Grid.Row columns={ 2 }>
                              <Grid.Column computer={ 16 } tablet={ 16 }>
                                 <Header dividing style={ {} }>
                                    About { profileUser.first_name } { profileUser.last_name }
                                    { this.props.user &&
                                    profileUser.username === this.props.user.username && (
                                       <h6 style={ { margin: "0px", float: "right" } }>
                                          <Popup
                                             content="Edit your Bio"
                                             position="top center"
                                             trigger={
                                                <Button
                                                   color="facebook"
                                                   circular
                                                   icon="edit"
                                                   style={ {
                                                      padding: "0px",
                                                      marginInlineStart: "auto",
                                                      height: "24px",
                                                      width: "24px",
                                                   } }
                                                   onClick={ () =>
                                                      this.setState( { editModal: true } )
                                                   }
                                                />
                                             }
                                          />
                                       </h6>
                                    ) }
                                 </Header>
                                 <blockquote>
                                    <p>
                                       <q>
                                          { profileUser &&
                                          profileUser.profile &&
                                          profileUser.profile.bio }
                                       </q>
                                    </p>
                                    <footer>@{ profileUser.username } </footer>
                                 </blockquote>
                              </Grid.Column>
                           </Grid.Row>
                           <Divider className="no-style-label"/>
                           <Grid.Row columns="equal" padded style={ { margin: "0px" } }>
                              <Grid.Column style={ { width: "fit-content" } }>
                                 <List>
                                    <List.Item
                                       style={ { padding: "8px 0px 0px" } }
                                       icon={ <Icon name="birthday cake" color="red"/> }
                                       content={
                                          <span>
                              BirthDate
                              <span style={ { color: "#4183c4", marginLeft: 5 } }>
                                { moment(
                                   profileUser &&
                                   profileUser.profile &&
                                   profileUser.profile.birthdate,
                                )
                                .format( "MMMM DD" ) }
                              </span>
                            </span>
                                       }
                                    />
                                    <List.Item
                                       style={ { padding: "8px 0px 0px" } }
                                       icon={
                                          <Icon
                                             name={
                                                profileUser &&
                                                profileUser.gender &&
                                                profileUser.gender.title === "male"
                                                   ? "man"
                                                   : "woman"
                                             }
                                             color="red"
                                          />
                                       }
                                       content={
                                          <span>
                              Gender
                              <span style={ { color: "#4183c4" } }>
                                {
                                   profileUser?.gender?.title
                                              .charAt( 0 )
                                              .toUpperCase() +
                                   profileUser?.gender?.title.slice( 1 ) }
                              </span>
                            </span>
                                       }
                                    />
                                    <List.Item
                                       style={ { padding: "8px 0px 0px" } }
                                       icon={ <Icon name="home" color="red"/> }
                                       content={
                                          <span>
                              From
                              <span
                                 style={ {
                                    color: "#4183c4",
                                    textTransform: "capitalize",
                                 } }
                              >
                                { " " }
                                 { profileUser &&
                                 profileUser.profile &&
                                 profileUser.profile.city }
                              </span>
                            </span>
                                       }
                                    />
                                 </List>
                              </Grid.Column>
                           </Grid.Row>
                        </Grid>
                     </Segment>
                     <Segment>
                        <Header dividing>Badges </Header>
                        <Grid>
                           { this.props.user &&
                           this.props.user.profile &&
                           this.props.user.profile.badges &&
                           this.props.user.profile.badges.map( ( badge, i ) => (
                              <Grid.Column width={ 4 } style={ { padding: 0 } } key={ i } only={ "computer" }>
                                 <Card style={ { padding: 0 } }>
                                    <Card.Content>
                                       <Image
                                          src={ badge.icon }
                                          style={ { height: 80, width: "100%" } }
                                       />
                                    </Card.Content>
                                 </Card>
                              </Grid.Column>
                           ) ) }
                        </Grid>
                     </Segment>

                     <Segment>
                        <Photos username={ this.props.match.params.username }/>
                     </Segment>
                  </Grid.Column>
               </Grid.Row>
            </Grid>
         </Responsive>
      )
   }

   render() {
      const { profileUser } = this.props
      return (
         <React.Fragment>


            <div style={ { padding: 0, background: "#f5f5f5" } }>
               <Grid.Row>
                  <Grid.Column width={ 16 }>
                     <ProfileBanner
                        profileUser={ this.props.user && profileUser }
                        isUser={ this.state.isUser ? "user" : "friend" }
                     />
                  </Grid.Column>
               </Grid.Row>
               {/* profile menu starts from here */ }
               <Responsive as={ Container } minWidth={ 768 }>
                  { this.renderPostBody( profileUser ) }
               </Responsive>
               <Responsive maxWidth={ 768 }>
                  <div>{ this.renderPostBody( profileUser ) }</div>
               </Responsive>
            </div>
            <Modal
               open={ this.state.editModal }
               size="small"
               closeIcon
               onClose={ () => this.setState( { editModal: false } ) }
            >
               <Modal.Content>
                  <EditProfile
                     changeEditModal={ this.changeEditModal }
                     username={ this.props.match.params.username }
                  />
               </Modal.Content>
            </Modal>
         </React.Fragment>
      )
   }
}

Profile.propTypes = {
   profileUser: PropTypes.shape( {
      gender: PropTypes.shape( {
         title: PropTypes.string.isRequired,
      } ),
   } ).isRequired,
}

export const mapStateToProps = ( state ) => {
   return {
      profileUser: state.sathi.sathi,
      user: state.auth.user,
      posts: state.posts.posts,
      sathiLists: state.sathi.sathiLists,
      isLoading: state.posts.isLoading,
   }
}

const mapDispatchToProps = ( dispatch ) => {
   return {
      getUserPosts: ( uid, source ) => dispatch( getUserPosts( uid, source ) ),
      fetchUserDetails: ( username ) => dispatch( fetchUserDetails( username ) ),
      getSathiLists: () => dispatch( getSathiLists() ),
      addPost: ( formData ) => dispatch( addPost( formData ) ),
   }
}
export default connect( mapStateToProps, mapDispatchToProps )( Profile )
