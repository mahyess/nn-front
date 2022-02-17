import React, { Component } from "react";
import {
  Modal,

  Form,
  Button,
  TextArea,
  Input,
  Dropdown,
} from "semantic-ui-react";

import { getMySamajList, addSamajPost } from "../../../actions/samajActions";
import Post from "../Post/Post";
import { connect } from "react-redux";

class SharePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        images: [],
        media: null,
        title: "",
        body: "",
        sharePostId: "",
      },
      samajList: [],
      samajId: "",
    };
  }

  componentDidMount() {
    // this.props.getMySamajList();

  }

  handleSamajSelection = (samajSelection) => {
    this.setState({
      samajId: samajSelection.value,
    });

  };

  componentDidUpdate(prevProps) {
    if (this.props.mySamaj !== prevProps.mySamaj) {
      this.setState({
        samajList: this.props.mySamaj.map((samaj) => ({
          key: samaj.id,
          text: samaj.name,
          value: samaj.id,
          image: { avatar: true, src: samaj.icon },
        })),
      });

    }
  }

  handleSubmit = () => {
    const { form } = this.state;

    let formData = new FormData();

    formData.append("community_id", this.state.samajId);

    formData.append("title", form.title);
    formData.append("body", form.body);
    formData.append("shared_post_id", this.props.post && this.props.post.pid);

    if (form.media) {
      formData.append("media", form.media);
    }


    if (form.images) {
      formData.append("images", form.images);
    }

    this.props.addPost(formData);

    this.setState({
      form: {
        media: null,
        title: "",
        body: "",
      },
    });
    this.props.handleClose();
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <Modal
        open={this.props.modalOpen}
        closeIcon
        onClose={this.props.handleClose}
        size="tiny"
      >
        <Modal.Header>Whats on your mind?</Modal.Header>
        <Modal.Content>
          <Form onSubmit={() => this.handleSubmit()}>
            {
              //    <ImageUploadComponent
              //      uploadImageToState={this.uploadImageToState}
              //    />
            }
            <Input
              placeholder="Title..."
              fluid
              name="title"
              value={this.state.form.title}
              onChange={(e) => this.handleChange(e)}
              style={{ paddingTop: 5 }}
            />
            <TextArea
              placeholder="Tell us more..."
              style={{
                minHeight: 100,
                width: "100%",
                border: "1px solid lightgrey",
                marginTop: 10,
                padding: 10,
              }}
              name="body"
              value={this.state.form.body}
              onChange={(e) => this.handleChange(e)}
            />
            <Post contentFrom="share" post={this.props.post} />
            {this.props.mySamaj && this.props.mySamaj.length > 0 && (
              <Dropdown
                placeholder="Select Samaj"
                fluid
                search
                selection
                // text={this.state.samajId}
                options={this.state.samajList}
                name="tags"
                value={this.state.samajId}
                onChange={(e, value) => this.handleSamajSelection(value)}
              />
            )}
            <Button fluid color="blue" style={{ marginTop: 5 }}>
              Share Post
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    mySamaj: state.samaj.mySamaj,
    isLoading: state.samaj.isLoading,
  };
};

export const mapDispatchToProps = (dispatch: any) => {
  return {
    getMySamajList: () => dispatch(getMySamajList()),
    addPost: (formData) => dispatch(addSamajPost(formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharePost);
