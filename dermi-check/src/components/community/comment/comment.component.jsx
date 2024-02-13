import { Fragment, useContext, useEffect, useState } from "react";
import "./comment.styles.css";
import { motion, useAnimation } from "framer-motion";
import axios from "axios";
import { UserContext } from "../../../contexts/user.context";

const Comment = ({ Data, idPost , handleDelete }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [dynamicData, setDynamicData] = useState(Data);
  const [replyState, setReplyState] = useState(false);
  const handleReply = () => {
    setReplyState(!replyState);
  };
  const [replyData, setReplyData] = useState(null);
  const replyChange = (e) => {
    setReplyData(e.target.value);
  };
  const handleReplySubmission = async (e) => {
    e.preventDefault();
    document.getElementsByClassName(`${Data._id}`)[0].value = "";
    const { data } = await axios.post(
      `http://localhost:8000/api/comment/${currentUser._id}?parentId=${Data._id}`,
      { data: replyData },
      { withCredentials: true }
    );
    setDynamicData(data.parent);
  };

  const handleLike = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `http://localhost:8000/api/like/${Data._id}`,
      { data: null },
      { withCredentials: true }
    );
    setDynamicData(data.comment);
  };

  const handleCommentDelete = async () => {
    const endPoint = (idPost) ? `http://localhost:8000/api/delete/comment/${Data._id}?postId=${idPost}` : `http://localhost:8000/api/delete/comment/${Data._id}`;
    const deleted = await axios.post(endPoint , {data : null} , {withCredentials : true});
    handleDelete();
    // setDynamicData(null);
  }

  if (dynamicData) {
    return (
      <Fragment>
        <details className="comment" id={Data._id} style={{ marginTop: "5%" }}>
          <a href={`#${Data._id}`} className="comment-border-link">
            <span className="sr-only">Jump to comment-1</span>
          </a>
          <summary>
            <div className="comment-heading">
              <div className="comment-voting">
                <button type="button" onClick={handleLike}>
                  👍
                </button>
                {/* <button type="button">
                  <span aria-hidden="true">👍</span>
                  <span className="sr-only">Vote Up</span>
                </button>
                <button type="button">
                  <span aria-hidden="true">🥲</span>
                  <span className="sr-only">Vote Down</span>
                </button> */}
              </div>
              <div className="comment-info">
                <div className="comment-author">{Data.author.username}</div>
                <p className="m-0"> {dynamicData.likes?.length} likes</p>
              </div>
            </div>
          </summary>
          <div
            className="comment-body"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div
              className="first-line"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p className="">{Data.data}</p>
              <div
              onClick={handleCommentDelete}
              className="dustbin"
                style={{
                  borderRadius : "6px" ,
                  width : "6%",
                  boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                🗑️
              </div>
            </div>
            <button
              type="button"
              onClick={handleReply}
              data-toggle="reply-form"
              data-target={`${Data._id}-reply-form`}
              style={{ width: "10%" }}
            >
              Reply
            </button>
          </div>
          <div className="replies">
            {dynamicData?.replies?.map((e) => {
              console.log(handleDelete);
              return <Comment Data={e} idPost={idPost} handleDelete={handleDelete}  />;
            })}
          </div>
          <motion.form
            action=""
            className="reply-form"
            id={`${Data._id}-reply-form`}
            style={{
              display: replyState ? "block" : "none",
              backgroundColor: "white !important",
            }}
          >
            <textarea
              className={`${Data._id}`}
              placeholder={`reply to ${Data.author.username}`}
              rows="4"
              onChange={replyChange}
            ></textarea>
            <button type="submit" onClick={handleReplySubmission}>
              Submit
            </button>
            <button
              type="button"
              data-toggle="reply-form"
              onClick={handleReply}
              data-target={`${Data._id}-reply-form`}
            >
              Cancel
            </button>
          </motion.form>
        </details>
      </Fragment>
    );
  }
};

export default Comment;