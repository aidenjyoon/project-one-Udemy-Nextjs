import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../api/utils";

const HomePage = (props) => {
  return (
    <div>
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
