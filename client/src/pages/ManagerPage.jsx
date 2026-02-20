import React, { useState, useEffect } from "react";
import UserRegisterForm from "../components/UserRegisterForm";
import EventList from "../components/EventList";
import EventForm from "../components/EventForm.jsx";
import fakeEvents from "../components/hardCodedEventsList.js";
import "../App.css";
import "./ManagerPage.css";

const ManagerPage = () => {
  // TODO:
  // 1. Toggle between Events and Users tab
  // 2. Implement search functionality for events and users



  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
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
    setShowEventForm(true);
  };

  const handleCreateEvent = () => {
    console.log("handle create event");
  };

  return (
    <div className="manager-page-container">

      <div className="manager-page-header">
        <div><h1>🔧 Admin Panel</h1></div>
      </div>

    {/* Manager Tabs */}
      <div className="manager-page-tabs">
        <button className="btn-tab active" >Events</button>
        <button className="btn-tab">Users</button>
      </div>
      
      <div className="search-container">
        <button 
          onClick={addEvent} className="btn-primary">+ Add Event</button>
          <input type="text" id="userSearchInput" placeholder="Search events..." className="search-input input-style" />
      </div>

      {loading && <p>Loading...</p>}
      {/* Popup Window */}
      {showEventForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Event</h2>
            <EventForm eventOnSubmit={handleCreateEvent} />
            <button onClick={() => setShowEventForm(false)} className = "btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      <EventList events={events} />
    </div>
  );
};

export default ManagerPage;
