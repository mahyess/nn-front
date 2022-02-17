import React, { Component } from "react"
import { Menu, Card, Image, List, Label, MenuItemProps } from "semantic-ui-react"
import logo from "../../img/post/logo.png"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { fetchIncomingRequests } from "../../actions/sathiActions"
import chautari from "../../img/static/img/chautari.png"
import samaj from "../../img/static/img/society.png"
import sathi from "../../img/static/img/sathi.png"
import maleProfile from "../../img/static/img/male profile.png"
import femaleProfile from "../../img/static/img/female profile.png"
import messagess from "../../img/static/img/messagess.png"

const sidebarItems = [
   "chautari",
   "samaj",
   "sathi",
   "profile",
   "message",
   "hashtags",
]

interface SidebarProps {
   fetchIncomingRequests: () => void
   user: {
      first_name: string
      last_name: string
      username: string
      profile: {
         avatar?: string
      }
      points: {
         color_code: string
      }
      gender: {
         title: string
      }
   }
   requests: {
      incoming: {
         count: number
      }
   }
}

class Sidebar extends Component<SidebarProps> {
   state = {
      activeItem: localStorage.getItem("sidenav") || "Chautari",
      sideDrawerOption: false,
   }

   componentDidMount = () => {
      this.props.fetchIncomingRequests()
      const path = window.location.pathname

      // some is like map here, except it breaks after finding what it wants
      sidebarItems.some((sidebarItem) => {
         let includes = path.includes(sidebarItem)
         if (includes) {
            this.setState({ activeItem: sidebarItem })
         }
         return includes
      })
   }

   handleItemClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, { name = "" }: MenuItemProps): void => {
      localStorage.setItem("sidenav", name)
   }

   render() {
      const { activeItem } = this.state
      return (
         <div
            className="sideMenu"
            style={{ background: "white", height: "100vh", width: 272 }}
         >
            <Card style={{ borderRadius: 0 }}>
               <Card.Content as={Link} to="/chautari/">
                  <Image
                     src={logo}
                     size="small"
                     style={{ width: 40, padding: 0, float: "left" }}
                  />
                  <h4 style={{ float: "left", margin: 0, paddingTop: 8 }}>
                     NAMASTE NEPAL
                  </h4>
               </Card.Content>
            </Card>

            <div style={{ marginTop: 8 }}>
               <Card
                  style={{
                     border: 0,
                     padding: 0,
                     paddingLeft: 8,
                     boxShadow: "none",
                     margin: 0,
                  }}
                  as={Link}
                  to={`/profile/${this.props.user && this.props.user.username}/`}
               >
                  <Card.Content>
                     <List>
                        <List.Item>
                           <Image
                              avatar
                              src={
                                 this.props.user && this.props.user.profile
                                    ? this.props.user.profile.avatar
                                    : null
                              }
                              style={{
                                 height: 36,
                                 width: 36,
                                 objectFit: "cover",
                                 border:
                                    "2px solid " +
                                    (this.props.user
                                       ? this.props.user &&
                                       this.props.user.points &&
                                       this.props.user.points.color_code
                                       : "black"),
                              }}
                           />
                           <List.Content>
                              <List.Header>
                                 {this.props.user && this.props.user.first_name}{" "}
                                 {this.props.user && this.props.user.last_name}
                              </List.Header>
                              @{this.props.user && this.props.user.username}
                           </List.Content>
                        </List.Item>
                     </List>
                  </Card.Content>
               </Card>
               {/* <Switch> */}
               <Menu
                  pointing
                  secondary
                  vertical
                  style={{ width: "100%", margin: 0, paddingTop: 8 }}
               >
                  {/* <Link to="/chautari"> */}
                  <Menu.Item
                     as={Link}
                     to="/chautari/"
                     style={{
                        width: "100%",
                        padding: 8,
                        paddingLeft: 16,
                        // paddingLeft: 50,
                        border: "none",
                        background: this.state.activeItem === "chautari" && "#DC143C",
                        color: this.state.activeItem === "chautari" && "white",
                        fontColor: "blue",
                     }}
                     active={activeItem === localStorage.getItem("sidenav")}
                     onClick={this.handleItemClick}
                  >
                     <span>
                        <Image
                           src={chautari}
                           avatar
                           size="medium"
                           style={{
                              background: "white",
                              height: "24px",
                              width: "24px",
                              padding: 4,
                           }}
                        />
                        <span
                           style={{
                              height: "24px",
                              width: "24px",
                              paddingLeft: 4,
                           }}
                        >
                           Chautari
                        </span>
                     </span>
                  </Menu.Item>
                  {/* </Link> */}
                  {/* <Link to="/samaj"> */}
                  <Menu.Item
                     as={Link}
                     to="/samaj/"
                     name="samaj"
                     active={activeItem === "samaj"}
                     style={{
                        width: "100%",
                        padding: 8,
                        paddingLeft: 16,
                        border: "none",
                        background: this.state.activeItem === "samaj" && "#DC143C",
                        color: this.state.activeItem === "samaj" && "white",
                     }}
                     onClick={this.handleItemClick}
                  >
                     <Image
                        src={samaj}
                        avatar
                        style={{
                           background: "white",
                           height: "24px",
                           width: "24px",
                           padding: 4,
                        }}
                     />
                     Samaj
                  </Menu.Item>
                  {/* </Link> */}
                  {/* <Link to="/sathi"> */}
                  <Menu.Item
                     as={Link}
                     to="/sathi/"
                     name="sathi"
                     active={activeItem === "sathi"}
                     style={{
                        width: "100%",
                        border: "none",
                        padding: 8,
                        paddingLeft: 16,
                        background: this.state.activeItem === "sathi" && "#DC143C",
                        color: this.state.activeItem === "sathi" && "white",
                     }}
                     onClick={this.handleItemClick}
                  >
                     {" "}
                     <Image
                        src={sathi}
                        avatar
                        style={{
                           background: "white",
                           height: "24px",
                           width: "24px",
                           padding: 4,
                        }}
                     />
                     Sathi
                     <Label color="grey" pointing="left">
                        {this.props.requests.incoming.count}
                     </Label>
                  </Menu.Item>
                  {/* </Link> */}
                  {/* <Link to="/profile"> */}
                  <Menu.Item
                     onClick={this.handleItemClick}
                     as={Link}
                     to={`/profile/${this.props.user && this.props.user.username}/`}
                     name="profile"
                     active={activeItem === "profile"}
                     style={{
                        width: "100%",
                        border: "none",
                        padding: 8,
                        paddingLeft: 16,
                        background: this.state.activeItem === "profile" && "#DC143C",
                        color: this.state.activeItem === "profile" && "white",
                     }}
                  >
                     {this.props.user && this.props.user.gender.title === "male" ? (
                        <Image
                           src={maleProfile}
                           avatar
                           style={{
                              background: "white",
                              height: "24px",
                              width: "24px",
                              padding: 4,
                           }}
                        />
                     ) : (
                        <Image
                           src={femaleProfile}
                           avatar
                           style={{
                              background: "white",
                              height: "24px",
                              width: "24px",
                              padding: 4,
                           }}
                        />
                     )}
                     Profile
                  </Menu.Item>
                  <Menu.Item
                     as={Link}
                     to="/message/"
                     name="message"
                     active={activeItem === "message"}
                     style={{
                        width: "100%",
                        padding: 8,
                        paddingLeft: 16,
                        border: "none",
                        background: this.state.activeItem === "message" && "#DC143C",
                        color: this.state.activeItem === "message" && "white",
                     }}
                     onClick={this.handleItemClick}
                  >
                     <Image
                        avatar
                        src={messagess}
                        style={{
                           background: "white",
                           height: "24px",
                           width: "24px",
                           padding: 4,
                        }}
                        size="tiny"
                     />
                     Message
                     <Label color="grey" pointing="left">
                        M
                     </Label>
                  </Menu.Item>
                  {/* </Link> */}
                  {/* <Menu.Item
              as={Link}
              to="/hashtags/"
              name="hashtags"
              active={activeItem === "hashtags"}
              style={{
                width: "100%",
                padding: 16,
                border: "none",
                paddingLeft: 50,
                background: this.state.activeItem === "hashtags" && "#DC143C",
                color: this.state.activeItem === "hashtags" && "white",
              }}
              onClick={this.handleItemClick}
            /> */ }
                  {/* </Link> */}
               </Menu>
               {/* </Switch> */}
            </div>
         </div>
      )
   }
}

const mapStateToProps = (state: any) => {
   return {
      user: state.auth.user,
      requests: state.sathi.requests,
   }
}

const mapDispatchToProps = (dispatch: any) => {
   return {
      fetchIncomingRequests: () => dispatch(fetchIncomingRequests()),
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
