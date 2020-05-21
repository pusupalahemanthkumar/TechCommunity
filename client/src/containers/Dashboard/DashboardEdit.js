// Importing Required Files And Packages Here.
import React, { Component, Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Alert from "../Alert/Alert";
import { setAlert } from "../../actions/alert";
import Spinner from "../../components/UI/Spinner/Spinner";

// Defining DashboardEdit COmponent Here.
class DashboardEdit extends Component {
  state = {
    formData: {
      location: "",
      website: "",
      about: "",
      facebook: "",
      github: "",
      linkedin: "",
      instagram: "",
      skills: "",
    },
    loading: false,
  };

  async componentDidMount() {
    try {
      this.setState({
        loading: true,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": this.props.token,
        },
      };
      const res = await axios.get("/api/profile/me", config);
      const data = {
        location: res.data.location ? res.data.location : "",
        website: res.data.website ? res.data.website : "",
        about: res.data.about ? res.data.about : "",
        skills: res.data.skills ? res.data.skills.join(" , ") : "",
        facebook: res.data.social.facebook ? res.data.social.facebook : "",
        github: res.data.social.github ? res.data.social.github : "",
        instagram: res.data.social.instagram ? res.data.social.instagram : "",
        linkedin: res.data.social.linkedin ? res.data.social.linkedin : "",
      };
      this.setState({
        formData: data,
        loading: false,
      });
    } catch (err) {
      console.log(err.response.data);
      if (err.response.data.msg === "There is no profile for this User.") {
        this.setState({
          loading: false,
          error: false,
        });
      } else {
        this.props.setAlert(
          "Couldn't add profile. Try again after sometime. ",
          "danger"
        );
        this.setState({
          loading: false,
          error: true,
        });
      }
    }
  }

  // Utility Methods
  onChangeHandler = (e) => {
    const updatedState = {
      ...this.state.formData,
      [e.target.name]: e.target.value,
    };
    this.setState({
      formData: updatedState,
    });
  };
  onSubmitHandler = async (e) => {
    this.setState({
      loading: true,
    });
    e.preventDefault();
    const FormData = {
      website: this.state.formData.website,
      location: this.state.formData.location,
      skills: this.state.formData.skills,
      github: this.state.formData.github,
      facebook: this.state.formData.facebook,
      linkedin: this.state.formData.linkedin,
      instagram: this.state.formData.instagram,
      about: this.state.formData.about,
    };
    console.log(FormData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": this.props.token,
        },
      };
      const res = await axios.post("/api/profile", FormData, config);
      console.log(res.data);
      this.setState({
        loading: false,
        error: false,
      });
      this.props.history.replace("/dashboard");
    } catch (err) {
      this.props.setAlert(
        "Couldn't add profile. Try again after sometime. ",
        "danger"
      );

      console.log(err.response);
    }
  };

  render() {
    let form = <Spinner />;
    if (!this.state.loading && !this.state.error) {
      form = (
        <div className="form-wrap">
          <h1>Profile</h1>
          <form onSubmit={this.onSubmitHandler}>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                required
                onChange={this.onChangeHandler}
                value={this.state.formData.location}
              />
            </div>
            <div className="form-group">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                name="website"
                id="website"
                onChange={this.onChangeHandler}
                value={this.state.formData.website}
              />
            </div>
            <div className="form-group">
              <label htmlFor="skills">Skills</label>
              <small>put comma "," between skills</small>
              <input
                type="text"
                name="skills"
                id="skills"
                required
                onChange={this.onChangeHandler}
                value={this.state.formData.skills}
              />
            </div>
            <div className="form-group">
              <label htmlFor="about">About</label>
              <textarea
                name="about"
                id="about"
                rows="6"
                required
                onChange={this.onChangeHandler}
                value={this.state.formData.about}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="facebook">
                <i className="fab fa-facebook-square"></i> Facebook Url
              </label>
              <input
                type="text"
                name="facebook"
                id="facebook"
                onChange={this.onChangeHandler}
                value={this.state.formData.facebook}
              />
            </div>
            <div className="form-group">
              <label htmlFor="linkedin">
                <i className="fab fa-linkedin"></i> Linkedin Url
              </label>
              <input
                type="text"
                name="linkedin"
                id="linkedin"
                onChange={this.onChangeHandler}
                value={this.state.formData.linkedin}
              />
            </div>
            <div className="form-group">
              <label htmlFor="github">
                <i className="fab fa-github"></i> Github Url
              </label>
              <input
                type="text"
                name="github"
                id="github"
                onChange={this.onChangeHandler}
                value={this.state.formData.github}
              />
            </div>
            <div className="form-group">
              <label htmlFor="instagram">
                <i className="fab fa-instagram"></i> Instagram Url
              </label>
              <input
                type="text"
                name="instagram"
                id="instagram"
                onChange={this.onChangeHandler}
                value={this.state.formData.instagram}
              />
            </div>

            <button type="submit" className="btn">
              Edit | Add Profile
            </button>
          </form>
        </div>
      );
      if (this.state.loading) {
        form = <Spinner />;
      }
      if (this.state.error) {
        form = <p className="text-center">Something went wrong </p>;
      }
    }
    return (
      <Fragment>
        <div className="container">
          <br /> <br />
          <div className="dashboard-nav">
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
        <Alert />
        <div className="container">{form}</div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps, { setAlert })(DashboardEdit);
