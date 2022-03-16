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
  }, [showComments, comments, eventId]);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  // TODO:
  // reload the comments after new comments are sent.
  // i think i'd have to setShowComments again

  // add comment to db
  const addCommentHandler = (commentData) => {
    try {
      // pending notification
      notificationCtx.showNotification({
        title: "Pending...",
        message: "Comment is being uploaded...",
        status: "pending",
      });

      // fetch comments from db
      fetch("/api/comments/" + eventId, {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // success notification
          notificationCtx.showNotification({
            title: "Success!",
            message: "Comment has been saved in the database.",
            status: "success",
          });

          console.log(comments.length);
        });
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error",
        message: error.message || "Something is wrong.",
        status: "error",
      });
    }
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
