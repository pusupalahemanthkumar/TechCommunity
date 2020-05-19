// Importing Required Files And Packages Here.
import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Showcase from "./components/Showcase/Showcase";
import Login from "./containers/Auth/Login";
import Register from "./containers/Auth/Register";
import Posts from "./containers/Posts/Posts";
import SinglePost from "./containers/Posts/SinglePost";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Layout>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/posts/:postId" component={SinglePost} />
            <Route exact path="/" component={Showcase} />
          </Switch>
        </Layout>
      </Fragment>
    );
  }
}

export default App;
