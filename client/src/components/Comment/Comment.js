// Importing Required Files And Packages Here.
import React from "react";

// Defining Comment Component Here.
const Comment = (props) => {
  return (
    <div className="comment">
      <div className="intro">
        <div className="comment-img">
          <img src={props.comment.avatar} alt={props.comment.name} />
        </div>
        <h3>{props.comment.name}</h3>
      </div>
      <div className="post-content">
        <p>{props.comment.text}</p>
      </div>
    </div>
  );
};

export default Comment;
