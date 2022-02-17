{
  this.props.post.comments
    ? this.props.post.comments.results.map(
        (comment, i) =>
          comment.parent === null && (
            <Comment.Group key={i}>
              <Comment>
                <Comment.Avatar
                  src={comment.user.profile.avatar}
                  style={{
                    border: `2px solid  ${comment.user.points.color_code}`,
                    height: 40,
                    width: 40,
                    objectFit: "cover",
                  }}
                />

                <Comment.Content>
                  <Comment.Author as="a">
                    {comment.user.username}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>
                      {moment(comment.timestamp).fromNow()}{" "}
                      <Icon name="star" color="green" /> {comment.total_votes}{" "}
                      Votes
                    </div>
                  </Comment.Metadata>
                  <Comment.Text> {comment.comment}</Comment.Text>
                  <Comment.Actions>
                    <Icon
                      name="reply"
                      color="blue"
                      style={{ cursor: "pointer" }}
                      onClick={() => this.toggleReplyVisiblity(comment.id)}
                    />
                    Reply
                    {this.state.replyShown
                      ? this.state.currentCommentId === comment.id && (
                          <Form>
                            <Form.TextArea
                              placeholder="Tell us more"
                              onChange={this.handleReplyCommentChange}
                              style={{ marginTop: 10 }}
                              value={this.state.parentComment}
                            />
                            <Button
                              content="Reply comment"
                              labelPosition="right"
                              icon="edit"
                              primary
                              onClick={() =>
                                this.handleAddReplyComment(
                                  comment.post.pid,
                                  comment.id
                                )
                              }
                            />
                          </Form>
                        )
                      : null}
                    <Comment.Action
                      style={{
                        color: comment.user_vote_status === 1 ? blue : "black",
                      }}
                      onClick={() =>
                        this.handleCommentUpvote(
                          this.props.post.pid,
                          comment.id
                        )
                      }
                    >
                      <Icon name="arrow up" color="" />
                      Vote
                    </Comment.Action>
                    <Comment.Action
                      style={{
                        color: comment.user_vote_status === -1 ? Red : "black",
                      }}
                      onClick={() =>
                        this.handleCommentDownvote(
                          this.props.post.pid,
                          comment.id
                        )
                      }
                    >
                      <Icon name="arrow down" color="" />
                      Vote
                    </Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
                {this.props.post.comments
                  ? this.props.post.comments.results.map(
                      (chidComment, i) =>
                        chidComment.parent === comment.id && (
                          <Comment.Group key={i}>
                            <Comment>
                              <Comment.Avatar
                                src={comment.user.profile.avatar}
                                style={{
                                  border: `0px solid ${comment.user.points.color_code}`,
                                  //   borderRadius: "50%",
                                  //   marginRight: "12px",
                                  //   boxShadow:
                                  //     "white 0px 0px 0px 3px, rgb(44, 194, 44) 0px 0px 0px 5px"
                                }}
                              />

                              <Comment.Content>
                                <Comment.Author as="a">
                                  {chidComment.user.username}
                                </Comment.Author>
                                <Comment.Metadata>
                                  <div>
                                    {moment(chidComment.timestamp).fromNow()}{" "}
                                    <Icon name="star" color="green" />{" "}
                                    {chidComment.total_votes} Votes
                                  </div>
                                </Comment.Metadata>
                                <Comment.Text>
                                  {" "}
                                  {chidComment.comment}
                                </Comment.Text>
                                <Comment.Actions>
                                  <Icon
                                    name="reply"
                                    color="blue"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      this.toggleReplyVisiblity(chidComment.id)
                                    }
                                  />
                                  Reply
                                  {this.state.replyShown
                                    ? this.state.currentCommentId ===
                                        chidComment.id && (
                                        <Form>
                                          <Form.TextArea
                                            placeholder="Tell us more"
                                            onChange={
                                              this.handleReplyCommentChange
                                            }
                                            style={{
                                              marginTop: 10,
                                            }}
                                            value={this.state.parentComment}
                                          />
                                          <Button
                                            content="Reply comment"
                                            labelPosition="right"
                                            icon="edit"
                                            primary
                                            onClick={() =>
                                              this.handleAddReplyComment(
                                                comment.id
                                              )
                                            }
                                          />
                                        </Form>
                                      )
                                    : null}
                                  <Comment.Action
                                    style={{
                                      color:
                                        chidComment.user_vote_status === 1
                                          ? blue
                                          : "black",
                                    }}
                                    onClick={() =>
                                      this.handleCommentUpvote(
                                        this.props.comment.pid,
                                        chidComment.id
                                      )
                                    }
                                  >
                                    <Icon name="arrow up" color="" />
                                    Vote
                                  </Comment.Action>
                                  <Comment.Action
                                    style={{
                                      color:
                                        comment.user_vote_status === -1
                                          ? Red
                                          : "black",
                                    }}
                                    onClick={() =>
                                      this.handleCommentDownvote(
                                        this.props.comment.pid,
                                        chidComment.id
                                      )
                                    }
                                  >
                                    <Icon name="arrow down" color="" />
                                    Vote
                                  </Comment.Action>
                                </Comment.Actions>
                              </Comment.Content>
                            </Comment>
                          </Comment.Group>
                        )
                    )
                  : ""}
              </Comment>
            </Comment.Group>
          )
      )
    : "No comments";
}
