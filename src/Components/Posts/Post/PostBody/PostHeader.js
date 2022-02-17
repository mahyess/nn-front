import React from "react"
import { Card, Grid, Popup, Icon, Image, Button } from "semantic-ui-react"
import { Link } from "react-router-dom"

const PostHeader = ( props ) => {

   return (
      <Card.Header>
         <Grid columns={ 2 }>
            <Grid.Row>
               <Grid.Column width={ 13 }>
                  <Link
                     to={ "/profile/" + props.post.user.username }
                     style={ { color: "black" } }
                  >
                     <Image
                        avatar
                        src={ props.post.user.profile.avatar }
                        style={
                           props.post &&
                           props.post.user &&
                           props.post.user.points &&
                           props.post.user.points.color_code && {
                              border: `2px solid ${ props.post.user.points.color_code }`,
                              padding: 2,
                              objectFit: "cover",
                              height: 36,
                              width: 36,
                           }
                        }
                     />

                     { props.post.user.full_name }
                  </Link>
                  { props.post.community ? (
                     <span>
                <Icon
                   name="caret right"
                   style={ {
                      position: "absolute",
                      marginTop: 7,
                   } }
                />
                <Link
                   to={
                      "/samaj/" +
                      ( props.post &&
                         props.post.community &&
                         props.post.community.id + "/" + props.post.community.slug )
                   }
                   style={ { color: "black", paddingLeft: 18 } }
                >
                  { props.post.community.name }
                </Link>
              </span>
                  ) : null }
               </Grid.Column>
               <Grid.Column width={ 3 } textAlign="right">
                  { props.user &&
                  <Popup
                     hideOnScroll={ true }
                     position="bottom right"
                     on="click"
                     pinned
                     trigger={
                        <Icon name="sliders horizontal" style={ { cursor: "pointer" } }/>
                     }
                  >
                     {/*delete post  if post is done by user and report post if post is of other */ }
                     <Icon
                        name="exclamation"
                        key="zzz"
                        onClick={ {} }
                        style={ { width: "auto" } }
                     />

                     <span style={ { marginLeft: 2 } }>
                         { props.post &&
                         props.user &&
                         props.post.user &&
                         props.post.user.username === props.user.username ?
                            "  Delete Post" : " Report" }</span>

                     {/*delete post  if post is done by user and report post if post is of other  ends here*/ }

                     { localStorage.getItem( "sidenav" ) === "samaj" && props.samajDetail &&
                     props.samajDetail.details &&
                     props.samajDetail.details.admin.map( ( samajAdmin, index ) => ( samajAdmin.username
                        === ( props.user && props.user.username ) &&

                        <Button
                           as={ Link }
                           onClick={ ( post ) => props.handlePinnedPost( props.post ) }
                        >
                           <Icon name="pin" key="zasdzz"/>
                           { props.post.pinned ? "Unpin" : "Pin" }
                        </Button>
                     ) ) }
                  </Popup>
                  }
               </Grid.Column>
            </Grid.Row>
         </Grid>
      </Card.Header>
   )
}

export default PostHeader
