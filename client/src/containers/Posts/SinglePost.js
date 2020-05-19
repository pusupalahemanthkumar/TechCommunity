// Importing Required Files And Packages Here.
import React, { Component } from "react";

import Comment from "../../components/Comment/Comment";
import Post from "../../components/Post/Post";
// Defining SinglePost Component Here.
class SinglePost extends Component {
  state = {
    text: "",
    comments: [
      {
        _id: 1,
        avatar:
          "https://mk0abtastybwtpirqi5t.kinstacdn.com/wp-content/uploads/anthony-brebion.jpg",
        name: "Hemanth Kumar",
        text: `
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod
            eveniet asperiores ullam, quis culpa magni ad molestiae officia ea
            atque!`,
      },
      {
        _id: 2,
        avatar:
          "https://mk0abtastybwtpirqi5t.kinstacdn.com/wp-content/uploads/anthony-brebion.jpg",
        name: "Sanjay",
        text: `
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod
            eveniet asperiores ullam, quis culpa magni ad molestiae officia ea
            atque!`,
      },
    ],
    post: {
      _id: 1,
      avatar:
        "https://mk0abtastybwtpirqi5t.kinstacdn.com/wp-content/uploads/anthony-brebion.jpg",
      name: "Hemanth Kumar",
      text: `
         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod
         eveniet asperiores ullam, quis culpa magni ad molestiae officia ea
         atque!
         `,
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
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    const commentData = {
      _id: Math.random().toString(),
      avatar:
        "https://mk0abtastybwtpirqi5t.kinstacdn.com/wp-content/uploads/anthony-brebion.jpg",
      name: "Hemanth Kumar",
      text: this.state.text,
    };
    console.log(commentData);
    const updatedState= this.state.comments;
    updatedState.unshift(commentData);
    this.setState({
        comments: updatedState
    })
  };
  onChangeHandler = (e) => {
    // console.log(e.target.value);
    this.setState({
      text: e.target.value,
    });
  };
  render() {
    return (
      <div className="container py-1">
        <br />
        <br />
        <Post post={this.state.post} />
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
        <h3>Comments</h3>
        {this.state.comments.map((comment, index) => {
          return <Comment key={comment._id} comment={comment} />;
        })}
      </div>
    );
  }
}

export default SinglePost;
