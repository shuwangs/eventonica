import React, { useState, useEffect } from "react";
import UserRegisterForm from "../components/UserRegisterForm";
import EventList from "../components/EventList";
import EventForm from "../components/EventForm.jsx";
import fakeEvents from "../components/hardCodedEventsList.js";

const ManagerPage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEventForm, setShowEventFrom] = useState(false);
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events").then();
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      console.log(`fetched data is: ${data}`);
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addEvent = () => {
    setShowEventFrom(true);
  };

  const handleCreateEvent = () => {
    console.log("handle create event");
  };

  return (
    <div className="manager-page">
      <h1>Manager Page</h1>
      <button onClick={addEvent}>+ Add Event</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}
      {/* 弹窗 */}
      {showEventForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Event</h2>
            <EventForm eventOnSubmit={handleCreateEvent} />
            <button onClick={() => setShowEventFrom(false)}>Cancel</button>
          </div>
        </div>
      )}

      <EventList events={events} />
    </div>
  );
};

export default ManagerPage;
