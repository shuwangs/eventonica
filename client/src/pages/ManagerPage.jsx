import React, { useState, useEffect, useReducer } from "react";
import UserRegisterForm from "../components/UserRegisterForm";
import EventList from "../components/EventList";
import EventForm from "../components/EventForm.jsx";
import UserList from "../components/UserList.jsx";
import {
  managerReducer,
  initialState,
  ACTIONS,
} from "../hooks/managerReducer.jsx";
import {
  fetchEvents,
  fetchUsers,
  createEvent,
  deleteEvent,
} from "../controller/userManagerController.jsx";

import "../App.css";
import "./ManagerPage.css";

const ManagerPage = () => {
  // TODO:
  // 2. Implement search functionality for events and users

  const [state, dispatch] = useReducer(managerReducer, initialState);

  const { events, users, error, loading, ui } = state;

  useEffect(() => {
    fetchEvents(dispatch);
    fetchUsers(dispatch);
  }, []);

  return (
    <div className="manager-page-container">
      <div className="manager-page-header">
        <h1>🔧 Admin Panel</h1>
      </div>

      {/* Manager Tabs */}
      <div className="manager-page-tabs">
        <button
          className={`btn-tab ${ui.activeTab === "events" ? "active" : ""}`}
          onClick={() =>
            dispatch({ type: ACTIONS.setActiveTab, payload: "events" })
          }
        >
          Events
        </button>
        <button
          className={`btn-tab ${ui.activeTab === "users" ? "active" : ""}`}
          onClick={() =>
            dispatch({ type: ACTIONS.setActiveTab, payload: "users" })
          }
        >
          Users
        </button>
      </div>

      {/* Search + Add */}
      <div className="search-container">
        <button
          onClick={() =>
            dispatch({ type: ACTIONS.setShowEventForm, payload: true })
          }
          className="btn-primary"
        >
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
      {ui.showEventForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Event</h2>
            <EventForm
              eventOnSubmit={(eventData) => createEvent(dispatch, eventData)}
            />
          </div>
        </div>
      )}

      {/* Show the Events  */}
      {ui.activeTab === "events" && (
        <EventList
          events={events}
          onDelete={(id) => deleteEvent(dispatch, id)}
        />
      )}

      {/* Show the users */}

      {ui.activeTab === "users" && <UserList users={users} />}
    </div>
  );
};

export default ManagerPage;
