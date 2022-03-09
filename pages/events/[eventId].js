import Head from "next/head";
import { useRouter } from "next/router";
import { getAllEvents, getFeaturedEvents } from "../../helpers/api-utils";
import EventSummary from "../../components/event-detail/EventSummary";
import EventLogistics from "../../components/event-detail/EventLogistics";
import EventContent from "../../components/event-detail/EventContent";
import ErrorAlert from "../../components/ui/ErrorAlert";
import Button from "../../components/ui/button";
import Comments from "../../components/comments/Comments";

const EventDetailPage = (props) => {
  const router = useRouter();
  const eventId = router.query.eventId;
  const event = props.selectedEvent;

  if (!event) {
    return (
      <>
        <ErrorAlert>
          <p>No event found!</p>
        </ErrorAlert>

        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>

      <Comments eventId={eventId} />
    </>
  );
};

// use static generation with getStaticProps && getStaticPaths for  limiited amount of sites (featured ones). this way we get the best of both worlds of fast loading with static and server side rendering for less visited sites

const getStaticProps = async (context) => {
  const allEvents = await getAllEvents();
  const { eventId } = context.params;

  const selectedEvent = allEvents.find((event) => event.id === eventId);

  // console.log(selectedEvent);

  return {
    props: {
      selectedEvent: selectedEvent,
    },
    revalidate: 30,
  };
};

const getStaticPaths = async () => {
  const allEvents = await getFeaturedEvents();
  const paths = allEvents.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
};

export { getStaticProps, getStaticPaths };
export default EventDetailPage;
