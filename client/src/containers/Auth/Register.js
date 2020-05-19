// Importing Required Files And Packages Here.
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import Alert from "../Alert/Alert";

// Defining Register Component Here.
class Register extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    pasword2: "",
  };
  // Utility Methods
  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmitHandler = (e) => {
    e.preventDefault();
    if (this.state.password !== this.state.pasword2) {
      this.props.setAlert("Passwords do not match.", "danger");

      return console.log("Passwords don't match.");
    }
    const authData = {
      name: this.state.firstName +this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };
    console.log(authData);
    this.props.register(authData);

  };
  render() {
    // If Authenticated
    if (this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="container py-1">
        <div className="form-wrap">
          <h1>Sign Up</h1>
          <Alert />
          <p>It's free and only takes a minute</p>
          <form onSubmit={this.onSubmitHandler}>
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                name="firstName"
                id="first-name"
                required
                onChange={this.onChangeHandler}
                value={this.state.firstName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="last-name"
                required
                onChange={this.onChangeHandler}
                value={this.state.lastName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                onChange={this.onChangeHandler}
                value={this.state.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                minLength="6"
                autoComplete="off"
                required
                onChange={this.onChangeHandler}
                value={this.state.password}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input
                type="password"
                name="pasword2"
                id="password2"
                minLength="6"
                autoComplete="off"
                required
                onChange={this.onChangeHandler}
                value={this.state.pasword2}
              />
            </div>
            <button type="submit" className="btn">
              Sign Up
            </button>
          </form>
        </div>
        <footer>
          <p>
            Already have an account? <Link to="/login">Login Here</Link>
          </p>
        </footer>
      </div>
    );
  }
}

Register.propTypes ={
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated :PropTypes.bool,
};


const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { setAlert, register })(Register);
