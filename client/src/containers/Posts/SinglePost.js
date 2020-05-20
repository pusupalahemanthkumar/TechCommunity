// Importing Required Files And Packages Here.
import React, { PureComponent } from "react";
import axios from "axios";
import {connect} from "react-redux";
import Alert from "../Alert/Alert";
import {setAlert} from "../../actions/alert";

import Comment from "../../components/Comment/Comment";
import Post from "../../components/Post/Post";
import Spinner from "../../components/UI/Spinner/Spinner";

const token = localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    "x-auth-token": token,
  },
};

// Defining SinglePost Component Here.
class SinglePost extends PureComponent {
  state = {
    text: "",
    post: null,
    loading: true,
  };
  componentDidMount() {
    this.fetchData();
  }
  // Utility Methods Here
  fetchData = async () => {
    this.setState({
      loading: true,
    });
    try {
      const res = await axios.get(
        `/api/posts/${this.props.match.params.postId}`,
        config
      );
      this.setState({
        post: res.data,
        loading: false,
      });
    } catch (err) {
      this.props.history.replace("/posts");
      console.log(err.response);
      this.setState({
        loading: false,
      });
    }
  };

  onSubmitHandler = async (e) => {
    e.preventDefault();
    const commentData = {
      text: this.state.text,
    };
    try {
      const res = await axios.post(
        "/api/posts/comment/" + this.state.post._id,
        commentData,
        config
      );
      const updatedPost = { ...this.state.post };
      updatedPost.comments = res.data;
      this.setState({
        post: updatedPost,
        text: ""
      });
      this.props.setAlert("You add a comment", "success");
    } catch (err) {
      console.log(err.response.data);
    }
  };
  onChangeHandler = (e) => {
    // console.log(e.target.value);
    this.setState({
      text: e.target.value,
    });
  };
  render() {
    let comments = null;
    console.log(this.state.post);
    if (!this.state.loading && this.state.post && this.state.post.comments) {
      comments = this.state.post.comments.map((comment, index) => {
        return <Comment key={comment._id} comment={comment} />;
      });
    }
    return (
      <div className="container py-1">
        <br />
        <br />
        {!this.state.loading ? <Post post={this.state.post} /> : <Spinner />}

        <br />
        <div className="form-wrap">
          <h2>Add Comment</h2>
          <form onSubmit={this.onSubmitHandler}>
            <div className="form-group">
              <label htmlFor="text">Say Something</label>
              <textarea
                name="text"
                id="text"
                rows="5"
                value={this.state.text}
                onChange={this.onChangeHandler}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn">
              Add
            </button>
          </form>
        </div>
        <br />
        <Alert />
        <h3>Comments</h3>
        {comments}
      </div>
    );
  }
}

export default connect(null,{setAlert})(SinglePost)
