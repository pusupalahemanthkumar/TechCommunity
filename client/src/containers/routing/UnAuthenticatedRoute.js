// Importing Required Files And Packages Here.
import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const UnAuthenticatedRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
  );
};

UnAuthenticatedRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProp = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProp)(UnAuthenticatedRoute);
