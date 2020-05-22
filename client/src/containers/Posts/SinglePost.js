// Importing Required Files And Packages Here.
import React, { PureComponent } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Alert from "../Alert/Alert";
import { setAlert } from "../../actions/alert";

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
      config.headers["x-auth-token"] = this.props.token;
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
      config.headers["x-auth-token"] = this.props.token;
      const res = await axios.post(
        "/api/posts/comment/" + this.state.post._id,
        commentData,
        config
      );
      const updatedPost = { ...this.state.post };
      updatedPost.comments = res.data;
      this.setState({
        post: updatedPost,
        text: "",
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

  deleteCommentHandler = async (commentId) => {
    const postId = this.state.post._id;
    try {
      config.headers["x-auth-token"] = this.props.token;
      const res = await axios.delete(
        `/api/posts/comment/${postId}/${commentId}`,
        config
      );
      const updatedPost = { ...this.state.post };
      updatedPost.comments = res.data;
      this.setState({
        post: updatedPost,
      });

      this.props.setAlert("You deleted a comment", "success");
    } catch (err) {
      console.log(err.response.data);
    }
  };
  likeHandler = async () => {
    const postId = this.state.post._id;
    try {
      config.headers["x-auth-token"] = this.props.token;
      const res = await axios.put(`/api/posts/like/${postId}/`, config);
      const updatedPost = { ...this.state.post };
      updatedPost.likes = res.data;
      this.setState({
        post: updatedPost,
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };
  unLikeHandler = async () => {
    const postId = this.state.post._id;
    try {
      config.headers["x-auth-token"] = this.props.token;
      const res = await axios.put(`/api/posts/unlike/${postId}/`, config);
      const updatedPost = { ...this.state.post };
      updatedPost.likes = res.data;
      this.setState({
        post: updatedPost,
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };
  deleteHandler = async () => {
    const postId = this.state.post._id;
    try {
      config.headers["x-auth-token"] = this.props.token;
      await axios.delete(`/api/posts/${postId}/`, config);
      this.props.setAlert("You Deleted a Post", "success");
      this.props.history.replace("/posts");
    } catch (err) {
      console.log(err.response.data);
    }
  };
  render() {
    let comments = null;
    if (!this.state.loading && this.state.post && this.state.post.comments) {
      comments = this.state.post.comments.map((comment, index) => {
        return (
          <Comment
            key={comment._id}
            comment={comment}
            deleteCommentHandler={() => this.deleteCommentHandler(comment._id)}
          />
        );
      });
    }
    return (
      <div className="container py-1">
        <br />
        <br />
        {!this.state.loading ? (
          <Post
            post={this.state.post}
            likeHandler={this.likeHandler}
            unLikeHandler={this.unLikeHandler}
            deleteHandler={this.deleteHandler}
          />
        ) : (
          <Spinner />
        )}

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
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps, { setAlert })(SinglePost);
