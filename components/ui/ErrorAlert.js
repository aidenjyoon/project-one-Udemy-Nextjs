import classes from "./ErrorAlert.module.scss";

function ErrorAlert(props) {
  return <div className={classes.alert}>{props.children}</div>;
}

export default ErrorAlert;
