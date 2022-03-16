import { useRef, useContext } from "react";
import NotificationContext from "../../store/notificationContext";

import styles from "./NewletterSignup.module.scss";

const NewletterSignup = () => {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  const registrationHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    const reqBody = { email: enteredEmail };

    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter.",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something wwent wrong");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully registered for newsletter!",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "something went wrong",
          status: "error",
        });
      });
  };

  return (
    <>
      <section className={styles.signup}>
        <h2>Sing up to stay updated!</h2>
        <div className={styles.formContainer}>
          <form onSubmit={registrationHandler}>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              ref={emailInputRef}
            />
            <button className={styles.btn} link="/">
              Register
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default NewletterSignup;
