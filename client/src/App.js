// Importing Required Files And Packages Here.
import React, { Component, Fragment } from "react";
import {  Switch } from "react-router-dom";
// import { connect } from "react-redux";

import UnAuthenticatedRoute from "./containers/routing/UnAuthenticatedRoute";
import PrivateRoute from "./containers/routing/PrivateRoute";
import Layout from "./hoc/Layout/Layout";
import Showcase from "./components/Showcase/Showcase";
import Login from "./containers/Auth/Login";
import Register from "./containers/Auth/Register";
import Posts from "./containers/Posts/Posts";
import SinglePost from "./containers/Posts/SinglePost";
import Dashboard from "./containers/Dashboard/Dashboard";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { loadUser } from "./actions/auth";
// import auth from "./reducers/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

class App extends Component {
  componentDidMount() {
    this.token();
  }
  componentDidUpdate() {
    this.token();
  }
  // Utility Function
  token = () => {
    store.dispatch(loadUser());
  };

  render() {
    return (
      <Fragment>
        <Layout>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            
            <UnAuthenticatedRoute exact path="/login" component={Login} />
            <UnAuthenticatedRoute exact path="/register" component={Register} />
            <UnAuthenticatedRoute exact path="/" component={Showcase} />

            <PrivateRoute exact path="/posts/:postId" component={SinglePost} />
            <PrivateRoute exact path="/posts" component={Posts} />
          </Switch>
        </Layout>
      </Fragment>
    );
  }
}

export default App;
