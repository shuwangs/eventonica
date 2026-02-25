export const getEventByCategory = (events, cat) => {
  console.log("trying to get category id:", cat);
  if (cat === "All") return events;
  return events.filter((event) => event.category === cat);
};
export const showFavorite = (events, userFavEvents) => {
  const filteredEvents = events.filter((event) => {
    return userFavEvents.some(
      (fav) => Number(fav.event_id) === Number(event.id),
    );
  });

  return filteredEvents;
};
