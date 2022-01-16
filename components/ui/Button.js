import Link from "next/link";

import styles from "./Button.module.scss";

const Button = (props) => {
  if (props.link !== undefined) {
    return (
      <Link href={props.link}>
        <a className={styles.btn}>{props.children}</a>
      </Link>
    );
  }
  return (
    <button className={styles.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
