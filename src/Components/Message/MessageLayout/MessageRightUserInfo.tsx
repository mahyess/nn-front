import React, { Component } from "react";
import {
  Card,
  Icon,
  Image,
  Container,
  Grid,
  Divider,
  Header,
  Segment,
} from "semantic-ui-react";
import logo from "../../../img/static/img/logo.png";
import MessengerMedia from "./MessageMedia";
import { FRIEND_REQUESTS_COUNT } from "../../../actions/actionTypes";
class MessageRightUserInfo extends Component {
  render() {
    const { activeFriend } = this.props;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Segment
              style={{
                border: "unset",
                borderRadius: "0px",
                height: "100%",
              }}
            >
              <div style={{ margin: "auto" }}>
                <center>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column>
                        <Image
                          src={
                            activeFriend === null
                              ? logo
                              : activeFriend.profile.avatar
                          }
                          circular
                          style={{
                            height: "148px",
                            width: "148px",
                            objectFit: "cover",
                          }}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Grid>
                          <Grid.Row>
                            <Grid.Column>
                              <h3 style={{ margin: 0 }}>
                                {activeFriend === null
                                  ? ""
                                  : activeFriend.first_name +
                                    " " +
                                    activeFriend.last_name}
                              </h3>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                        <Grid>
                          <Grid.Row>
                            <Grid.Column>
                              <p
                                style={{
                                  margin: 0,

                                  textAlign: "center",
                                }}
                              >
                                @
                                {activeFriend === null
                                  ? ""
                                  : activeFriend.username}
                              </p>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </center>
              </div>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment
              style={{
                border: "unset",
                borderRadius: "0px",
                height: "100%",
                padding: 0,
              }}
            >
              <MessengerMedia />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default MessageRightUserInfo;
