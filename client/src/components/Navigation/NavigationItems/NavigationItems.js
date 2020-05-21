import React, { Fragment } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../../actions/auth";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Fragment>
      <NavigationItem link="/dashboard">Dashboard</NavigationItem>
      <NavigationItem link="/developers">Developers</NavigationItem>
      <NavigationItem link="/posts">Posts</NavigationItem>
      <NavigationItem link="/posts" onClick={logout}>
        <i className="fas fa-sign-out-alt"></i>{" "}
        <span className="hide-sm">Logout</span>
      </NavigationItem>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <NavigationItem link="/">Home</NavigationItem>
      <NavigationItem link="/developers">Developers</NavigationItem>
      <NavigationItem link="/login">Login</NavigationItem>
      <NavigationItem link="/register">SignUp</NavigationItem>
    </Fragment>
  );

  return (
    <ul className={classes.NavigationItems}>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </ul>
  );
};

navigationItems.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { logout })(navigationItems);
