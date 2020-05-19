// Importing Required Files And Packages Here.
import React, { Component } from "react";

import Post from "../../components/Post/Post";
// Defining Posts Component Here.
class Posts extends Component {
  state = {
    text: "",
    posts: [
      {
        _id: "1",
        avatar:
          "https://mk0abtastybwtpirqi5t.kinstacdn.com/wp-content/uploads/anthony-brebion.jpg",
        name: "Hemanth kumar",
        text: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod
                eveniet asperiores ullam, quis culpa magni ad molestiae officia ea
                atque!`,
        likes: [
          {
            user: "1",
            _id: "123",
          },
          {
            user: "2",
            _id: "124",
          },
        ],
        likesCount: 4,
        commentsCount: 5,
      },
      {
        _id: "2",
        avatar:
          "https://mk0abtastybwtpirqi5t.kinstacdn.com/wp-content/uploads/anthony-brebion.jpg",
        name: "Hemanth kumar",
        text: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod
                eveniet asperiores ullam, quis culpa magni ad molestiae officia ea
                atque!`,
        likes: [
          {
            user: "2",
            _id: "123",
          },
          {
            user: "2",
            _id: "124",
          },
        ],
        likesCount: 10,
        commentsCount: 8,
      },
    ],
  };

  // Utility Methods Here
  onSubmitHandler = (e) => {
    e.preventDefault();
    const postData = {
      _id: Math.random().toString(),
      avatar:
        "https://mk0abtastybwtpirqi5t.kinstacdn.com/wp-content/uploads/anthony-brebion.jpg",
      name: "Hemanth kumar",
      text: this.state.text,
      likes: [
          {
              user:"1",
              _id:"34"
          }
      ],
      likesCount: 0,
      commentsCount: 0,
    };
    console.log(postData);
    const updatedPosts = this.state.posts;
    updatedPosts.unshift(postData);
    this.setState({
      posts: updatedPosts,
    });
  };
  onChangeHandler = (e) => {
    // console.log(e.target.value);
    this.setState({
      text: e.target.value,
    });
  };
  viewHandler=(postId)=>{
      console.log(postId);
      this.props.history.push("/posts/"+postId);

  }
  likeHandler=(postId)=>{
    console.log(postId,"Post Liked");

  }

  render() {
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
        {this.state.posts.map((post, index) => {
          return <Post key={post._id} post={post} 
          likeHandler={()=>this.likeHandler(post._id)}
          viewHandler={()=>this.viewHandler(post._id)} />;
        })}
      </div>
    );
  }
}

export default Posts;
