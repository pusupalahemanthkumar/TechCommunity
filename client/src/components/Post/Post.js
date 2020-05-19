// Importing Required Files And Packages Here.
import React from "react";

// Defining Post Component Here.
const Post = (props) => {
  const userId = 1;
  const liked = props.post.likes.find((like, index) => {
    return like.user.toString() === userId.toString();
  });
  let likedStyle = null;
  if (liked) {
    likedStyle = {
      color: "red",
    };
  }
  return (
    <div className="card post">
      <div className="intro">
        <div className="intro-img">
          <img src={props.post.avatar} alt={props.post.name} />
        </div>
        <h3>{props.post.name}</h3>
      </div>
      <div className="post-content">
        <p>{props.post.text}</p>
        <div className="post-control-section">
          <span onClick={props.likeHandler}>
            <i className="fas fa-heart" style={likedStyle}></i>
            {props.post.likesCount}
          </span>
          <span onClick={props.viewHandler}>
            <i className="fas fa-comments"></i>
            {props.post.commentsCount}
          </span>
          <span onClick={props.viewHandler}>
            <i className="fas fa-eye"></i>
          </span>
          {userId.toString() === props.post._id.toString() ? (
            <span onClick={props.viewHandler}>
              <i
                className="fas fa-times-circle fa-2x"
                style={{
                  color: "red",
                }}
              ></i>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Post;
