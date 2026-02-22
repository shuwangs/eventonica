import React from "react";
import Table from "react-bootstrap/Table";
import EventDisplayCard from "./EventDisplayCard";
import "./EventDisplayCard.css";
const UserEventList = ({ events }) => {
  if (!events || events.length === 0) {
    return <p>No events available</p>;
  }
  return (
    <div className="user-event-list">
      {events.map((event) => (
        <EventDisplayCard event={event} />
      ))}
    </div>
  );
};

export default UserEventList;
