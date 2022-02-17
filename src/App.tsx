import { connect } from "react-redux";
import { isAuth } from "./actions/authActions";
import React, { Component } from "react";
import MainRoute from "./Components/route";


interface Props {
  isAuth: () => any
}

class App extends Component<Props> {
  componentDidMount = () => {
    this.props.isAuth();
  }

  render = () => {
    return <MainRoute />;
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  isAuth: () => dispatch(isAuth()),
})


export default connect(null, mapDispatchToProps)(App);
