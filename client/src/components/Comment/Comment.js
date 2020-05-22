// Importing Required Files And Packages Here.
import React from "react";
import { connect } from "react-redux";

// Defining Comment Component Here.
const Comment = (props) => {
  let userId;
  if (!props.auth.loading) {
    userId = props.auth.user._id;
  }

  return (
    <div className="comment">
      <div className="intro ">
        <div className="comment-img">
          <img src={props.comment.avatar} alt={props.comment.name} />
        </div>
        <div className="text-center">
          <p>{props.comment.name}</p>
        </div>
      </div>
      <div className="post-content">
        <p>{props.comment.text}</p>
      </div>
      {userId === props.comment.user ? (
        <div>
          <span onClick={props.deleteCommentHandler}>
            <i
              className="fas fa-times-circle fa-2x"
              style={{
                color: "red",
              }}
            ></i>
          </span>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    loading: state.loading,
  };
};

export default connect(mapStateToProps)(Comment);
