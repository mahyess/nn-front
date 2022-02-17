import React, { Component } from "react"
import { connect } from "react-redux"
import { Container, Grid } from "semantic-ui-react"
import { getPosts } from "src/actions/postActions"
import ChautariNoPostMessage from "src/Components/Chautari/ChautariNoPostMessage"

import PlaceHolder from "../PlaceHolder/PlaceHolder"

import PostFeed from "../Posts/PostFeed"
import RightBar from "./RightBar"
import TopBar from "./TopBar"

class Chautari
   extends Component {
   state = {
      page: "login",


   }

   componentDidMount = () => {
      this.props.getPosts( "hot" )
   }

   render = () => {
      const { user, isLoading } = this.props

      return (
         <Grid style={ { background: "#f5f5f5", padding: 0 } }>
            <Grid.Row>
               <Grid.Column>
                  <div className="grid-padding">
                     <Grid>
                        <Grid.Row columns={ 2 }>
                           <Grid.Column
                              style={ { height: "100vh" } }
                              computer={ user ? 8 : 12 }
                              mobile={ 16 }
                           >
                              <Grid.Row columns={ 2 }>
                                 <Grid style={ { paddingBottom: 8 } }>
                                    <Grid.Row>
                                       <Grid.Column style={ { padding: 0 } }>
                                          <TopBar/>
                                       </Grid.Column>
                                    </Grid.Row>
                                 </Grid>
                                 { isLoading ? (
                                       <div>
                                          <Grid.Column computer={ 16 }>
                                             <PlaceHolder/>
                                          </Grid.Column>
                                          <Grid.Column computer={ 16 }>
                                             <PlaceHolder/>
                                          </Grid.Column>
                                       </div>
                                    ) :

                                    ( <Container>
                                       <PostFeed/>
                                       {/*<ChautariNoPostMessage activeItem={ "Hot" }/>*/}
                                    </Container> )


                                 }
                              </Grid.Row>
                           </Grid.Column>
                           <Grid.Column only="computer" width={ 8 }>
                              { this.props.user ? <RightBar/> : "" }
                           </Grid.Column>
                        </Grid.Row>
                     </Grid>
                  </div>
               </Grid.Column>
            </Grid.Row>
         </Grid>
      )
   }
}

export const mapStateToProps = ( state ) => ( {
   user: state.auth.user,
   isLoading: state.posts.isLoading,
} )

export const mapDispatchToProps = ( dispatch ) => ( {
   getPosts: ( order_by ) => dispatch( getPosts( order_by ) ),
} )

export default connect( mapStateToProps, mapDispatchToProps )( Chautari )
