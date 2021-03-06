// Importing Required Files And Packages Here.
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Alert from "../Alert/Alert";

import { login } from "../../actions/auth";
import Spinner from "../../components/UI/Spinner/Spinner";

// Defining Login Component Here.
class Login extends Component {
  state = {
    email: "",
    password: "",
  };
  // Utility Methods
  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmitHandler = async (e) => {
    e.preventDefault();
    const authData = {
      email: this.state.email,
      password: this.state.password,
    };
    await this.props.login(authData);
  };

  render() {
    // Redirect if logged in
    if (this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }
    let form = (
      <React.Fragment>
        <div className="form-wrap">
          <h1>Login</h1>
          <Alert />
          <form onSubmit={this.onSubmitHandler}>
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
                required
                minLength="6"
                autoComplete="off"
                onChange={this.onChangeHandler}
                value={this.state.password}
              />
            </div>

            <button type="submit" className="btn">
              Login
            </button>
          </form>
        </div>
        <footer>
          <p>
            Don't have account? <Link to="/register">Signup Here</Link>
          </p>
        </footer>
      </React.Fragment>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return <div className="container py-1">{form}</div>;
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps, { login })(Login);
