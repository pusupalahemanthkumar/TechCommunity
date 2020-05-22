// Importing Required Files And Packages Here.
import React, { Component, Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import Spinner from "../../components/UI/Spinner/Spinner";

// Defining Dashboard COmponent Here.
class Dashboard extends Component {
  state = {
    profile: null,
    loading: true,
    noprofile: false,
    error: false,
  };
  async componentDidMount() {
    if(this.props.token){
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": this.props.token,
        },
      };
      const res = await axios.get("/api/profile/me", config);
      this.setState({
        profile: res.data,
        loading: false,
        error: false,
        noprofile: false,
      });
    } catch (err) {
      if (
        err.response &&
        err.response.data.msg === "There is no profile for this User."
      ) {
        this.setState({
          noprofile: true,
          error: false,
          loading: false,
        });
      } else {
        this.setState({
          error: false,
          loading: false,
          noprofile: false,
        });
      }
    }
  }
  }
  render() {
    let profile = <Spinner />;
    if (this.state.error) {
      profile = (
        <p className="text-center">
          Something Went Wrong . Please reload the page.
        </p>
      );
    }
    if (this.state.noprofile) {
      profile = (
        <p className="text-center">
          No Profile. Go to Edit Profile and create a Profile.
        </p>
      );
    }
    if (!this.state.loading && this.state.profile) {
      profile = (
        <div className="profile-container">
          <div className="profile-intro">
            <div className="profile-img text-center">
              <img
                src={this.state.profile.user.avatar}
                alt={this.state.profile.user.name}
              />
            </div>

            <h3 className="text-center">{this.state.profile.user.name}</h3>
          </div>
          <div>
            <p className="text-center">
              <i className="fas fa-map-marker-alt"></i>
              <strong> Location </strong> {this.state.profile.location}
            </p>
            {this.state.profile.website ? (
              <p className="text-center">
                <strong>Website </strong>
                <a
                  href={this.state.profile.website}
                  
                  className="text-primary"
                >
                  {this.state.profile.website}
                </a>
              </p>
            ) : null}
          </div>
          <div className="profile-bio text-center">
            <h3 className="text-center">About</h3>
            <p>{this.state.profile.about}</p>
          </div>
          <div className="profile-social-icons">
          <h3 className="text-center">Social Media</h3>
            <ul>
              {  this.state.profile.social && this.state.profile.social.github ? (
                <li>
                  <span>
                    <a href={this.state.profile.social.github} >
                      <i
                        className="fab fa-github fa-2x"
                        style={{ color: "#49c1a2" }}
                      ></i>
                    </a>
                  </span>
                </li>
              ) : null}
              {  this.state.profile.social && this.state.profile.social.linkedin ? (
                <li>
                  <span>
                    <a
                      href={this.state.profile.social.linkedin}
                     
                    >
                      <i
                        className="fab fa-linkedin fa-2x"
                        style={{ color: "#49c1a2" }}
                      ></i>
                    </a>
                  </span>
                </li>
              ) : null}
              {   this.state.profile.social && this.state.profile.social.facebook ? (
                <li>
                  <span>
                    <a
                      href={this.state.profile.social.facebook}
                     
                    >
                      <i
                        className="fab fa-facebook-square fa-2x"
                        style={{ color: "#49c1a2" }}
                      ></i>
                    </a>
                  </span>
                </li>
              ) : null}
              {   this.state.profile.social &&this.state.profile.social.instagram ? (
                <li>
                  <span>
                    <a
                      href={this.state.profile.social.instagram}
                      
                    >
                      <i
                        className="fab fa-instagram fa-2x"
                        style={{ color: "#49c1a2" }}
                      ></i>
                    </a>
                  </span>
                </li>
              ) : null}
            </ul>
          </div>
          <br />
          <br />

          <h3 className="text-center">Skills</h3>
          <div className="profile-skills">
            <ul>
              {  this.state.profile.skills && this.state.profile.skills.map((skill) => {
                return (
                  <li key={skill}>
                    <span>
                      <i
                        className="far fa-check-circle"
                        style={{ color: "#49c1a2" }}
                      ></i>
                      {skill}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    }
    return (
      <Fragment>
        <div className="container">
          <br />
          <div className="dashboard-nav ">
            <ul>
              <li>
                <NavLink exact to="/dashboard/">
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/dashboard/edit-profile">
                  Edit Profile
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="container">{profile}</div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Dashboard);
