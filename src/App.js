import { connect } from "react-redux";
import { isAuth } from "./actions/authActions";
import React, { Component } from "react";
import MainRoute from "./Components/route";

class App extends Component {
  componentDidMount = () => {
    this.props.isAuth();
  }

  render = () => {
    return <MainRoute />;
  }
}

const mapDispatchToProps = (dispatch) => ({
    isAuth: () => dispatch(isAuth()),
  })


export default connect(null, mapDispatchToProps)(App);
