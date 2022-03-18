import styles from "./CommentsList.module.scss";

const CommentsList = (props) => {
  const { items } = props;

  return (
    <ul className={styles.comments}>
      {items.map((item) => {
        return (
          <li key={item._id}>
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
