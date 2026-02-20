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
   

    <div className="search-container">
      <button 
        onClick={addEvent} className="btn-primary">+ Add Event</button>
        <input type="text" id="userSearchInput" placeholder="Search events..." className="search-input" />
    </div>

      {loading && <p>Loading...</p>}
      {/* Popup Window */}
      {showEventForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Event</h2>
            <EventForm eventOnSubmit={handleCreateEvent} />
            <button onClick={() => setShowEventFrom(false)} className = "btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      <EventList events={events} />
    </div>
  );
};

export default ManagerPage;
