import { useEffect, useState, useContext } from "react";
import NotificationContext from "../../store/notificationContext";
import styles from "./Comments.module.scss";
import CommentsList from "./CommentsList";
import NewComment from "./NewComment";

const Comments = (props) => {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const notificationCtx = useContext(NotificationContext);

  // Gets comments from database
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

  // add comment to db
  const addCommentHandler = (commentData) => {
    try {
      notificationCtx.showNotification({
        title: "Pending...",
        message: "Comment is being uploaded...",
        status: "pending",
      });

      fetch("/api/comments/" + eventId, {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          notificationCtx.showNotification({
            title: "Success!",
            message: "Comment has been saved in the database.",
            status: "success",
          });
        });
    } catch (error) {}
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
