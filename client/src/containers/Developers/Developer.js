import React, { Component } from "react";
import axios from "axios";
import Spinner from "../../components/UI/Spinner/Spinner";

class Developer extends Component {
  state = {
    profile: null,
    loading: true,
    error: false,
  };
  async componentDidMount() {
    try {
      const res = await axios.get(
        "/api/profile/user/"+this.props.match.params.id
      );
      this.setState({
        profile: res.data,
        loading: false,
        error: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
        error: true,
      });
    }
  }
  render() {
      let data =<Spinner />
      if(!this.state.loading && this.state.profile){
          data =(<div className="profile-container">
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
            <ul>
              { this.state.profile.social && this.state.profile.social.github ? (
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
              { this.state.profile.social && this.state.profile.social.linkedin ? (
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
              { this.state.profile.social && this.state.profile.social.facebook ? (
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
              { this.state.profile.social && this.state.profile.social.instagram ? (
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
              { this.state.profile.skills && this.state.profile.skills.map((skill) => {
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

          )
      }
      if(this.state.error){
          data =<p className="text-center">Some thing went wrong .</p>
      }
      return (
          <div className="container py-1">
              <br /> <br />
              {data}

          </div>
      )
  }
}

export default Developer;
