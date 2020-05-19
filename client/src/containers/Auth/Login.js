// Importing Required Files And Packages Here.
import React, { Component } from "react";
import { Link } from "react-router-dom";

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
  onSubmitHandler = (e) => {
    e.preventDefault();
    const authData = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(authData);
  };

  render() {
    return (
      <div className="container py-1">
        <div className="form-wrap">
          <h1>Login</h1>
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
      </div>
    );
  }
}

export default Login;
