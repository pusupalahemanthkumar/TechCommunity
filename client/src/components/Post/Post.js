// Importing Required Files And Packages Here.
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Defining Post Component Here.
const Post = (props) => {
  let userId;
  if (!props.auth.loading) {
    userId = props.auth.user._id;
  }
  // console.log(props.auth.user._id);
  let liked = null;
  if (props.post.likes) {
    liked = props.post.likes.find((like, index) => {
      return like.user === userId;
    });
  }

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
        <h3 style={{ textAlign: "center" }}>{props.post.name}</h3>
      </div>
      <div className="post-content p-1">
        <p>{props.post.text}</p>
        <div className="post-control-section">
          <span onClick={props.likeHandler}>
            <i className="fas fa-thumbs-up" style={likedStyle}></i>
            {props.post.likes ? props.post.likes.length : 0}
          </span>
          <span onClick={props.unLikeHandler}>
            <i className="fas fa-thumbs-down"></i>
          </span>
          <span onClick={props.viewHandler}>
            <i className="fas fa-comments"></i>
            {props.post.comments ? props.post.comments.length : 0}
          </span>

          {userId === props.post.user ? (
            <span onClick={props.deleteHandler}>
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

Post.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Post);
