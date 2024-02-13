import { Fragment, useContext, useEffect, useState } from "react";
import "./card.styles.css";
import { motion, useAnimation } from "framer-motion";
import Comments from "../comments/comments.component";

const BlogCard = ({ data }) => {
  // const postData = {author : "Ayush" , title : "H" , body : "NOOOO" , comments : 2 , likes : 0}
  //Checking screen Width
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.matchMedia("(max-width: 800px)").matches
  );

  const handleScreenSizeChange = (event) => {
    setIsSmallScreen(event.matches);
    console.log(event.matches);
  };

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(max-width: 800px)");
    handleScreenSizeChange(mediaQueryList);
    mediaQueryList.addListener(handleScreenSizeChange);
    return () => {
      mediaQueryList.removeListener(handleScreenSizeChange);
    };
  }, []);

  //Animation part
  const [comment, setComment] = useState(false);
  const handleClick = () => {
    setComment(!comment);
    console.log("Comment done", comment);
  };
  const mainControls = useAnimation();
  const commentControls = useAnimation();
  //Handling the initial case
  useEffect(() => {
    const runAnimations = async () => {
      if (isSmallScreen) {
        await mainControls.start({ opacity: 0 });
        await mainControls.start({ opacity: 1 });
      } else {
        await mainControls.start({ opacity: 0, x: 0 });
        await mainControls.start({ opacity: 1, x: 200 });
      }
    };
    runAnimations();
  }, [isSmallScreen]);
  //Handling the animations

  useEffect(() => {
    const runCommentAnimations = async () => {
      if (comment) {
        //Opening of comment modal
        if (isSmallScreen) {
          //small screen comment open anim
          const upMotion = async () => {
            mainControls.start({ opacity: 0.5, zIndex: 0 });
            commentControls.start({ x: 10, y: -500, opacity: 1, zIndex: 1 });
          };
          await upMotion();
        } else {
          //big screen comment open anim
          const oppositeMovement = async () => {
            mainControls.start({
              x: -50,
              zIndex: 0,
              opacity: 0.5,
              width: "30vw",
            });
            commentControls.start({
              x: 25,
              y: -40,
              opacity: 0.5,
              width: "50vw",
            });
          };
          const sameSideMovement = async () => {
            mainControls.start({
              x: 0,
              zIndex: -1,
              opacity: 0.5,
              width: "38vw",
            });
            commentControls.start({
              x: -50,
              y: -40,
              opacity: 1,
              width: "54vw",
            });
          };
          await oppositeMovement();
          await sameSideMovement();
        }
      } else {
        //Closiing of comment modal
        if (isSmallScreen) {
          const downMotion = async () => {
            commentControls.start({ x: 0, opacity: 0, y: 0, zIndex: 0 });
            mainControls.start({ opacity: 1, zIndex: 1 });
          };
          await downMotion();
        } else {
          const oppositeMovement = async () => {
            mainControls.start({
              x: -50,
              zIndex: 1,
              opacity: 0.5,
              width: "30vw",
            });
            commentControls.start({ x: 25, opacity: 0.5, width: "50vw" });
          };
          const sameSideMovement = async () => {
            mainControls.start({
              x: 200,
              zIndex: 1,
              opacity: 1,
              width: "50vw",
            });
            commentControls.start({ x: 0, opacity: 0, width: "30vw" });
          };
          await oppositeMovement();
          await sameSideMovement();
        }
      }
    };
    runCommentAnimations();
  }, [comment]);
  return (
    <Fragment>
      <motion.div
        variants={{ smallMount: { x: 0 }, bigMount: { x: 200 } }}
        style={{ opacity: 0 }}
        animate={mainControls}
        transition={{ duration: 1 }}
        className="card-cont col-10 col-md-6"
      >
        <div className="card text-center">
          <div className="card-header">{data.author.username}</div>
          <div className="card-body">
            <h5 className="card-title">{data.title}</h5>
            <p className="card-text">{data.body}</p>
            <a
              className="btn"
              style={{ backgroundColor: "#10c3a5", color: "white" }}
              onClick={handleClick}
            >
              Comments
            </a>
          </div>
          <div className="card-footer text-body-secondary">2 days ago</div>
        </div>
      </motion.div>
      <motion.div
        animate={commentControls}
        transition={{ duration: 1 }}
        className="col-10 col-md-5 card-cont-2"
        style={{ opacity: 0, height: "60vh" }}
      >
        <Comments handleClick={handleClick} commentArray={data.comments} postId={data._id} />
      </motion.div>
    </Fragment>
  );
};

export default BlogCard;
