import React, { Component } from "react";
import { Button, Card, Grid, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { requestSamaj } from "src/actions/samajActions";

class RequestSamaj extends Component {
  state = {
    name: "",
    background: "",
    iconFile: null,
    coverFile: null,
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fileIconSelectHandler = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.onload = (r) => {
      this.setState({ iconFile: r.target.result }, () => { });
    };
    reader.readAsDataURL(files[0]);
  };
  fileCoverSelectHandler = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.onload = (r) => {
      this.setState({ coverFile: r.target.result }, () => { });
    };
    reader.readAsDataURL(files[0]);
  };

  handleSubmit = () => {
    const { name, description, iconFile, coverFile } = this.state;
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("icon", iconFile);
    formData.append("background", coverFile);

    this.props.requestSamaj(formData);

    this.setState({
      name: "",
      background: "",
      iconFile: null,
      coverFile: null,
    });
  };
  render() {
    return (
      <React.Fragment>
        <Grid style={{ marginLeft: "10px" }}>
          <Grid.Row>
            <Grid.Column>
              <Card centered>
                <Card.Content>
                  <Form onSubmit={() => this.handleSubmit()}>
                    <Form.Field>
                      <label>Samaj Name</label>
                      <input
                        name="name"
                        placeholder="Samaj Name"
                        value={this.state.name}
                        onChange={this.onChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Form.TextArea
                        name="description"
                        value={this.state.description}
                        onChange={this.onChange}
                        label="About Samaj"
                        placeholder="Tell us more about samaj..."
                      />
                    </Form.Field>
                    <Form.Field>
                      <Form.TextArea
                        label="Aim of Samaj"
                        placeholder="What is main aim of samaj"
                      />
                    </Form.Field>
                    {
                      // <Form.Field>
                      //       <strong>Choose Samaj Icon</strong>
                      //       <input
                      //         type="file"
                      //         onChange={(e) => this.fileIconSelectHandler(e)}
                      //       />
                      //     </Form.Field>
                      //     <Form.Field>
                      //       <strong>Choose Samaj Cover</strong>
                      //       <input
                      //         type="file"
                      //         onChange={(e) => this.fileCoverSelectHandler(e)}
                      //       />
                      //     </Form.Field>
                    }

                    <Button type="submit" color="blue">
                      Request Samaj
                    </Button>
                  </Form>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  requestSamaj: (data) => dispatch(requestSamaj(data)),
});

export default connect(null, mapDispatchToProps)(RequestSamaj);
