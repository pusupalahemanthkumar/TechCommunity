// Importing Required Files And Packages Here.
import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
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
import DashboardEdit from "./containers/Dashboard/DashboardEdit";
import Developers from "./containers/Developers/Developers";
import Developer from "./containers/Developers/Developer";
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
  // componentDidUpdate() {
  //   this.token();
  // }
  // Utility Function
  token = () => {
    store.dispatch(loadUser());
  };

  render() {
    return (
      <Fragment>
        <Layout>
          <Switch>
          <Route exact path="/developers/:id" component={Developer} />
            <Route exact path="/developers" component={Developers} />
            <UnAuthenticatedRoute exact path="/register" component={Register} />
            <UnAuthenticatedRoute exact path="/" component={Showcase} />
            <UnAuthenticatedRoute exact path="/login" component={Login} />

           

            <PrivateRoute exact path="/posts/:postId" component={SinglePost} />
            <PrivateRoute exact path="/posts" component={Posts} />

            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
              exact
              path="/dashboard/edit-profile"
              component={DashboardEdit}
            />
          </Switch>
        </Layout>
      </Fragment>
    );
  }
}

export default App;
