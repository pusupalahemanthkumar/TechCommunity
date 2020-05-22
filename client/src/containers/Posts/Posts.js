// Importing Required Files And Packages Here.
import React, { PureComponent } from "react";
import axios from "axios";
import { connect } from "react-redux";

import Post from "../../components/Post/Post";
import Spinner from "../../components/UI/Spinner/Spinner";
import { setAlert } from "../../actions/alert";
import Alert from "../Alert/Alert";

const token = localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    "x-auth-token": token,
  },
};

// Defining Posts Component Here.
class Posts extends PureComponent {
  state = {
    text: "",
    posts: null,
    loading: true,
    error: false,
  };

  async componentDidMount() {
    await this.fetchData();
  }

  // Utility Methods Here
  fetchData = async () => {
    this.setState({
      loading: true,
    });
    config.headers["x-auth-token"]=this.props.token;
    try {
      const res = await axios.get("/api/posts", config);
      this.setState({
        posts: res.data,
        loading: false,
        error: false,
      });
    } catch (err) {
      this.props.setAlert("Couldn't load posts. Reload the page", "danger");

      this.setState({
        loading: false,
        error: true,
      });
    }
  };

  onSubmitHandler = async (e) => {
    e.preventDefault();
    const postData = {
      text: this.state.text,
    };
    try {
      const res = await axios.post("api/posts", postData, config);
      const updatedPosts = [...this.state.posts];
      updatedPosts.unshift(res.data);

      this.setState({
        text: "",
        posts: updatedPosts,
        error: false,
      });
      this.props.setAlert("You created new posts ", "success");
    } catch (err) {
      this.props.setAlert(
        "Couldn't add posts. Try again after sometime. ",
        "danger"
      );

    }
  };
  onChangeHandler = (e) => {
    // console.log(e.target.value);
    this.setState({
      text: e.target.value,
    });
  };
  viewHandler = (postId) => {
    this.props.history.push("/posts/" + postId);
  };
  likeHandler = async (postId) => {
    try {
      const res = await axios.put("api/posts/like/" + postId, config);
      const postIndex = this.state.posts.findIndex((post, index) => {
        return post._id === postId;
      });
      const post = { ...this.state.posts[postIndex] };
      post.likes = res.data;
      const updatedPosts = [...this.state.posts];
      updatedPosts[postIndex] = post;
      this.setState({
        posts: updatedPosts,
      });
    } catch (err) {
      if (err.response.data.msg === "Post already liked") {
        return this.props.setAlert("You already liked post.", "success");
      } else {
        this.props.setAlert("some error occured.", "danger");
      }
    }
  };
  unLikeHandler = async (postId) => {
    try {
      const res = await axios.put("api/posts/unlike/" + postId, config);
      const postIndex = this.state.posts.findIndex((post, index) => {
        return post._id === postId;
      });
      const post = { ...this.state.posts[postIndex] };
      post.likes = res.data;
      const updatedPosts = [...this.state.posts];
      updatedPosts[postIndex] = post;
      this.setState({
        posts: updatedPosts,
      });
    } catch (err) {
      if ((err.response.data.msg = "Post has not yet been liked")) {
        console.log("Post has not yet been liked");
        return;
      } else {
        this.props.setAlert("some error occured.", "danger");
        // console.log(err.response);
      }
    }
  };
  deleteHandler = async (postId) => {
    try {
      await axios.delete("api/posts/" + postId, config);
      const updatedPosts = this.state.posts.filter((post, index) => {
        return post._id !== postId;
      });
      this.setState({
        posts: updatedPosts,
      });
      this.props.setAlert("You deleted a post.", "success");
    } catch (err) {
      this.props.setAlert("some error occured.", "danger");
      // console.log(err.response);
    }
  };

  render() {
    let posts = null;
    if (this.state.posts) {
      posts = this.state.posts.map((post, index) => {
        return (
          <Post
            key={post._id}
            post={post}
            likeHandler={() => this.likeHandler(post._id)}
            unLikeHandler={() => this.unLikeHandler(post._id)}
            viewHandler={() => this.viewHandler(post._id)}
            deleteHandler={() => this.deleteHandler(post._id)}
          />
        );
      });
    }

    if (this.state.loading) {
      posts = <Spinner />;
    }
    if (this.state.error) {
      posts = <p>Couldn't Load. Try again after sometime.</p>;
    }
    return (
      <div className="container py-1">
        <div className="form-wrap">
          <h2>Add Post</h2>
          <form onSubmit={this.onSubmitHandler}>
            <div className="form-group">
              <label htmlFor="text">Say Something</label>
              <textarea
                name="text"
                id="text"
                rows="7"
                required
                onChange={this.onChangeHandler}
                value={this.state.text}
              ></textarea>
            </div>
            <button type="submit" className="btn">
              Add
            </button>
          </form>
        </div>
        <br />
        <Alert />
        {posts}
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return {
    token :state.auth.token
  }
}

export default connect(mapStateToProps, { setAlert })(Posts);
