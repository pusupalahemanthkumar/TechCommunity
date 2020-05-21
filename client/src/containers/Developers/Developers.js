import React, { Component } from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import Spinner from "../../components/UI/Spinner/Spinner";

class Developers extends Component {
  state = {
    developers: null,
    loading: true,
    error: false,
  };
  async componentDidMount() {
    try {
      const res = await axios.get("/api/profile");
      this.setState({
        developers: res.data,
        loading: false,
      });
    } catch (err) {
      console.log(err.response);
    }
  }
  render() {
    let data = <Spinner />;
    if (!this.state.loading && this.state.developers) {
      data = this.state.developers.map((dev) => {
        return (
          <div className="card" key={dev._id}>
            <div className="intro">
              <div className="intro-img">
                <img src={dev.user.avatar} alt={dev.user.name} />
              </div>
              <h3 className="text-center">{dev.user.name}</h3>
            </div>
            <div className="p-1">
              <p>{dev.about}</p>
              <div className="text-center">
                <Link to={`/developers/${dev.user._id}`} className="btn">
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <div className="container py-1">
        <br /> <br />
        {data}
      </div>
    );
  }
}

export default Developers;
