import { useEffect, useState, useContext } from "react";
import NotificationContext from "../../store/notificationContext";
import styles from "./Comments.module.scss";
import CommentsList from "./CommentsList";
import NewComment from "./NewComment";

const Comments = (props) => {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  const notificationCtx = useContext(NotificationContext);

  // Gets comments from database
  useEffect(() => {
    setIsFetchingComments(true);

    if (showComments) {
      try {
        fetch("/api/comments/" + eventId)
          .then((response) => response.json())
          .then((data) => {
            setComments(data.comments);
          });
      } catch (error) {
        notificationCtx.showNotification({
          title: "Error",
          message: "Problem getting the comments...",
          status: "error",
        });
      }
      setIsFetchingComments(false);
    }
  }, [notificationCtx, showComments, eventId]);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => {
      return !prevStatus;
    });
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

      // add comments to db
      fetch("/api/comments/" + eventId, {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          // success notification
          notificationCtx.showNotification({
            title: "Success!",
            message: "Comment has been saved in the database.",
            status: "success",
          });
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
        {showComments && !isFetchingComments && (
          <CommentsList items={comments} />
        )}
        {showComments && isFetchingComments && <p>Loading...</p>}
      </div>
    </>
  );
};

export default Comments;
