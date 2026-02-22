import React from "react";
import Table from "react-bootstrap/Table";
import EventDisplayCard from "./EventDisplayCard";
import "./EventDisplayCard.css";

const UserEventList = ({ events, userFavEvents, onToggleFavorite }) => {
  if (!events || events.length === 0) {
    return <p>No events available</p>;
  }
  return (
    <div className="user-event-list">
      {events.map((event) => (
        <EventDisplayCard
          key={event.id}
          event={event}
          isFav={userFavEvents.some((f) => f.event_id === event.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default UserEventList;
