import Head from "next/head";

import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helpers/api-utils";
import styles from "../styles/Home.module.css";
import NewletterSignup from "../components/newletter-registration/NewletterSignup";

const HomePage = (props) => {
  return (
    <div>
      <NewletterSignup />
      <Head>
        <title>NextJS Meetup</title>
        <meta name="description" content="Find a lot of great events"></meta>
      </Head>
      <div className={styles.header}>
        <h1 className={styles.h1}>Featured Events</h1>
      </div>
      <EventList items={props.events} />
    </div>
  );
};

const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
};

export { getStaticProps };
export default HomePage;
