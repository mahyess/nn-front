import React from "react"
import { Menu, Label, Image, Grid, Button, Icon } from "semantic-ui-react"
import login from "../../../img/static/img/login.png"
import signup from "../../../img/static/img/signup.png"
import logo from "../../../img/post/logo3.png"
import { Link } from "react-router-dom"
// import { changeLoginState } from "../../../utils/changeLoginState";
import Login from "../../Layout/Page/Login"
import { connect } from "react-redux"
import { changeAuthPage } from "../../../actions/miscActions"

function AuthNavbar( props ) {
   return (
      <Menu
         className="chautari-navbar"
         style={ {
            padding: 0,
            background: "rgb(220, 20, 60)",
            borderRadius: 0,
            margin: 0,
         } }
      >
         <Menu.Item as={ Link } to="/" style={ { padding: 0 } }>
            <Image
               src={ logo }
               size="medium"
               style={ {
                  maxWidth: 160,
               } }
            />
         </Menu.Item>

         <Menu.Menu position="right" style={ { paddingRight: 16 } }>
            <Menu.Item style={ { padding: 0 } }>
               <Label
                  as={ Link }
                  to="/login/"
                  circular
                  style={ { background: "white" } }
                  onClick={ () => props.changeAuthPage( "login" ) }
               >
                  <Image avatar src={ login }/>
                  Login
               </Label>
            </Menu.Item>

            <Menu.Item style={ { padding: 0 } }>
               <Label
                  as={ Link }
                  to="/login/"
                  circular
                  style={ { background: "white" } }
                  onClick={ () => props.changeAuthPage( "signup" ) }
               >
                  <Image avatar src={ signup }/>
                  Signup
               </Label>
            </Menu.Item>
         </Menu.Menu>
      </Menu>
   )
}

const mapDispatchToProps = ( dispatch ) => ( {
   changeAuthPage: ( page ) => dispatch( changeAuthPage( page ) ),
} )

export default connect( null, mapDispatchToProps )( AuthNavbar )
