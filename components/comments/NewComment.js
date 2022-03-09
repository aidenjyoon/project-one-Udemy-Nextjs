import { useRef, useState } from "react";
import styles from "./NewComment.module.scss";

const NewComment = (props) => {
  const [isInvalid, setIsInvalid] = useState(true);

  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();

  // sending param back up to parent
  const submitHandler = (events) => {
    events.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredComment = commentInputRef.current.value;

    props.onAddComment({
      email: enteredEmail,
      name: enteredName,
      comment: enteredComment,
    });
  };

  return (
    <>
      <form className={styles.form}>
        <div className={styles.row}>
          <div className={styles.control}>
            <label htmlFor="email">Your email</label>
            <input type="email" id="email" ref={emailInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" ref={nameInputRef} />
          </div>
        </div>

        <div className={styles.control}>
          <label htmlFor="comment">Your Comment</label>
          <textarea id="comment" rows="5" ref={commentInputRef} />
        </div>
        {isInvalid && <p>Please enter a valid email address and comment!</p>}

        <button onClick={submitHandler}>Submit</button>
      </form>
    </>
  );
};

export default NewComment;
