import React from "react";
import "./EventDisplayCard.css";

const EventDisplayCard = ({ event }) => {
  return (
    <div className="event-card">
      <div className="event-display-header">
        <span className="text-2xl">{event.category}</span>
        <button className="heart-btn text-2xl">
          {event.isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      <h3>{event.name || "Untitled Event"}</h3>
      <p>{event.description || "No description available"}</p>
      <div className="time-display">
        <span>🗓️</span>
        {event.event_date_time.toLocaleString()}
      </div>

      <div className="display-location">
        <span>📍</span>
        {event.location}
      </div>
    </div>
  );
};

export default EventDisplayCard;
