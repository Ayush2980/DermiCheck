import "./comments.styles.css";
import { motion, useAnimation, Variants } from "framer-motion";
import { Fragment, useContext, useEffect, useState } from "react";
import { CommentContext } from "../../../contexts/comment.context";
import Comment from "../comment/comment.component";
import axios from "axios";
import { UserContext } from "../../../contexts/user.context";

const Comments = ({ handleClick, commentArray, postId }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [parentComment, setParentComment] = useState(null);
  const [commentArrayDynamic, setCommentArrayDynamic] = useState(commentArray);

  const handleTextAreaChange = (e) => {
    setParentComment(e.target.value);
    console.log(currentUser._id);
  };
  const handleParentCommentSubmit = async () => {
    document.getElementsByClassName(currentUser._id)[0].value = "";
    const { data } = await axios.post(
      `http://localhost:8000/api/comment/${currentUser._id}?postId=${postId}`,
      { data: parentComment },
      { withCredentials: true }
    );
    setCommentArrayDynamic(data.parent.comments);
  };
  const handleDelete = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/fetch/${postId}`,
        { data: null },
        { withCredentials: true }
      );
      const { comment } = data;
      setCommentArrayDynamic(comment);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Fragment>
      <div
        className="comment-thread justify-content-between"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          className="top-bar justify-content-between"
          style={{ zIndex: "2", display: "flex", flexDirection: "row" }}
        >
          <h3 className="">Comments</h3>
          <button className="btn btn-danger" onClick={handleClick}>
            X
          </button>
        </div>
        <div className="comment-container" style={{ overflowY: "scroll" }}>
          {commentArrayDynamic?.map((e) => {
            return (
              <Comment Data={e} handleDelete={handleDelete} idPost={postId} />
            );
          })}
        </div>
        <div className="comment-area d-flex flex-row">
          <textarea
            name=""
            id=""
            cols="60"
            rows="1"
            style={{ resize: "none" }}
            onChange={handleTextAreaChange}
            className={`${currentUser._id}`}
          ></textarea>
          <div
            className="btn btn-primary send-btn"
            onClick={handleParentCommentSubmit}
          >
            Send
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Comments;
