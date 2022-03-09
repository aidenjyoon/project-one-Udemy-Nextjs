import Head from "next/head";
import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";
import { getAllEvents } from "../../helpers/api-utils";
import styles from "../../styles/Events.module.css";

const AllEventsPage = (props) => {
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <div className={styles.filler} />
      <EventList items={props.events} />
    </>
  );
};

const getStaticProps = async () => {
  const allEvents = await getAllEvents();

  return {
    props: {
      events: allEvents,
    },
    revalidate: 1800,
  };
};

export { getStaticProps };
export default AllEventsPage;
