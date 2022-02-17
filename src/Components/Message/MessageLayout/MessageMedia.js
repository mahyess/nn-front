import React, { Component } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { connect } from "react-redux";
import { Grid, Segment, Header } from "semantic-ui-react";

const photos = [
  {
    src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    width: 4,
    height: 3,
  },
  {
    src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    width: 1,
    height: 1,
  },
  {
    src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
    width: 3,
    height: 4,
  },
  {
    src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
    width: 3,
    height: 4,
  },
  {
    src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
    width: 3,
    height: 4,
  },
  {
    src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
    width: 4,
    height: 3,
  },
  {
    src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
    width: 3,
    height: 4,
  },
  {
    src: "https://source.unsplash.com/PpOHJezOalU/800x599",
    width: 4,
    height: 3,
  },
  {
    src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
    width: 4,
    height: 3,
  },
];

class MessengerMedia extends Component {
  state = {
    currentImage: 0,
    isModelOpen: false,
    images: [],
  };

  closeLightbox = () => {
    this.setState({
      currentIndex: 0,
      isModelOpen: false,
    });
  };
  componentDidUpdate = (prevProps) => {
    if (
      this.props.posts.results !== prevProps.posts.results &&
      this.props.posts &&
      this.props.posts.results &&
      this.props.posts.results.length > 0
    ) {
      let tempImages = [];
      this.props.posts.results.map((post) => {
        if (post.media) {
          let img = new Image();
          img.src = post.media;

          tempImages.push({
            src: post.media,
            height: img.height / 200,
            width: img.width / 200,
          });
        }
      });
      this.setState({ images: [...tempImages] });
    }
  };

  openLightBox = (event, photo, index) => {
    this.setState({
      currentImage: index,
      isModelOpen: true,
    });
  };

  render() {
    const { isLoading } = this.props;
    const { modalIsOpen } = this.state;
    return (
      <React.Fragment>
        <Grid>
          <Grid.Column only="computer">
            <Header as="h3" dividing style={{ padding: 0, margin: 0 }}>
              Media
            </Header>
            <Segment
              // className="pad-0"
              basic
              style={{
                height: "430px",
                overflow: "auto",
                padding: 0,
                margin: 0,
              }}
            >
              {!isLoading ? (
                <Gallery
                  photos={photos}
                  onClick={(e, index) => {
                    this.openLightBox(e, null, index.index);
                  }}
                />
              ) : null}

              <ModalGateway>
                {this.state.isModelOpen ? (
                  <Modal onClose={this.closeLightbox}>
                    <Carousel
                      currentIndex={this.state.currentImage}
                      views={photos.map((x) => ({
                        ...x,
                        srcset: x.srcSet,
                        caption: x.title,
                      }))}
                    />
                  </Modal>
                ) : (
                  ""
                )}
              </ModalGateway>
            </Segment>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
  };
};
export default connect(mapStateToProps, null)(MessengerMedia);
