import { useState } from "react";
import styles from "./Comments.module.scss";
import CommentsList from "./CommentsList";
import NewComment from "./NewComment";

const Comments = (props) => {
  const { eventId } = props;

  const [showComment, setShowComment] = useState(false);

  const toggleCommentsHandler = () => {
    setShowComment((prevStatus) => !prevStatus);
  };

  const addCommentHandler = (commentData) => {
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <div className={styles.container}>
        <button className={styles.btn} onClick={toggleCommentsHandler}>
          {showComment ? "Hide" : "Show"} Comments
        </button>
        {showComment && <NewComment onAddComment={addCommentHandler} />}
        {showComment && <CommentsList />}
      </div>
    </>
  );
};

export default Comments;
