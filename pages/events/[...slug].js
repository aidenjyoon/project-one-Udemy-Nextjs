import Head from "next/head";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/ErrorAlert";

const FilteredEventPage = () => {
  const router = useRouter();

  const filterData = router.query.slug;

  // for when site is first loaded and we don't have the url data yet.
  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

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

  // FILTER by year and month
  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  // if filateredEvents has no results or erroneous
  if (!filteredEvents || filteredEvents.length === 0) {
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

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

export default FilteredEventPage;
