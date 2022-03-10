import { useEffect, useState } from "react";
import styles from "./Comments.module.scss";
import CommentsList from "./CommentsList";
import NewComment from "./NewComment";

const Comments = (props) => {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      fetch("/api/comments/" + eventId)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
        });
    }
  }, [showComments, eventId]);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
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
          {showComments ? "Hide" : "Show"} Comments
        </button>
        {showComments && <NewComment onAddComment={addCommentHandler} />}
        {showComments && <CommentsList items={comments} />}
      </div>
    </>
  );
};

export default Comments;
