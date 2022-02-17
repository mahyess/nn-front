import moment from "moment"
import * as PropTypes from "prop-types"
import React, { Component } from "react"
import { Card, Divider, Grid, Icon, Popup } from "semantic-ui-react"
import "../../../../static/slider1.css"
import { load } from "../sliderjs"
import PostImageViewer from "./PostImageViewer"


class PostBody
   extends Component {
   constructor( props ) {
      super( props )
      this.state = {
         active: false,

         cindex: 0,
      }
   }

   componentDidMount() {
      if ( this.props.post.attachments.length > 1 ) {
         this.setState( { postattachments: this.props.post.attachments }, () => {
            load( this.props.index, this.state.cindex )
         } )
      }
   }

   getWrapperStyle = () => {
      return this.state.active ? { height: "fit-content" } : { display: "none" }
   }

   toggle = () => this.setState( ( prevState, _ ) => ( { active: !prevState.active } ) )

   button = () => {
      return (
         <span onClick={ () => this.toggle() } style={ { color: "blue", cursor: "pointer" } }>
        { this.state.active === false ? " see more" : "see less" }
      </span>
      )
   }

   render() {
      const { post: { attachments, body: initialBody } } = this.props

      let body
      if ( !this.state.active ) {
         body = initialBody.substring( 0, 150 )
      } else {
         body = initialBody
      }

      return (
         <React.Fragment>
            <p
               style={ {
                  fontSize: 12,
                  color: "#a8a8a8",
                  marginTop: "-10px",
               } }
            >
               Posted { moment( this.props.post.timestamp )
            .fromNow() }
            </p>
            <Card.Header style={ { fontSize: 16 } }>
               { this.props.post.title }
            </Card.Header>

            <Card.Description
               style={ {
                  color: "black",
                  fontSize: 14,
                  paddingBottom: 8,
                  textAlign: "justify",
               } }
            >
               { body.split( /(\s+)/ )
                     .map( ( word, index ) =>
                        word.includes( "#" ) ? (
                           <a href={ "/hashtag/" + word.replace( "#", "" ) }>{ word }</a>
                        ) : word )
               }
               { initialBody.length > 150 && this.button() }

            </Card.Description>

            { this.props.post.attachments.length === 0 ? (
               ""
            ) : this.props.post.attachments.length === 1 ? (
               <PostImageViewer image={ this.props.post.attachments[0] }/>
            ) : this.props.post.attachments.length > 1 ? (
               <Grid>
                  <Grid.Row>
                     <Grid.Column>
                        <div className="postSlider">
                           <div
                              className="postSlider-items"
                              id={ "pi" + this.props.index }
                           >
                              { this.props.post.attachments.map( ( attachment, index ) => (
                                 <div key={ index } className="item">
                                    <img alt="" src={ attachment }/>
                                    <div className="caption">
                                       { index + 1 } / { this.props.post.attachments.length }
                                    </div>
                                 </div>
                              ) ) }
                           </div>

                           <div
                              className={ "left-slide" }
                              id={ "left-slide" + this.props.index }
                              onClick={ () => {
                                 // next("prev");
                                 //imgIndex === 0 ? prevSlide.setAttribute('style', 'display: none') : null
                                 this.setState( { cindex: this.state.cindex - 1 } )
                                 load( this.props.index, this.state.cindex - 1 )
                              } }
                              style={ {
                                 display: `${ this.state.cindex <= 0 ? "none" : "block" }`,
                              } }
                           >
                              { <Icon name="caret left" style={ { marginLeft: 7 } }/> }
                           </div>
                           <div
                              className={ "right-slide" }
                              id={ "right-slide" + this.props.index }
                              onClick={ () => {
                                 // let index = next("next");
                                 // if (index === this.props.post.attachments.length - 1) {
                                 //   nextSlide.setAttribute("style", "display:none");
                                 //   return;
                                 // }
                                 this.setState( { cindex: this.state.cindex + 1 } )
                                 load( this.props.index, this.state.cindex + 1 )
                              } }
                              style={ {
                                 display: `${
                                    this.state.cindex >=
                                    this.props.post.attachments.length - 1
                                       ? "none"
                                       : "block"
                                 }`,
                              } }
                           >
                              { <Icon name="caret right" style={ { marginRight: 7 } }/> }
                           </div>
                        </div>
                     </Grid.Column>
                  </Grid.Row>
               </Grid>
            ) : (
               ""
            ) }

            <Card.Description style={ { padding: 8 } }>
               <Popup
                  on="click"
                  trigger={
                     <a
                        style={ {
                           fontSize: 14,
                           color: "grey",
                           marginRight: 15,
                        } }
                     >
                        { this.props.likesCount } Namaste
                     </a>
                  }
                  content={
                     this.props.post.likes.length !== 0 ? (
                        this.props.post.likes.map( ( post ) => <p key={ post }>{ post }</p> )
                     ) : (
                        <p>No Namastes</p>
                     )
                  }
               />
               <a
                  style={ { fontSize: 14, color: "grey" } }
                  onClick={ () =>
                     this.props.handleShowCommentsClick( this.props.post.pid )
                  }
               >
                  { this.props.post.total_comments } Chalfal
               </a>
               { this.props.tags && (
                  <Grid.Column textAlign="right" width={ 4 }>
                     <Popup
                        content={
                           this.props.post.tags.length !== 0
                              ? this.props.post.tags.map( ( post ) => <p>{ post }</p> )
                              : "No Tags"
                        }
                        on="click"
                        pinned
                        trigger={
                           <a>
                              <Icon className="tags"/>
                           </a>
                        }
                     />
                  </Grid.Column>
               ) }
            </Card.Description>
            <Card.Description>
               <Divider style={ { padding: 0, margin: "0px" } }/>
            </Card.Description>
         </React.Fragment>
      )
   }
}

PostBody.propTypes = {
   post: PropTypes.shape( {
      body: PropTypes.string.isRequired,
   } ),
}

export default PostBody
