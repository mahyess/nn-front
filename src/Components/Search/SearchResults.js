import React, { Component } from "react"
import { Menu, Icon } from "semantic-ui-react"

class Search
   extends Component {
   constructor( props ) {
      super( props )
      this.state = { activeItem: "Posts" }
   }

   handlePostsClick = () => {
      if ( this.state.activeItem === "Posts" ) {
         // this.props.getPosts("Posts");
      } else if ( this.state.activeItem === "People" ) {
         // this.props.getUser("People");
      } else if ( this.state.activeItem === "Samaj" ) {
         // this.props.getSamaj();
      }
   }

   handlePostsTabChange = ( e ) => {
      this.setState( { activeItem: e.target.id }, () => {
         this.handlePostsClick()
      } )
   }

   render() {
      const { activeItem } = this.state
      return (
         <React.Fragment>
            <Menu
               pointing
               secondary
               style={ { border: 0, background: "white" } }
               widths={ 3 }
               color="red"
            >
               <Menu.Item
                  id="Posts"
                  name="Posts"
                  active={ activeItem === "Posts" }
                  onClick={ ( e ) => this.handlePostsTabChange( e ) }
                  widths={ 16 }
               >
                  <Icon name="fire"/>
                  Posts
               </Menu.Item>
               <Menu.Item
                  id="People"
                  name="People"
                  active={ activeItem === "People" }
                  onClick={ ( e ) => this.handlePostsTabChange( e ) }
               >
                  <Icon name="angle double up"/>
                  People
               </Menu.Item>

               <Menu.Item
                  id="Samaj"
                  name="Samaj"
                  active={ activeItem === "Samaj" }
                  onClick={ ( e ) => this.handlePostsTabChange( e ) }
               >
                  <Icon name="group"/>
                  Samaj
               </Menu.Item>
            </Menu>
         </React.Fragment>
      )
   }
}

export default Search
