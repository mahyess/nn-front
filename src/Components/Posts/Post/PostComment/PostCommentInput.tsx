import React, { Component } from "react"
import { Grid, Button } from "semantic-ui-react"

class PostCommentInput
   extends Component {
   constructor( props ) {
      super( props )
      this.commentValue = React.createRef()
   }

   state = {
      commentText: "",
   }

   componentDidUpdate( prevProps ) {
      if ( this.props.state !== prevProps.state ) {
         this.commentValue.current.innerHTML = ""
         this.commentValue.current.innerText = ""
      }
   }

   handleCommentChange = ( e ) => {
      this.setState( {
         commentText: e.target.textContent,
      } )
   }

   handleAddComment = ( argumentArray ) => {
      console.log( this.props.parentId )
      this.props.handleAddComment( ...argumentArray, this.props.parentId && this.props.parentId )
   }

   render() {
      const { postId, placeHolderText } = this.props
      return (
         <Grid>
            <Grid.Row columns={ 2 }>
               <Grid.Column
                  computer={ 12 }
                  mobile={ 16 }
                  style={ { padding: 0, paddingRight: 8 } }
               >
                  <div
                     ref={ this.commentValue }
                     style={ {
                        display: "inline-block",
                        border: "solid 1px #e8e8e8",
                        minHeight: "32px",
                        maxHeight: "72px",
                        width: "100%",
                        borderRadius: "100px",
                        outline: "none",
                        padding: "8px 20px",
                        background: "#f7f7f7",
                        overflowY: "scroll",
                     } }
                     contentEditable="true"
                     data-placeholder={ placeHolderText }
                     // value={this.state.commentText}
                     onInput={ this.handleCommentChange }
                  />
               </Grid.Column>
               <Grid.Column computer={ 4 } mobile={ 16 } style={ { padding: 0 } }>
                  <Button
                     content="Add"
                     // labelPosition="left"
                     // icon="plus"
                     fluid
                     primary
                     style={ { width: 120, height: 36, borderRadius: 20 } }
                     onClick={ () => this.handleAddComment( [ postId, this.state.commentText ] ) }
                  />
               </Grid.Column>
            </Grid.Row>
         </Grid>
      )
   }
}

export default PostCommentInput
