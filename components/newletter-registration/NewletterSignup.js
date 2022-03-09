import { useRef } from "react";

import styles from "./NewletterSignup.module.scss";

const NewletterSignup = () => {
  const emailInputRef = useRef();

  const registrationHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    const reqBody = { email: enteredEmail };

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => console.log("THIS IS IN INDEX: ", data));
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
