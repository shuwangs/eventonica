import React, { useState, useEffect } from "react";
import UserRegisterForm from "../components/UserRegisterForm";
import EventList from "../components/EventList";
import EventForm from "../components/EventForm.jsx";
import UserList from "../components/UserList.jsx";
import "../App.css";
import "./ManagerPage.css";

const ManagerPage = () => {
  // TODO:
  // 1. Toggle between Events and Users tab
  // 2. Implement search functionality for events and users

  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [activeTab, setActiveTab] = useState("events");

  useEffect(() => {
    fetchEvents();
    fetchUsers();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/events");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      console.log(`fetched events is: ${data}`);
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      console.log(`fetched users are: ${data}`);
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manager-page-container">
      <div className="manager-page-header">
        <h1>🔧 Admin Panel</h1>
      </div>

      {/* Manager Tabs */}
      <div className="manager-page-tabs">
        <button
          className={`btn-tab ${activeTab === "events" ? "active" : ""}`}
          onClick={() => setActiveTab("events")}
        >
          Events
        </button>
        <button
          className={`btn-tab ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
      </div>

      {/* Search + Add */}
      <div className="search-container">
        <button onClick={() => setShowEventForm(true)} className="btn-primary">
          + Add Event
        </button>

        <input
          type="text"
          id="userSearchInput"
          placeholder="Search events..."
          className="search-input input-style"
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      {/* Popup Window */}
      {showEventForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Event</h2>
            <EventForm eventOnSubmit={handleCreateEvent} />
            {/* <button
              onClick={() => setShowEventForm(false)}
              className="btn-secondary"
            >
              Cancel
            </button> */}
          </div>
        </div>
      )}

      {/* Show the Events  */}
      {activeTab === "events" && <EventList events={events} />}

      {/* Show the users */}

      {activeTab === "users" && <UserList users={users} />}
    </div>
  );
};

export default ManagerPage;
