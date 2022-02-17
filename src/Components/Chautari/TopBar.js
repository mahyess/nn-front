import React, { Component } from "react"
import { Card, Divider, Grid, Icon, Menu } from "semantic-ui-react"
import { connect } from "react-redux"
import { getPosts, getFriendPosts } from "src/actions/postActions"
import { getUserActivities } from "src/actions/authActions"
import "../../static/button.css"
import ChautariNoPostMessage from "src/Components/Chautari/ChautariNoPostMessage"

class TopBar
   extends Component {
   constructor( props ) {
      super( props )
      this.state = { activeItem: "Hot" }
   }


   handlePostsClick = () => {
      if ( this.state.activeItem === "Hot" ) {
         this.props.getPosts( "hot" )
      } else if ( this.state.activeItem === "Trending" ) {
         this.props.getPosts( "trending" )
      } else if ( this.state.activeItem === "Sathi" ) {
         this.props.getFriendPosts()
      }
   }

   handlePostsTabChange = e => {
      this.setState( { activeItem: e.target.id }, () => {
         this.handlePostsClick()
      } )
   }

   render() {
      const { activeItem } = this.state
      const { user } = this.props
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
                  id="Hot"
                  name="Hot"
                  active={ activeItem === "Hot" }
                  onClick={ ( e ) => this.handlePostsTabChange( e ) }
                  widths={ 16 }
               >
                  <Icon name="fire"/>
                  Hot
               </Menu.Item>
               <Menu.Item
                  id="Trending"
                  name="Trending"
                  active={ activeItem === "Trending" }
                  onClick={ ( e ) => this.handlePostsTabChange( e ) }
               >
                  <Icon name="angle double up"/>
                  Trending
               </Menu.Item>
               { user && (
                  <Menu.Item
                     id="Sathi"
                     name="Sathi"
                     active={ activeItem === "Sathi" }
                     onClick={ ( e ) => this.handlePostsTabChange( e ) }
                  >
                     <Icon name="group"/>
                     Friends
                  </Menu.Item>
               ) }
            </Menu>
          
         </React.Fragment>
      )
   }
}

const mapStateToProps = ( state ) => ( {
   activity: state.posts.activity,
   user: state.auth.user,
} )

const mapDispatchToProps = ( dispatch ) => ( {
   getPosts: ( order_by ) => dispatch( getPosts( order_by ) ),
   getFriendPosts: () => dispatch( getFriendPosts() ),
   getUserActivities: () => dispatch( getUserActivities() ),
} )

export default connect( mapStateToProps, mapDispatchToProps )( TopBar )
