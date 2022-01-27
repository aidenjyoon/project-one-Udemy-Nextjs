import Head from "next/head";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../api/utils";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/ErrorAlert";

const FilteredEventPage = (props) => {
  if (props.hasError) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please check your values.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  if (props.hasEvent === false) {
    return (
      <>
        <ErrorAlert>
          <p>No Events were found for the chosen filter!</p>
        </ErrorAlert>

        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(props.numYear, props.numMonth);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={props.filteredEvents} />
    </>
  );
};

// will be using server side rendering since we don't know what date to render until user input is received
const getServerSideProps = async (context) => {
  const { params } = context;
  const filterData = params.slug;

  // loaded second time with url data
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  // check if year and month are valid (with limits)
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  // FILTER by year and month
  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  // if filateredEvents has no results or erroneous
  if (!filteredEvents || filteredEvents.length === 0) {
    return {
      props: {
        hasEvent: false,
      },
    };
  }
  return {
    props: {
      filteredEvents: filteredEvents,
      numYear: numYear,
      numMonth: numMonth - 1,
    },
  };
};

export { getServerSideProps };
export default FilteredEventPage;
