import styles from "./CommentsList.module.scss";

const CommentsList = (props) => {
  return (
    <ul className={styles.comments}>
      {props.items.map((item) => {
        return (
          <li key={item.id}>
            <p>{item.comment}</p>
            <div>
              By <address>{item.name}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CommentsList;
