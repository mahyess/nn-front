import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chautari from "../Chautari/Chautari";
import Samaj from "../Samaj/Samaj";

import SamajDetailView from "../Samaj/SamajDetailView";
// import UserView from "../Profile/UserView";
import GuestAuthentication from "../Auth/GuestAuthentication";
import HomePage from "../Layout/Page/HomePage";
// import { login } from "../../actions/authActions";
import Login from "../Layout/Page/Login";
// import Layout from "../Layout/Layout";
import Authentication from "../Auth/Authentication";
import Profile from "../Profile/Profile";
import Sathi from "../Sathi/Sathi";
import Message from "../Message/Message";
import HashTagList from "../HashTag/HashTagList";
import HashTag from "../HashTag/HashTag";
import Signup from "../Layout/Page/Signup";
import AccountSettings from "../Auth/AccountSettings";
import ForgetPassword from "../Auth/ForgetPassword";
import PhoneVerify from "../Auth/PhoneVerify";
import MessengerAuthentication from "../Auth/MessangerAuthentication";
import Notifications from "../Notifications/Notifications";
import SearchResults from "../Search/SearchResults";

export default class MainRoute extends Component {
  render = () => (
      <Router>
        <Switch>
          <Route exact path="/" component={GuestAuthentication(HomePage)} />
          <Route exact path="/login/" component={GuestAuthentication(Login)} />
          <Route
            exact
            path="/signup/"
            component={GuestAuthentication(Signup)}
          />
          <Route exact path="/chautari/" component={Authentication(Chautari)} />
          {/* <Route exact path="/chautari/" component={Authentication(Chautari)} /> */}
          <Route exact path="/samaj/" component={Authentication(Samaj)} />
          <Route exact path="/profile/" component={Authentication(Profile)} />
          <Route
            exact
            path="/message/:username?/"
            component={MessengerAuthentication(Message)}
          />
          <Route
            exact
            path="/hashtags/"
            component={Authentication(HashTagList)}
          />
          <Route
            exact
            path="/hashtag/:hashtag/"
            component={Authentication(HashTag)}
          />
          <Route
            exact
            path="/profile/:username/"
            component={Authentication(Profile)}
          />
          <Route
            exact
            path="/account-settings/"
            component={Authentication(AccountSettings)}
          />
          <Route
            exact
            path="/reset-password/"
            component={GuestAuthentication(ForgetPassword)}
          />
          <Route
            exact
            path="/notifications//"
            component={Authentication(Notifications)}
          />
          <Route
            exact
            path="/search-results/"
            component={Authentication(SearchResults)}
          />
          <Route
            exact
            path="/samaj/:id/:slug/"
            component={Authentication(SamajDetailView)}
          />
          <Route exact path="/sathi/" component={Authentication(Sathi)} />
          <Route
            exact
            path="/phone-verify/"
            component={GuestAuthentication(PhoneVerify)}
          />
        </Switch>
      </Router>
    );
  }
