const getAllEvents = async () => {
  const response = await fetch(
    "https://nextjs-course-b7e4b-default-rtdb.firebaseio.com/events.json"
  );

  const jsonData = await response.json();

  const events = [];
  for (const key in jsonData) {
    events.push({
      id: key,
      ...jsonData[key],
    });
  }

  return events;
};

const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();

  const featuredEvents = allEvents.filter((event) => event.isFeatured);
  return featuredEvents;
};

const getFilteredEvents = async (dateFilter) => {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
  // console.log(filteredEvents);
  return filteredEvents;
};

export { getAllEvents, getFeaturedEvents, getFilteredEvents };
