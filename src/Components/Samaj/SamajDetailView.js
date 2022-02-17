import React, { Component } from "react"
import {
   Grid,
   Image,
   Input,
   Modal,
   TextArea,
   Button,
   Form,
   Card,
   Menu,
   Popup,
   List,
   Segment,
   Header,

} from "semantic-ui-react"
import { connect } from "react-redux"
import { Slide, toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import {
   getSamajDetails,
   getSamajPosts,
   getPinnedPost,
} from "src/actions/samajActions"
import ImageUploadComponent from "../Common/ImageUploadComponent"

import Post from "../Posts/Post/Post"
import PostFeed from "../Posts/PostFeed"

import { addPost } from "../../actions/postActions"
import SamajProfileEdit from "./SamajProfileEdit"
import SamajBanner from "./SamajLayout/SamajBanner"
import { Link } from "react-router-dom"
import PlaceholderExampleParagraph from "../PlaceHolder/PlaceHolder"


const toastList = new Set()
const MAX_TOAST = 3


class ViewSamaj
   extends Component {
   constructor( props ) {
      super( props )

      this.state = {
         modalOpen: false,
         form: {
            attachmnets: [],
            body: "",
            title: "",
            errors: null,
         },

      }
   }

   clearWaitingQueue = () => {
      // Easy, right 😎
      toast.clearWaitingQueue()
   }

   notify = () => {
      const id = toast( " 😲 Subscribe Samaj to post", {
         type: "error",
         //  using the onClose hook here to remove the id
         // from the set
         onClose: () => toastList.delete( id ),
      } )
      toastList.add( id )

      if ( toastList.size > MAX_TOAST ) {
         let toDelete = Array.from( toastList )[0]
         // alert(toDelete);
         toast.dismiss( toDelete )

         toastList.delete( toDelete )
      }
   }

   componentDidMount() {
      const slug = this.props.match.params.slug
      const id = this.props.match.params.id

      this.props.getSamajDetails( id, slug )
      this.props.getSamajPosts( id, slug )
      this.props.getPinnedPost( id )
   }

   uploadImageToState = ( fileObj ) => {
      this.setState( {
         form: {
            ...this.state.form,
            attachments: fileObj,
         },
      } )
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

   handleSubmit = () => {
      const { form } = this.state

      let formData = new FormData()

      formData.append( "community_id", this.props.match.params.id )


      if ( form.attachments ) {
         for ( const attachments of form.attachments ) {
            formData.append( "attachments", attachments, attachments.name )
         }
      }

      if ( form.body ) {
         formData.append( "body", form.body )
      }

      if ( !form.title.length ) {
         this.setState( {
            form: {
               ...this.state.form,
               errors: {
                  title: {
                     content: "Title cannot be empty",
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
            formData.append( "title", form.title )

            this.props.addPost( formData )

            this.setState( {
               form: {
                  body: "",
                  attachments: [],
                  title: "",
                  errors: null,
               },
            } )
            this.handleClose()
         } )
      }
   }

   changeEditModal = () => {
      this.setState( { editModal: !this.state.editModal } )
   }

   handleInputFocus = () => {
      let isSubscribed = false
      this.props.samajDetail &&
      this.props.user &&
      this.props.samajDetail.details &&
      this.props.samajDetail.details.subscribers &&
      this.props.samajDetail.details.subscribers.map( ( subscriber ) => {
         if ( subscriber.username === this.props.user.username ) {
            isSubscribed = true
         }
      } )
      if ( isSubscribed ) {
         return this.setState( { modalOpen: true } )
      } else {
         return this.notify()
      }
   }

   handleClose = () => {
      this.setState( { modalOpen: false, modal2Open: false } )
   }


   handleSamajSubscribe = ( samajId ) => {
      this.props.joinSamaj( samajId, this.props.user )
   }

   render() {
      const { samajDetail } = this.props
      let isSubscribed =
         samajDetail &&
         this.props.user &&
         samajDetail.details &&
         samajDetail.details.subscribers.length > 0
            ? samajDetail.details.subscribers.filter(
            ( subscriber ) => subscriber.uid === this.props.user.uid,
         ).length > 0
            : false

      return (

         <React.Fragment>
            <div className="grid-padding">
               <Grid>
                  <Grid.Row>
                     <Grid.Column>
                        <SamajBanner
                           samajDetail={
                              samajDetail && samajDetail.details
                           }
                           isSubscribed={ isSubscribed }
                        />
                     </Grid.Column>
                  </Grid.Row>
                  <Grid.Row style={ { background: "#f5f5f5" } }>

                     <Grid>
                        <Grid.Row>
                           <Grid.Column computer={ 10 } mobile={ 16 }>
                              <Grid.Row>
                                 <Grid.Column>
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
                                                   samajDetail &&
                                                   samajDetail.details &&
                                                   samajDetail.details.icon
                                                }
                                                avatar
                                                style={ {
                                                   height: 36,
                                                   width: 36,
                                                   padding: 4,
                                                   background: "white",
                                                } }
                                             />

                                             <Input
                                                placeholder="whats new... post here..."
                                                onClick={ this.handleInputFocus }
                                                style={ { width: "100%", height: 36 } }
                                             >
                                                <ToastContainer
                                                   limit={ 3 }
                                                   position="bottom-left"
                                                   autoClose={ 5000 }
                                                   hideProgressBar={ true }
                                                   newestOnTop
                                                   closeOnClick
                                                   pauseOnFocusLoss={ true }
                                                   draggable
                                                   pauseOnHover={ true }
                                                   transition={ Slide }
                                                />
                                                <input style={ { borderRadius: "2px" } }/>
                                             </Input>
                                          </Input>
                                       </Card.Content>
                                    </Card>
                                 </Grid.Column>
                              </Grid.Row>
                              <Grid.Row>
                                 <Grid.Column
                                    style={ {
                                       paddingTop: 2,
                                    } }
                                 >
                                    <Card
                                       fluid
                                       style={ {
                                          border: "none",
                                          boxShadow: "none",
                                          borderRadius: 0,

                                          margin: "5px 0 5px 0",

                                       } }
                                    >
                                       <Card.Description>
                                          <Menu
                                             pointing
                                             secondary
                                             style={ { border: 0, marginTop: 8 } }
                                             widths={ 3 }

                                          >
                                             <Menu.Item

                                                id="hot"
                                                name="Hot Post"
                                                active={ this.state.currentTab === "hotPosts" }
                                                // onClick={(e) => this.handlePostsTabChange(e)}
                                             ></Menu.Item>
                                             <Menu.Item
                                                id="new"
                                                name="New Post"
                                                active={ this.state.currentTab === "newPosts" }
                                                // onClick={(e) => this.handlePostsTabChange(e)}
                                             ></Menu.Item>
                                          </Menu>
                                       </Card.Description>
                                    </Card>
                                 </Grid.Column>
                              </Grid.Row>
                              <Grid.Row>
                                 <Grid.Column>
                                    {/*{this.props.isLoading ? (*/ }
                                    {/*  <PlaceholderExampleParagraph />*/ }
                                    {/*) : (*/ }
                                    <div>
                                       { this.props.pinnedPost &&
                                       this.props.pinnedPost.pid !== null ? (
                                          <PostFeed pinnedPost={ this.props.pinnedPost }/>
                                       ) : (
                                          <PostFeed/>
                                       ) }
                                    </div>
                                    {/*)}*/ }
                                 </Grid.Column>
                              </Grid.Row>
                           </Grid.Column>

                           <Grid.Column computer={ 6 } mobile={ 16 }>
                              <Grid.Row>
                                 <Grid.Column>
                                    <Segment>
                                       <Header dividing as="h3" style={ {} }>
                                          Samaj Admin
                                          <div style={ { margin: "0px", float: "right" } }>
                                             { this.props.samajDetail &&
                                             samajDetail.details &&
                                             samajDetail.details.admin &&
                                             this.props.user &&
                                             samajDetail.details.admin.map(
                                                ( samajAdmin, i ) =>
                                                   samajAdmin.uid === this.props.user.uid ? (
                                                      <Popup
                                                         // key={i}
                                                         content="Edit Samaj Details"
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
                                                                  this.setState( {
                                                                     editModal: true,
                                                                  } )
                                                               }
                                                            />
                                                         }
                                                      />
                                                   ) : null,
                                             ) }
                                          </div>
                                       </Header>

                                       <Grid>
                                          <Grid.Row>
                                             <Grid.Column>
                                                <List>
                                                   { this.props.samajDetail &&
                                                   samajDetail.details &&
                                                   samajDetail.details.admin.map(
                                                      ( item, i ) => (
                                                         <List.Item key={ i }>
                                                            <Image
                                                               avatar
                                                               src={ item.profile.avatar }
                                                            />
                                                            <List.Content>
                                                               <List.Header>
                                                                  { item.username }
                                                               </List.Header>
                                                            </List.Content>
                                                         </List.Item>
                                                      ),
                                                   ) }
                                                </List>
                                             </Grid.Column>
                                          </Grid.Row>
                                       </Grid>
                                    </Segment>
                                    { this.props.samajDetail &&
                                    samajDetail.details &&
                                    samajDetail.details.admin ==
                                    this.props.user &&
                                    <Segment style={ { height: 320, overflow: "scroll" } }>
                                       <Header dividing as="h3" style={ {} }>
                                          <List>
                                             <List.Item>
                                                <List.Icon name="pin"/>
                                                <List.Content>Pinned Post</List.Content>
                                             </List.Item>
                                          </List>
                                       </Header>
                                       <Grid>
                                          <Grid.Row>
                                             <Grid.Column>
                                                { this.props.pinnedPost &&
                                                this.props.pinnedPost.pinned && (
                                                   <div>
                                                      <Post post={ this.props.pinnedPost }/>
                                                   </div>
                                                ) }
                                             </Grid.Column>
                                          </Grid.Row>
                                       </Grid>
                                    </Segment>
                                    }
                                    { this.props.samajDetail &&
                                    samajDetail.details &&
                                    samajDetail.details.admin ==
                                    this.props.user &&
                                    <Segment>
                                       <Header dividing as="h3" style={ {} }>
                                          Active Users
                                       </Header>
                                       <Grid>
                                          <Grid.Row>
                                             <Grid.Column>
                                                <List>
                                                   { this.props.samajDetail &&
                                                   samajDetail.active_users.map(
                                                      ( item, i ) => (
                                                         <List.Item
                                                            key={ i }
                                                            style={ { paddingBottom: 8 } }
                                                            as={ Link }
                                                            to={
                                                               "/profile/" + item.user__username
                                                            }
                                                         >
                                                            <Image
                                                               avatar
                                                               src={ item.user__profile__avatar }
                                                               style={ { objectFit: "cover" } }
                                                            />
                                                            <List.Content>
                                                               <List.Header>
                                                                  { item.user__username }
                                                               </List.Header>
                                                               { item.id__count } posts,{ " " }
                                                               { item.likes_count } namastes
                                                            </List.Content>
                                                         </List.Item>
                                                      ),
                                                   ) }
                                                </List>

                                             </Grid.Column>
                                          </Grid.Row>
                                       </Grid>
                                    </Segment>
                                    }
                                 </Grid.Column>

                              </Grid.Row>
                           </Grid.Column>
                        </Grid.Row>
                     </Grid>

                  </Grid.Row>
               </Grid>
            </div>

            <Modal
               open={ this.state.modalOpen }
               closeIcon
               onClose={ this.handleClose }
               size="tiny"
            >
               <Modal.Header>
                  <Image
                     src={
                        this.props.user &&
                        this.props.user.profile &&
                        this.props.user.profile.avatar
                     }
                     avatar
                     style={ {
                        height: 36,
                        width: 36,
                        padding: 4,
                        background: "white",
                     } }
                  />
                  Whats on your mind?
               </Modal.Header>
               <Modal.Content>
                  <Form onSubmit={ () => this.handleSubmit() }>
                     <ImageUploadComponent
                        uploadImageToState={ this.uploadImageToState }
                     />
                     <Form.Field
                        control={ Input }
                        placeholder="Title..."
                        fluid
                        name="title"
                        error={

                           this.state.form && this.state.form.errors &&
                           this.state.form.errors.title
                        }
                        value={ this.state.form.title }

                        onChange={ ( e ) => this.handleChange( e ) }
                        style={ { paddingTop: 5 } }
                     />
                     <Form.Field
                        control={ TextArea }
                        placeholder="Tell us more..."
                        style={ {
                           minHeight: 100,
                           width: "100%",
                           border: "1px solid lightgrey",

                           padding: 10,
                        } }
                        name="body"

                        value={ this.state.form.body }
                        onChange={ ( e ) => this.handleChange( e ) }
                     />
                     <Button fluid color="blue" style={ { marginTop: 5 } }>
                        Add
                     </Button>
                     { }
                  </Form>
               </Modal.Content>
            </Modal>

            <Modal
               open={ this.state.editModal }
               size="small"
               closeIcon
               onClose={ () => this.setState( { editModal: false } ) }
            >
               <Modal.Content>
                  <SamajProfileEdit
                     changeEditModal={ this.changeEditModal }
                     editModal={ this.state.editModal }
                     samaj={ this.props.samajDetail }
                     samajid={ this.props.match.params.id }
                  />
               </Modal.Content>
            </Modal>
         </React.Fragment>
      )
   }
}

const mapStateToProps = ( state ) => {
   return {
      samajDetail: state.samaj.samajDetail,
      isLoading: state.samaj.isLoading,
      samajPosts: state.posts.posts,
      pinnedPost: state.samaj.pinnedPost,
      user: state.auth.user,
   }
}

const mapDispatchToProps = ( dispatch ) => {
   return {
      getSamajDetails: ( id, slug ) => dispatch( getSamajDetails( id, slug ) ),
      getSamajPosts: ( id, slug ) => dispatch( getSamajPosts( id, slug ) ),
      getPinnedPost: ( id ) => dispatch( getPinnedPost( id ) ),
      addPost: ( formData ) => dispatch( addPost( formData ) ),
   }
}

export default connect( mapStateToProps, mapDispatchToProps )( ViewSamaj )
